import React, { FC, useState,useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./home_screen";
import AboutScreen from "./about_screen";
import DetailsScreen from "./details_screen";
import AddStudentScreen from "./add_student_screen";
import ChatScreen from "./Chat_screen"
import FeedScreen from "./Feed_screen"
import MyPostsScreen from "./MyPosts_screen";



import COLORS from "../constants/colors"

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

const MainScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    }else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    }else if (route.name === 'Feed') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    }
                    else if (route.name === 'My Posts') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'black',
            })}>
                <Tab.Screen name= "Home" component={HomeScreen} options={{ headerShown: false }}></Tab.Screen>
                <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}></Tab.Screen>
                <Tab.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }}></Tab.Screen>
                <Tab.Screen name="My Posts" component={MyPostsScreen} options={{ headerShown: false }}></Tab.Screen>
                <Tab.Screen name="About" component={AboutScreen} options={{ headerShown: false }}></Tab.Screen>
            </Tab.Navigator>

    );
}
export default MainScreen