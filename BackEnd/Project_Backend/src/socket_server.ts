
import { Server, } from "socket.io"
import http from 'http';
import commonHandlers from "./events/common"
import postHandlers from "./events/post_events"
import jwt from "jsonwebtoken"
import {createClient} from "redis"
import { createAdapter } from "@socket.io/redis-adapter";
import { io } from "socket.io-client";

let socketServer:Server
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

export const closeSocketServer = async ()=>{
    await pubClient.disconnect()
    await subClient.disconnect()
}

export const broadcastPostMessage = (message)=>{
    console.log("broadcastPostMessage")
    socketServer.to("all").emit("post:notify",message)
}

export const initSocketServer =  async (server: http.Server): Promise<Server> => {
    socketServer = new Server(server);

    await pubClient.connect()
    await subClient.connect() 
    socketServer.adapter(createAdapter(pubClient, subClient));
    console.log("Server is initilazing...")

    
    socketServer.on('connection', async (socket) => {
        console.log("user is added to room " + socket.data.user)
        socket.on("message", (message,time,from,imgUrl) => {
            socket.emit("message",{message,time,from,imgUrl})
        })
        await socket.join(socket.data.user)
        await socket.join("all");
        commonHandlers(socketServer,socket)
        postHandlers(socketServer,socket)
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return socketServer
}

