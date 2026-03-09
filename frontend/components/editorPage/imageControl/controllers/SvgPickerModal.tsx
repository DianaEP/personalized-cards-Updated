import {FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../../../UI/buttons/Button';
import { colors } from '../../../../UI/theme';
import { fonts } from '../../../../UI/fonts';
import { platformStyle } from '../../../../UI/shadowStyle';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { ASSETS_SVG, AssetSvg } from '../../../../util/dataSvg';
import React, { useEffect, useState } from 'react';
import { ACTIONS } from '../../../../store/reducerImagePicker';
import { useImageContext } from '../../../../store/ImageContext';
import { height, width } from '../../../../util/screenDimension';


interface SvgItemProps {
    item: AssetSvg;
    onSelect: (id: string) => void;
}

const SvgItem: React.FC<SvgItemProps> = ({item, onSelect}) => { 
    const scale = useSharedValue(1);
    

    const animatedStyle = useAnimatedStyle(() => {
        return{
            transform: [{ scale: withTiming(scale.value, { duration: 300, easing: Easing.out(Easing.cubic)})}]
        }
    })

    const pressIn = () => {
        scale.value = 0.90;
    }

    const pressOut = (item: AssetSvg) => {
        scale.value = 1.02;
        setTimeout(() => {
            scale.value = 1;
            onSelect(item.id);
        }, 100)
    }

    const SvgComponent = item.svg;
   
    
    
    
        return (
        <Pressable 
            onPressIn={pressIn}
            onPressOut={() => pressOut(item)} 
        >
            <Animated.View style={[styles.svgContainer, animatedStyle] }>
                <SvgComponent  width={50} height={50} color={colors.titleText}/>
            </Animated.View>

        </Pressable>

    )
}



const SvgPickerModal: React.FC = () => {
    const { state, dispatch} = useImageContext();
    
    const handleSvgSelect = (id: string): void => {
        dispatch({ type: ACTIONS.SELECT_SVG_ID, payload: id});
        dispatch({type: ACTIONS.TOGGLE_SVG_MODAL})
    }

    const renderSvg = ({ item }: { item: AssetSvg }) => {
        return <SvgItem key={item.id} item={item} onSelect={handleSvgSelect} />
    }

    
    return(
        
                <Animated.View style={styles.modalContainer} entering={FadeInDown.delay(150)} exiting={FadeOutDown}>
                    <View style={[styles.modalContent, ]} >
                        <Text style={styles.modalTitle}>Select an illustration</Text>
                    
                        {state.showSvgModal && (
                            <FlatList
                                data={ASSETS_SVG}
                                keyExtractor={(item) => item.id}
                                renderItem={renderSvg}
                                contentContainerStyle={{gap: 10}}
                                columnWrapperStyle={{gap: 10}}
                                numColumns={3}
                                    
                            />
                        )}
                    
                        {/* <Button textOnly onPress={onClose}>Close</Button> */}
                    </View>
                </Animated.View>

        


    )
}
export default SvgPickerModal;

const styles = StyleSheet.create({
 
    modalContainer: {
        position: 'absolute', 
        top: height > 700 ? 100 : 60, 
        left: 0, 
        backgroundColor: colors.background,
        // borderColor: colors.border,
        borderRadius: 5,
        // borderWidth: 1,
        width: '100%',
        height: 'auto', 
        padding: width > 360 ? 30 : 20,
        ...platformStyle.shadow,    
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: fonts.body,
        fontSize: width > 360 ? 20 : 18,
        fontWeight: 'bold',
        color: colors.bodyText,
        marginBottom: width > 360 ? 20 : 15
    },
    svgContainer: {
        borderRadius: 50,
        backgroundColor: colors.bodyText,
        overflow: 'hidden', 
        padding: width > 360 ? 15 : 10,   
        margin: width > 360 ? 10 : 5,
        
    },
    
})

