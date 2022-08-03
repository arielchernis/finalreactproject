import { NavigationProp, NavigationState } from "@react-navigation/native"
import React,{FC, useState} from "react"
import {View, Text} from "react-native"
import { Button,Icon,Input,Divider } from '@rneui/themed';


const Details: FC<{ navigation: NavigationProp<any,any>, route: any }> = ({ navigation, route }) => {
    const state = navigation.getState().routes.find((route) => route.name === 'Details') as any;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details: {state.params['id']}</Text>

            <Button
                title="Edit Post"

                buttonStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
            />

            <Button
                title="Delete Post"

                buttonStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
            />
        </View>
    )
}

export default Details