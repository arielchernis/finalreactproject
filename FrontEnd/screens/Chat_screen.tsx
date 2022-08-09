import React, {FC, useEffect, useRef, useState} from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight, TextInput, ImageBackground } from 'react-native'
import io, { Socket } from "socket.io-client";
import StudnetModel from "../model/student_model";
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import LottieView from "lottie-react-native";

type messageType = {
    message: string;
    time: string;
    from: string;
    imgUrl: string;
  };

let messageInput: string;

type MessageListRowProps = {
    message: messageType;
    currentUser: String;
  };


  const MessageListRow: FC<MessageListRowProps> = ({ message, currentUser }) => {
    console.log("The message is: " + message + 'Current user is: ' + currentUser)
    return (
      <View
        style={[
          currentUser === message.from
            ? styles.self_list_row_text_container
            : styles.other_list_row_text_container,
        ]}
      >
        <View style={styles.userInfo}>
          <View style={styles.userImageWrapper}>
            {(message.imgUrl == "" || message.imgUrl == " ") && (
              <Image style={styles.userImage} source={require("../assets/avatar.jpeg") } />
            )}
            {(message.imgUrl != "" && message.imgUrl != " ") && (
              <Image style={styles.userImage} source={{ uri: message.imgUrl }} />
            )}
          </View>
          <View style={styles.textSection}>
            <View style={styles.UserInfoText}>
              <Text style={styles.UserName}>{message.from}</Text>
              <Text>{message.time}</Text>
            </View>
            <Text>{message.message}</Text>
          </View>
        </View>
      </View>
    );
  };

const ChatScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [messages, setMessages] = useState<Array<messageType>>([]);
    const [profile, setProfile] = useState<any>("");
    const socketRef = useRef<Socket>();
    //const userToken = store.getState().auth.userToken;
    const currentUser = 'abcd'
    const date = new Date();

    const getUserData = async (email: String) => {
      const userProfile = StudnetModel.getUseremail('abcd');
      console.log("the user currently on the model is" + userProfile)
      //const userProfile = 'abcd'
      return userProfile;
    };
    const waitForDataLoad = async () => {
      //let p = await getUserData(userToken!.email);
      setProfile('abcd');
    };

    useEffect(() => {
        //waitForDataLoad();
        socketRef.current = io("http://192.168.1.179:3000", {
          
        });
        socketRef.current?.on("connect", () => {
          console.log("client connected");
        });
    
        socketRef.current?.on("ims:message_to_all", (message: messageType) => {
          setMessages((oldMessages) => [...oldMessages, message]);
          console.log(
            `got this message: ${message.message} on time: ${message.time},`
          );
        });
    
        return () => {
          socketRef.current?.disconnect();
        };
      }, []);

    const onSendMessage = () => {
      console.log("The message: " + messageInput)
        if (!messageInput) return;
        console.log("im here number 2")
        socketRef.current?.emit("message", {
          message: messageInput,
          time: date.toLocaleTimeString(),
          from: 'abcd',
          imgUrl: profile.imageUrl,
        });
      };

    const animation = useRef(null);
    const openAddStudent = () => {
        navigation.navigate("AddStudent")
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageBackground
          source={require("../assets/88570e500312820cf8873d180d05f0c0.jpg")}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <AutoScrollFlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MessageListRow message={item} currentUser={currentUser} />
            )}
          ></AutoScrollFlatList>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.textInput}
              placeholder="Message"
              placeholderTextColor="grey"
              keyboardType="default"
              onChangeText={(text) => (messageInput = text)}
            ></TextInput>
            <TouchableHighlight
              onPress={onSendMessage}
              style={styles.button}
            >
              <Text style={styles.button_text}>Send</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    )

    
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
      color: "white",
      height: 60,
      marginRight: 5,
      borderWidth: 1,
      padding: 10,
      borderColor: "grey",
      width: "75%",
      backgroundColor: "#2a3942",
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
    export default ChatScreen;