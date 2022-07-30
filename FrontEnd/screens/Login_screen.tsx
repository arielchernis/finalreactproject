import React,{FC} from "react"
import {View, Text} from "react-native"


const Login: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login_Screen</Text>
        </View>
    )
}

export default Login