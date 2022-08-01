import React,{FC, useState} from "react"
import {View, Text} from "react-native"
import COLORS from "../constants/colors"
import { Button,Icon,Input,Divider } from '@rneui/themed';
import StudnetModel, { User } from "../model/student_model"
import Student_model from "../model/student_model";

import MainScreen from "./Main_screen"
import Register_screen from "./Register_screen"
import Home from "./home_screen";

import * as Facebook from 'expo-facebook'



const Login: FC<{ navigation: any, route: any ,isLogin:boolean}> = ({ navigation, route , isLogin}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [isLoggedin,setLoggedinStatus] = useState(false)
    const [userData, SetUserDate] = useState(null)
    const [isImageLoading,setImageLoadStatus] = useState(false)

    
    const facebookLogIn = async () => {
        try{
            await Facebook.initializeAsync({
                appId: '428633885869147'
            })

            const {
                type
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile']
            })
            if(type === 'success'){
                //in facebook
                fetch('https://graph.facebook.com/me?access_token=${token}&fields=id,name.email,picture.height(500)').then(response => response.json()).then(data => {
                    setLoggedinStatus(true)
                    setUserData(data)
                }).catch(e => console.log(e))
                

            }else{
                console.log('failed to log  in')
            }

        }catch({message}){
            alert('facebook login error')
        }
    }
/*
    logout = () => {
        setLoggedinStatus(false)
        setUserDataAsync(null)
        setImageLoadStatus(false)
    }
*/

    const onReg = async () => {
        navigation.navigate(Register_screen)
    }
    const onSubmit = async () => {

        setIsLoading(true)
        let user: User = {
            name:"",
            email: email,
            password: password

        }
        console.log(user)

        let result = await Student_model.getUser(user);
        if (result) {
           navigation.navigate(MainScreen)
           console.log(`i just logged in`);
           console.log(result);
            setIsLoading(false);
           /* await Credentials.setCredentials(result);
            dispatch(AuthActions.setUserToken(result));
            dispatch(AuthActions.setIsLoggedIn(true));*/



        } else {
            setIsLoading(false)
            alert("No Such User")
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Icon
                reverse
                name="person-circle-outline"
                type='ionicon'
            />
            <Divider width = {30}/>
            <Input
                onChangeText={setEmail}
                placeholder='email'
                leftIcon={{  name: 'email' }}
            />
            <Input
                onChangeText={setPassword}
                placeholder='password'
                leftIcon={{ type :'ionicon', name: 'key-outline' }}
            />
            <Divider width = {30}/>
            <Button
                title="LOG-IN"
                onPress={onSubmit}
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
                title="I WANT TO  REGISTER"
                onPress={onReg}
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
            <Divider width = {30}/>

            <Button
                title="Login with Facebook"
                onPress={facebookLogIn}
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


        </View>
    )
}

export default Login