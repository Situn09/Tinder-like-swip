import { View ,StyleSheet, Dimensions, Animated } from "react-native";
import { Fragment, useCallback } from "react";
import Choice from "./Choice";

const { width , height } = Dimensions.get("screen");
const Card = ({colorBox, isFirst, swipe, titlSign, ...rest })=>{

    // Calculate the rotation of the card based on swipe gesture
    const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
        inputRange: [-100,0,100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

     // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    // Opacity animation for the "right icon" button
    const rightOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0,1],
        extrapolate: 'clamp'
    });

    // Opacity animation for the "cross icon" button
    const wrongOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

    // Function to render the "right" and "cross" buttons conditionally
    const renderChoice = useCallback(()=>{
        return (
           <Fragment>
              <Animated.View
               style={[
                styles.choiceContainer, 
                styles.rightContainer,
                { opacity: rightOpacity }
                ]}>
                 <Choice type="right" />
              </Animated.View>
              <Animated.View 
                style={[
                    styles.choiceContainer, 
                    styles.wrongContainer,
                { opacity: wrongOpacity }
                    ]}>
                 <Choice type="wrong" />
              </Animated.View>
           </Fragment>
        )
    },[rightOpacity, wrongOpacity])

    return (
        <Animated.View style={[
            styles.container,
            isFirst && animatedCardStyle
            ]} {...rest}>
            <View style={styles.colorBox} />
            {isFirst && renderChoice()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 25,
        borderRadius: 20,
    },
    colorBox: {
        width: width * 0.9,
        height: height * 0.78,
        borderRadius: 20,
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        borderRadius:  20
    },
    choiceContainer: {
       position: 'absolute',
       top: 5
    },
    rightContainer:{
      left: 5,
    },
    wrongContainer:{
      right: 5,
    },
})

export default Card