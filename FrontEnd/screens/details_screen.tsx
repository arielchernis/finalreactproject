import { NavigationProp, NavigationState } from "@react-navigation/native"
import React,{FC, useState} from "react"
import {View, Text, StyleSheet} from "react-native"
import { Button,Icon,Input,Divider } from '@rneui/themed';
import Student_model from "../model/student_model";
import ActivityIndicator from "./component/custom_activity_indicator";


const Details: FC<{ navigation: NavigationProp<any,any>, route: any }> = ({ navigation, route }) => {
    const state = navigation.getState().routes.find((route) => route.name === 'Details') as any;
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onDelete = async () => {
        setIsLoading(true)
        let res = await Student_model.deletePost(state.params['name'])
        if(res) {
            console.log("DELETED POST" +state.params['name'] )
            navigation.goBack()
        }else{
            console.log("FAIL DELETED POST" +state.params['name'] )
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details: {state.params['name']}</Text>

            <Button
                title="Edit Post"

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

            <Button
                title="Delete Post"
                onPress={onDelete}
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
            <View style={styles.activity_indicator}>
                <ActivityIndicator visible={isLoading}></ActivityIndicator>
            </View>
        </View>
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
export default Details