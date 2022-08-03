import React, {FC, useRef} from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight, TextInput, ImageBackground } from 'react-native'
import LottieView from "lottie-react-native";


//<WebView source = {{uri: "https://tawk.to/chat/62e7fbd254f06e12d88c59e3/1g9d2vbug"}} />
const ChatScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const animation = useRef(null);
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LottieView
                autoPlay
                loop
                source={require("./Animations/woman.json")}
                ref={animation}
                style={{
                    width: 300,
                    height: 300,
                }}
            ></LottieView>
        </View>
    )
}
    export default ChatScreen;