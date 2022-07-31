import React,{FC, useState} from "react"
import {View, Text} from "react-native"
import COLORS from "../constants/colors"
import { Button,Icon,Input,Divider } from '@rneui/themed';
import StudnetModel, { User } from "../model/student_model"
import Student_model from "../model/student_model";


const Login: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")



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

            console.log(`i just logged in`);
           /* console.log(result);
            setIsLoading(false);
            await Credentials.setCredentials(result);
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

        </View>
    )
}

export default Login