import React, { useCallback } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ImageItem } from "../../store/reducerImagePicker";
import { Link } from "expo-router";
import { Image } from "react-native";
import { platformStyle } from "../../UI/shadowStyle";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { colors } from "../../UI/theme";
import { height, width } from "../../util/screenDimension";



const cardWidth = width * 0.9;
export const cardHeight = height > 700 ? height * 0.3 : height * 0.4;

interface CardProps {
  item: ImageItem,
  index: number,
  scrollX: SharedValue<number>
}


const Card: React.FC<CardProps> = React.memo(({item, index, scrollX}) => { //reduces unnecessary re-renders by memoizing components,It only re-renders when props change

  const animatedStyle = useAnimatedStyle(() => {
    return{
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index-1)* width, index* width, (index+1)*width],
            [-width*0.15, 0, width*0.15],
            Extrapolation.CLAMP
          )
        },
        {
          scale: interpolate(
            scrollX.value, 
            [(index - 1) * width, index * width, (index + 1) * width], 
            [0.8, 1, 0.8], 
            Extrapolation.CLAMP
          ),
        },
      ]
    }
  })

  
  // console.log(item.finalImageUri);
  
  
    return(
      <Animated.View key={item.id} style={[styles.imageContainer, animatedStyle]}>
        
        <Link href={`cards/${item.id}`}>
          <View style={styles.imageWrapper}>
          
            <Image 
              source={{ uri: item.finalImageUri }} 
              style={styles.image}
              onError={(e) => console.error('Error loading image:', e.nativeEvent.error)} // Error handling
            />     
            {/* <Image source={item.finalImageUri} style={styles.image}/> */}
            
          </View>
        </Link>
        
        
      </Animated.View>
    )
})

export default Card;

const styles = StyleSheet.create({
    
  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: cardHeight,
    overflow: 'hidden',    
  },
  imageWrapper: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    ...platformStyle.shadow, 
  },
  image: {
    width: '100%',
    // aspectRatio: 1.2,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  }

  
});