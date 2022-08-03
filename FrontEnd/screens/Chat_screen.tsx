import React, {FC} from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight, TextInput, ImageBackground } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./home_screen";
import AboutScreen from "./about_screen";
import {WebView} from "react-native-webview"

import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";

//<WebView source = {{uri: "https://tawk.to/chat/62e7fbd254f06e12d88c59e3/1g9d2vbug"}} />
const ChatScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ImageBackground
            source={require("../assets/88570e500312820cf8873d180d05f0c0.jpg")}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: "center" }}>
            
            
      
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.textInput}
              placeholder="Message"
              placeholderTextColor="grey"
              keyboardType="default"
              //onChangeText={(text) => (messageInput = text)}
            ></TextInput>
            <TouchableHighlight
              //onPress={onSendMessage}
              //underlayColor={COLORS.clickBackground}
              style={styles.button}
            >
              <Text style={styles.button_text}>Send</Text>
            </TouchableHighlight>
          </View>
          </ImageBackground>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: "20px",
      paddingRight: "20px",
      backgroundColor: "#ffffff",
    },
  
    userInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      
    },
    userImageWrapper: {
      paddingBottom: 15,
      paddingTop: 15,
      
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textSection: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 15,
      paddingLeft: 0,
      marginLeft: 10,
      width: 350,
    },
    UserInfoText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    UserName: {
      fontSize: 14,
    },
    PostTime: {
      fontSize: 12,
      color: "#000000",
    },
    MessageText: {
      fontSize: 14,
      color: "#333333",
    },
  
    textInput: {
      color:"white",
      height: 60,
      marginRight: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: "grey",
      width: "75%",
      backgroundColor:"#2a3942"
    },
    button: {
      backgroundColor: "#202c33",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 90,
    },
    button_text: {
      fontSize: 25,
      color: "white",
      textAlign: "center",
    },
  
    self_list_row_text_container: {
      backgroundColor: "#005c4b",
      borderRadius: 20,
    },
    other_list_row_text_container: {
      backgroundColor: "#202c33",
      borderRadius: 20,
    },
  });
export default ChatScreen