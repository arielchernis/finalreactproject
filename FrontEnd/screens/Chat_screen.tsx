import React, {FC} from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./home_screen";
import AboutScreen from "./about_screen";
import {WebView} from "react-native-webview"

//<WebView source = {{uri: "https://tawk.to/chat/62e7fbd254f06e12d88c59e3/1g9d2vbug"}} />
const ChatScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
            
        </View>
    );
}
export default ChatScreen