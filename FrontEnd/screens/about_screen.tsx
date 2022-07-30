import React,{FC} from "react"
import {View, Text} from "react-native"


const About: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About</Text>
        </View>
    )
}

export default About