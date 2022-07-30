import React, { FC, useState,useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./screens/home_screen";
import AboutScreen from "./screens/about_screen";
import DetailsScreen from "./screens/details_screen";
import AddStudentScreen from "./screens/add_student_screen";
import LoginScreen from "./screens/Login_screen";
import RegisterScreen from "./screens/Register_screen";
import COLORS from "./constants/colors";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const ToBarAddButton:FC<{onClick:()=>void}>=({onClick})=>{
    return(
        <TouchableHighlight onPress={()=>{onClick()}}
            underlayColor={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={'gray'} />
        </TouchableHighlight>
    )
}

const HomeStackScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const openAddStudent = ()=>{
        navigation.navigate("addProfiles")
    }
    return (
        <LoginScreen navigation={undefined} route={undefined}></LoginScreen>
    );
}

const App: FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Register') {
                        iconName = focused ? 'key' : 'key-outline';
                    } else if (route.name === 'Log-in') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="Log-in" component={LoginScreen} options={{ headerShown: false }}></Tab.Screen>
                <Tab.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}


import colors from "./constants/colors";

import * as ImagePicker from 'expo-image-picker'

const MyImagePicker:FC = ()=> {
    useEffect(()=>{
        requestPermission()
    },[])

    const requestPermission = async () => {
        const res = await ImagePicker.requestCameraPermissionsAsync()
        if(!res.granted){
            alert("You need to accept Camera permissions")
        }
    }

    return (
        <View>
            <Text>MyImagePicker</Text>
        </View>
    )
}


const App2: FC = () => {
    return (
        <View>
            <MyImagePicker/>
        </View>
    )
}

const styles = StyleSheet.create({

})


export default App