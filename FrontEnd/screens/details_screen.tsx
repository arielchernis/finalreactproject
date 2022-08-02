import React,{FC, useState} from "react"
import {View, Text} from "react-native"
import { useRoute } from '@react-navigation/native';


const Details: FC<{ navigation: any, route: String }> = ({ navigation, route }) => {
   const [id, setId] = useState<String>("")
    //navigation.getParam(id)
   React.useEffect(()=>{

        if (route.params?.id){
            setId(route.params.id)
            console.log("id:"+id)
        }
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ID: {id}</Text>
        </View>
    )
}

export default Details