import { Dimensions, StyleSheet, Text, View } from "react-native"
import { ImageItem } from "../../store/reducerImagePicker";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { colors } from "../../UI/theme";
import { useMemo } from "react";
import { width } from "../../util/screenDimension";

interface PaginationProps {
  items: ImageItem[],
  paginationIndex: number,
  scrollX: SharedValue<number>
}



const Pagination: React.FC<PaginationProps> = ({items, paginationIndex, scrollX}) => {

    return(
           <View style={styles.container}>
            {items.map((_,index) => {
                // const animatedStyle = useAnimatedStyle(() => {
                //     const dotWidth = interpolate(
                //       scrollX.value, 
                //       [(index - 1) * width, index * width, (index + 1) * width],
                //       [6, 12, 6],
                //       Extrapolation.CLAMP
                //     );
          
                //     return {
                //       width: dotWidth, 
                //     };
                //   }); 
                return(
                    <Animated.View 
                        style={[
                            styles.dot,
                            {backgroundColor: paginationIndex === index ? colors.titleText : colors.bodyText },
                            // animatedStyle
                        ]} 
                        key={index}
                    ></Animated.View>
                )
            })}
           </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        // paddingTop: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    dot: {
        backgroundColor: colors.bodyText,
        height: width > 360 ? 8 :  6,
        width: width > 360 ? 8 :  6,
        marginHorizontal: 2,
        borderRadius: width > 360 ? 8 : 6,
    }
  
  
});