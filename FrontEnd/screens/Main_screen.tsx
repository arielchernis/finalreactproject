import React, { FC, useState,useRef, useEffect } from "react";
import {View, Text, StyleSheet, Button, Image, TouchableHighlight, FlatList} from 'react-native'

import {NavigationContainer, NavigationProp} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./home_screen";
import Profile from "./Profile_screen";
import DetailsScreen from "./details_screen";
import AddPost from "./add_student_screen";
import ChatScreen from "./Chat_screen"

import MyPostsScreen from "./MyPosts_screen";
import Login from "./Login_screen";


import COLORS from "../constants/colors"
import {createStackNavigator} from "@react-navigation/stack";
import login_screen from "./Login_screen";
import Student_model, {Student, User} from "../model/student_model";
import StudentModel from "../model/student_model";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const ToBarAddButton:FC<{onClick:()=>void}>=({onClick})=>{
    return(
        <TouchableHighlight onPress={()=>{onClick()}}
                            underlayColor={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={'black'} />
        </TouchableHighlight>
    )
}


const MainScreen: FC<{ navigation: NavigationProp<any,any>, route: any }> = ({ navigation, route }) => {
    const [data, setData] = useState<User>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const state = navigation.getState().routes.find((route: any) => route.name === 'MainScreen') as any;
    const user = state.params['user'];
    const name = user;
    console.log("This is the user provided: " + user.toString())



    const openAddStudent = () => {
        navigation.navigate(AddPost)
    }
    return (

              <>

            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    }else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbox' : 'chatbox-outline';
                    }else if (route.name === 'Feed') {
                        iconName = focused ? 'document' : 'document-outline';
                    }
                    else if (route.name === 'My Posts') {
                        iconName = focused ? 'image' : 'image-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'gray',
                tabBarInactiveTintColor: 'black',
            })}>

                <Tab.Screen name= "Home" component={HomeScreen} options={{
                    headerTitle: "Welcome, ",
                    headerRight: ()=><ToBarAddButton onClick={()=>openAddStudent()}></ToBarAddButton>
                }}></Tab.Screen>
                <Tab.Screen name="Chat" component={ChatScreen} ></Tab.Screen>
                <Tab.Screen name="My Posts" component={MyPostsScreen} ></Tab.Screen>
                <Tab.Screen name="Profile" component={Profile} ></Tab.Screen>
            </Tab.Navigator>

            </>
    );
}
export default MainScreen