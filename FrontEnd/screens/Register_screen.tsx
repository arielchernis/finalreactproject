import React, {FC, useState} from "react"

import {View, Text} from "react-native"
import {Button, Divider, Icon, Input} from '@rneui/themed';
import StudnetModel, { User } from "../model/student_model"
import Home_screen from "./home_screen";
import LoginScreen from "./Login_screen";
import MainScreen from "./main_screen";

const Register: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [email, setEmail] = useState<String>("")
    const [name, setName] = useState<String>("")
    const [password, setPassword] = useState<String>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onLogin = async () => {
        navigation.goBack()
    }
    const onSubmit = async () => {

        setIsLoading(true)

        let user: User = {
            name: name,
            email: email,
            password: password,
            imageUrl: "",

        }

        let register = await StudnetModel.addUsers(user)
        if (register) {
            navigation.goBack()
            console.log(`i just Registered`);
            console.log(register);
            setIsLoading(false);

        } else {
            setIsLoading(false)
            alert("User Already Exsists")
        }
    }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Icon
                    reverse
                    name="person-circle-outline"
                    type='ionicon'
                />
                <Divider width={30}/>
                <Input
                    onChangeText={setName}
                    placeholder='name'
                    leftIcon={{name: 'face'}}
                />
                <Input
                    onChangeText={setEmail}
                    placeholder='email'
                    leftIcon={{name: 'email'}}
                />
                <Input
                    onChangeText={setPassword}
                    placeholder='password'
                    leftIcon={{type: 'ionicon', name: 'lock-closed-outline'}}
                />

                <Divider width={30}/>
                <Button
                    title="REGISTER"
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
                    onPress={onSubmit}

                    titleStyle={{fontWeight: 'bold'}}
                />
                <Button
                    title="i WANT TO LOGIN"
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
                    onPress={onLogin}

                    titleStyle={{fontWeight: 'bold'}}
                />

            </View>
        )

    }
export default Register;
