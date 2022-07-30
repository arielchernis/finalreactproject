import { Server, Socket } from "socket.io"
import {createNewPost} from "../controllers/post"
import { reqFactory, resFactory} from "../common/req_res_wrapper"



export = (io: Server, socket: Socket) => {
    const newPost = async (payload) => {
        console.log("newPost ")
        payload['_id'] = socket.data.user
        const req = reqFactory(payload)
        const res = resFactory((msg) => {
            socket.emit("post:new_post_response", msg)
        })
        await createNewPost(req, res)
    }
    socket.on("post:new_post", newPost);
}
