import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from "react-native";

const About: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const userToken = store.getState().auth.userToken;
    const [sender, setId] = useState<String>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUri, setImageUri] = useState<String>("");
    const [firstName, setfirstname] = useState<String>("");
    const [lastName, setlastname] = useState<String>("");
  
    const [profile, setProfile] = useState<any>("");

    const getUserData = async (email: String) => {
        const userProfile = StudnetModel.getUserProfile(email);
        return userProfile;
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About</Text>
        </View>
    )
}

export default About