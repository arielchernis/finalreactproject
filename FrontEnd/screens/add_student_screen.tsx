import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from "react-native"
import { Button,Icon,Input,Divider } from '@rneui/themed';

import COLORS from "../constants/colors"
import StudnetModel, { Student } from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import CustomImagePicker from "./component/custom_image_picker"


const AddPost: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
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
                <Input style={styles.textInput}
                    onChangeText={setId}
                    placeholder="ID"
                    keyboardType="default"></Input>
                <Input style={styles.textInput}
                    onChangeText={setName}
                    placeholder="Write Something Nice"
                    keyboardType="default"></Input>
                {/*<TouchableHighlight
                    onPress={onSave}
                    underlayColor={COLORS.clickBackground}
                    style={styles.button}>
                    <Text style={styles.button_text}>Save</Text>
                </TouchableHighlight>*/}
                    <Button
                    title="POST"
                    onPress={onSave}
                    buttonStyle={{
                    backgroundColor: 'black',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}
                    containerStyle={{
                    width: 300,
                    marginHorizontal: 50,
                    marginVertical: 30,
                }}
                    titleStyle={{ fontWeight: 'bold' }}
                    />
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

export default AddPost