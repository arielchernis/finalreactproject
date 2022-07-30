import Client, { Socket } from "socket.io-client";
import mongoose from "mongoose";
import server from "../app"
import User from "../models/user_model";
import request from "supertest";
import { closeSocketServer } from "../socket_server"


type UserInfo = {
    id: string,
    email: string,
    password: string,
    accessToken: string,
    clientSocket: Socket
}

const user1: UserInfo = {
    id: "",
    email: "user1@socket.com",
    password: "1234567",
    accessToken: "",
    clientSocket: null
}

const user2: UserInfo = {
    id: "",
    email: "user2@socket.com",
    password: "1234567",
    accessToken: "",
    clientSocket: null
}

beforeAll(async () => {
    console.log("")
    await User.deleteMany({ email: user1.email });
    await User.deleteMany({ email: user2.email });
});

const serverCleanup = async () => {
    return new Promise<void>((resolve) => {
        server.close(() => {
            resolve()
        })
    })
}

afterAll(async () => {
    user1.clientSocket.close()
    user2.clientSocket.close()
    await User.deleteMany({ email: user1.email });
    await User.deleteMany({ email: user2.email });
    await closeSocketServer()
    await serverCleanup()
    await mongoose.connection.close();
});

describe("Socket IO server test", () => {
    const registerUser = async (userInfo: UserInfo) => {
        console.log("registerUser " + userInfo.email + " " + userInfo.password)
        const response = await request(server)
            .post("/auth/register")
            .send({ email: userInfo.email, password: userInfo.password });
        expect(response.statusCode).toEqual(200);
        userInfo.accessToken = response.body.access_token;
        userInfo.id = response.body._id;
    }

    test("register user for access", async () => {
        await registerUser(user1)
        await registerUser(user2)
    })

    const openClientConnection = (userInfo: UserInfo, done) => {
        userInfo.clientSocket = Client("http://localhost:" + process.env.PORT, {
            auth: {
                token: 'barrer ' + userInfo.accessToken
            }
        })
        userInfo.clientSocket.on("connect", () => {
            console.log("client connected")
            done()
        });
    }

    test("open client 1 connection", (done) => {
        openClientConnection(user1, done)
    })

    test("open client 2 connection", (done) => {
        openClientConnection(user2, done)
    })

    test("test echo event", (done) => {
        user1.clientSocket.on("common:echo", (arg: string) => {
            expect(arg).toBe("echo message");
            user1.clientSocket.removeAllListeners("common:echo")
            done();
        });
        user1.clientSocket.emit("common:echo", "echo message")
    });


    test("test ims event", (done) => {
        user2.clientSocket.on("ims:reciev_message", (arg) => {
            expect(arg.from).toBe(user1.id);
            expect(arg.message).toBe("this is IMS message");
            user2.clientSocket.removeAllListeners("ims:reciev_message")
            done();
        });
        user1.clientSocket.emit("ims:send_message", { to: user2.id, from: user1.id, message: "this is IMS message" })
    });

    test("test post and notify event", (done) => {
        user1.clientSocket.on("post:new_post_response",(arg)=>{
            console.log("post:new_post_response" + arg)
            user1.clientSocket.removeAllListeners("post:new_post_response")
            done()
        })
        user1.clientSocket.emit("post:new_post",{
            message: "this is the post message",
            sender: "",
        })
    })
    test("test post and notify event", (done) => {
        user2.clientSocket.on("post:notify",(arg)=>{
            expect(arg.message).toEqual("this is the post message")
            expect(arg.sender).toEqual(user1.id)
            user2.clientSocket.removeAllListeners("post:notify")
            done()
        })
        user1.clientSocket.emit("post:new_post",{
            message: "this is the post message",
            sender: "",
        })
    })
    test("test post and notify event", (done) => {
        user2.clientSocket.on("post:notify",(arg)=>{
            expect(arg.message).toEqual("this is the post message")
            expect(arg.sender).toEqual(user1.id)
            user2.clientSocket.removeAllListeners("post:notify")
            done()
        })
        request(server)
            .post("/post")
            .set({ authorization: "barer " + user1.accessToken })
            .send({
                message: "this is the post message",
                sender: "",
            }).then(()=>{
                console.log("post is sent...")
            });
    })
});

