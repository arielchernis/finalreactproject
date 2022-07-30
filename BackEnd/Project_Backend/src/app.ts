import server from './rest_server'

import {initSocketServer} from "./socket_server"

initSocketServer(server)

const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log('server started on port ' + PORT)
})

export = server
