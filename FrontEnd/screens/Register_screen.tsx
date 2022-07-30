import React,{FC} from "react"
import {View, Text} from "react-native"
import {Button, Divider, Icon, Input} from '@rneui/themed';


const Register: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Icon
                reverse
                name="person-circle-outline"
                type='ionicon'
            />
            <Divider width = {30}/>
            <Input
                placeholder='Email'
                leftIcon={{  name: 'email' }}
                />
            <Input
                placeholder='Password'
                leftIcon={{ type :'ionicon', name: 'lock-closed-outline' }}
            />

            <Input
                placeholder='Retype - Password'
                leftIcon={{ type :'ionicon', name: 'lock-closed-outline' }}
            />
            <Divider width = {30}/>
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
                titleStyle={{ fontWeight: 'bold' }}
            />

        </View>
)
}

export default Register