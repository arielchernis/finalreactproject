import React, {FC, useRef} from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./home_screen";
import AboutScreen from "./Profile_screen";
import LottieView from "lottie-react-native"


const MyPostsScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const animation = useRef(null);
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
export default MyPostsScreen