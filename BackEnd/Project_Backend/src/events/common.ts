import { Server,Socket } from "socket.io"

type ImsMessage = {
    to: string,
    from: string,
    message: string
}

export = (io:Server, socket:Socket) => {
    const echoHandler = (payload:string) => {
        socket.emit("common:echo", payload)
    }
 
    const imsSendMessageHandler = (payload:ImsMessage) => {
        console.log("imsSendMessageHandler " + payload.from + " " + payload.to)
        const to = payload.to
        io.to(to).emit("ims:reciev_message",payload) 
    }
    socket.on("common:echo", echoHandler);
    socket.on("ims:send_message", imsSendMessageHandler);
 }
 