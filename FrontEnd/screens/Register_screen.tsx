import React, {FC, useState} from "react"

import {View, Text} from "react-native"
import {Button, Divider, Icon, Input} from '@rneui/themed';
import StudnetModel, { User } from "../model/student_model"


const Register: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [email, setEmail] = useState<String>("")
    const [name, setName] = useState<String>("")
    const [password, setPassword] = useState<String>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = async () => {

        setIsLoading(true)

        let user: User = {
            name: name,
            email: email,
            password: password

        }

        await StudnetModel.addUsers(user)

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

            </View>
        )

    }
export default Register;
