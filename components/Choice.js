import { View, Text } from "react-native";
import React from "react";

const COLORS = {
    right: '#00eda6',
    wrong: '#ff006f'
}

const Choice = ({ type })=>{

    const color= COLORS[type];
    return (
        <View style={{
            paddingHorizontal: 15,
            borderRadius: 10,
            backgroundColor: color,
            borderColor: color
        }}>
            {type == "right"?
            <Text style={{
                fontSize: 48,
                color: 'white',
            }}>&#10004;</Text>:
            <Text style={{
                fontSize: 48,
                color: 'white'
            }}>&#10006;</Text>}
        </View>
    )
}

export default Choice