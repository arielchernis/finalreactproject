import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from "react-native"

import COLORS from "../constants/colors"
import StudnetModel, { Student } from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import CustomImagePicker from "./component/custom_image_picker"


const AddStudent: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [id, setId] = useState<String>("")
    const [name, setName] = useState<String>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imageUri,setImageUri] = useState<String>("")

    const onSave = async () => {
        setIsLoading(true)
        var student: Student = {
            id: id,
            name: name,
            imageUrl: ''
        }
        if(imageUri != ""){
            console.log("saving image")
            const url = await StudnetModel.uploadImage(imageUri)
            student.imageUrl = url
            console.log("saving image finish url : " + url) 
        }
        await StudnetModel.addStudents(student)
        navigation.goBack()
    }

    const onImageSelected = (uri:String)=>{
        console.log("onImageSelected " + uri)
        setImageUri(uri)
    }

    return (
        <ScrollView>
            <View style={styles.conatiner}>
                <View style={styles.image} >
                    <CustomImagePicker onImageSelected={onImageSelected}></CustomImagePicker>
                </View>
                <TextInput style={styles.textInput}
                    onChangeText={setId}
                    placeholder="ID"
                    keyboardType="default"></TextInput>
                <TextInput style={styles.textInput}
                    onChangeText={setName}
                    placeholder="Name"
                    keyboardType="default"></TextInput>
                <TouchableHighlight
                    onPress={onSave}
                    underlayColor={COLORS.clickBackground}
                    style={styles.button}>
                    <Text style={styles.button_text}>Save</Text>
                </TouchableHighlight>
                <View style={styles.activity_indicator}>
                    <ActivityIndicator visible={isLoading}></ActivityIndicator>
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    conatiner: {
        marginTop: 10,
        flex: 1
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "contain",
        padding: 10,
        marginBottom: 10
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'grey'
    },
    button: {
        margin: 12,
        backgroundColor: 'grey',
        borderRadius: 5
    },
    button_text: {
        fontSize: 30,
        color: 'white',
        textAlign: "center",
        marginTop: 3,
        marginBottom: 3,
    },
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
        position: "absolute"
    }
})

export default AddStudent