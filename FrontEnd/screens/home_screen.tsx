import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight } from "react-native"

import COLORS from "../constants/colors"
import StudentModel,{Student} from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import Ionicons from "@expo/vector-icons/Ionicons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Details from "./details_screen";
import AddStudent from "./add_student_screen";
import {Button} from "@rneui/themed";



const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const UpperTab = createMaterialTopTabNavigator();
const BotTab = createBottomTabNavigator()


const StudentListRow: FC<{ student: Student, onItemClick: (id:String)=>void }> = ({ student, onItemClick }) => {
    return (
        <TouchableHighlight
            onPress={()=>{onItemClick(student.id)}}
            underlayColor={COLORS.clickBackground}>
            <View style={styles.list_row_container}>
                { student?.imageUrl != "" &&  <Image source={{uri: student.imageUrl.toString()}} style={styles.list_row_image}></Image>}
                { student?.imageUrl == "" &&  <Image source={require("../assets/avatar.jpeg")} style={styles.list_row_image}></Image>}
                <View style={styles.list_row_text_container}>
                    <Text style={styles.list_row_name}>{student.name}</Text>
                    <Text style={styles.list_row_id}>{student.id}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const Home: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [data, setData] = useState<Array<Student>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)




    const openDetails = (id:String)=>{
        console.log("on press " + id)
        navigation.navigate(Details, {id: id})
    }
    const onPost = () => {

    }

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            reloadData()
        })
    },[navigation])

    const reloadData = async ()=>{
        setIsLoading(true)
        const studentData = await StudentModel.getAllStudents()
        setData(studentData)
        setIsLoading(false)
    }

    return (
        <View style={styles.home_container}>
            <Button
                title="GET USER"
                onPress={onPost}
                buttonStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ fontWeight: 'bold' }}
            />
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (<StudentListRow student={item}
                            onItemClick={openDetails} />)}
            ></FlatList>
            <View style={styles.activity_indicator}>
                <ActivityIndicator visible={isLoading}></ActivityIndicator>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    home_container: {
        flex: 1
    },
    list_row_container: {
        height: 150,
        // width: "100%",
        // backgroundColor: "grey",
        flexDirection: "row",
        elevation: 4,
        borderRadius: 3,
        marginLeft: 8,
        marginRight: 8
    },
    list_row_image: {
        height: 130,
        width: 130,
        margin: 10,
        borderRadius: 15
    },
    list_row_text_container: {
        justifyContent: "center"
    },
    list_row_name: {
        fontSize: 30,
        marginBottom: 10
    },
    list_row_id: {
        fontSize: 25
    },
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
        position: "absolute"
    }
})
export default Home