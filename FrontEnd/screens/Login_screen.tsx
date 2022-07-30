import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from "react-native"

import COLORS from "../constants/colors"
import StudnetModel, { Student } from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import CustomImagePicker from "./component/custom_image_picker"

/*const Login: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login_Screen</Text>
        </View>
    )
}
*/
const Login: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [id, setId] = useState<String>("")
    const [name, setName] = useState<String>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imageUri,setImageUri] = useState<String>("")

    const onLogin = async () => {
        /*
        setIsLoading(true)
        
        if(imageUri != ""){
            console.log("saving image")
            const url = await StudnetModel.uploadImage(imageUri)
            student.imageUrl = url
            console.log("saving image finish url : " + url) 
        }
        await StudnetModel.addStudents(student)
        navigation.goBack()



        from the log-in screen itself 

        <View style={styles.image} >
                    <CustomImagePicker onImageSelected={onImageSelected}></CustomImagePicker>
                </View>

        */
    }

    const onImageSelected = (uri:String)=>{
        console.log("onImageSelected " + uri)
        setImageUri(uri)
    }

    return (
        <ScrollView>
            <View style={styles.conatiner}>

 
                <TextInput style={styles.textInput}
                    onChangeText={setId}
                    placeholder="User Name"
                    keyboardType="default"></TextInput>
                <TextInput style={styles.textInput}
                    onChangeText={setName}
                    placeholder="Password"
                    keyboardType="default"></TextInput>
                <TouchableHighlight
                    onPress={onLogin}
                    underlayColor={COLORS.clickBackground}
                    style={styles.button}>
                    <Text style={styles.button_text}>Login</Text>
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
        marginTop: 200,
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

export default Login