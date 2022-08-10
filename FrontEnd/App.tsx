import React, { FC, useState,useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./screens/home_screen";
import AboutScreen from "./screens/Profile_screen";
import Details from "./screens/details_screen";
import AddPost from "./screens/add_student_screen";
import Login from "./screens/Login_screen";
import RegisterScreen from "./screens/Register_screen";
import MainScreen from "./screens/Main_screen"


const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const Stack = createStackNavigator();

const UpperTab = createMaterialTopTabNavigator();


const App: FC = () => {


    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={({ route }) => ({
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
                <Stack.Screen name="Login" component = {Login}  options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Home" component={HomeScreen}  ></Stack.Screen>
                <Stack.Screen name="MainScreen" component={MainScreen} ></Stack.Screen>
                <Stack.Screen name="Details" component={Details} ></Stack.Screen>
                <Stack.Screen name="AddPost" component={AddPost} ></Stack.Screen>
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

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