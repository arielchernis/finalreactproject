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
import StudnetModel from "../model/student_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";

const About: FC<NavigationProps> = ({ navigation, route }) => {

    const [sender, setId] = useState<String>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUri, setImageUri] = useState<String>("");
    const [Name, setname] = useState<String>("");
    const [profile, setProfile] = useState<any>("");

    const getUserData = async (email: String) => {
        const userProfile = StudnetModel.getUserProfile(email);
        return userProfile;
    };

    React.useEffect(() => {

        setname(profile.firstName)

    }, []);

    const onSave = async () => {
        setIsLoading(true);
        if (imageUri != "") {
            console.log("saving image");
            const url = await StudnetModel.uploadImage(imageUri);
            console.log("saving image finish url : " + url);

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

                    onChangeText={setname}
                    placeholder="Name"
                    keyboardType="default"
                >{profile.firstName}</Input>


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