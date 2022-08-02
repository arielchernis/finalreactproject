import { NavigationProp, NavigationState } from "@react-navigation/native"
import React,{FC, useState} from "react"
import {View, Text} from "react-native"


const Details: FC<{ navigation: NavigationProp<any,any>, route: any }> = ({ navigation, route }) => {
    const state = navigation.getState().routes.find((route) => route.name === 'Details') as any;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details: {state.params['id']}</Text>
        </View>
    )
}

export default Details