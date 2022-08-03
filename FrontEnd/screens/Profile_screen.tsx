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
import { Button,Icon,Input,Divider } from '@rneui/themed';

import COLORS from "../constants/colors";
import StudnetModel from "../model/student_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";

const About: FC<NavigationProps> = ({ navigation, route }) => {
   // const userToken = store.getState().auth.userToken;
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
    const waitForDataLoad = async () => {
        let p = await getUserData(userToken!.email);
        setProfile(p);
    };
    React.useEffect(() => {
        waitForDataLoad();
        setfirstname(profile.firstName)
        setlastname(profile.lastName)
    }, []);

    const onSave = async () => {
        setIsLoading(true);
        if (imageUri != "") {
            console.log("saving image");
            const url = await StudnetModel.uploadImage(imageUri);
            console.log("saving image finish url : " + url);
            //await StudnetModel.updateUserProfile(firstName,lastName,userToken!.email,url)
        }

        setIsLoading(false);

        navigation.goBack();
    };

    const onImageSelected = (uri: String) => {
        console.log("onImageSelected " + uri);
        setImageUri(uri);
    };

    return (
        <ScrollView>
            <View style={styles.conatiner}>
                <View style={styles.image}>
                    <CustomImagePicker
                        onImageSelected={onImageSelected}
                        imageurl={""}
                    ></CustomImagePicker>
                </View>
                <Text
                    style={{ height: 40, margin: 12, padding: 10, borderColor: "grey" }}
                >
                    {" "}
                    Email : {profile.email}
                </Text>
                <Input

                    onChangeText={setfirstname}
                    placeholder="First Name"
                    keyboardType="default"
                >{profile.firstName}</Input>
                <Input

                    onChangeText={setlastname}
                    placeholder="Last Name"
                    keyboardType="default"
                >{profile.lastName}</Input>

                <Button
                    title="SAVE"
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
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                />
                <View style={styles.activity_indicator}>
                    <ActivityIndicator visible={isLoading}></ActivityIndicator>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        marginTop: 10,
        flex: 1,
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "contain",
        padding: 10,
        marginBottom: 10,
    },

    button: {
        margin: 12,
        backgroundColor: "grey",
        borderRadius: 5,
    },
    button_text: {
        fontSize: 30,
        color: "white",
        textAlign: "center",
        marginTop: 3,
        marginBottom: 3,
    },
    activity_indicator: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
});

export default About;