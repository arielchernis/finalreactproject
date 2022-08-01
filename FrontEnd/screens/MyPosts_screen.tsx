import React, {FC} from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./home_screen";
import AboutScreen from "./about_screen";


const MyPostsScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Posts</Text>
        </View>
    )

}
export default MyPostsScreen