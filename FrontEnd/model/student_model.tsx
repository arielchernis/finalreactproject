import StudentApi from "./student_api"

export type Student = {
    id: String,
    name:String,
    imageUrl: String
}
export type User = {
    name: String,
    email: String,
    password: String
}
// Users
const getUserName = async (us:User)=> {
    const res = await StudentApi.getUserName(us)
    return res
}
const addUsers = async (us:User)=>{

    const res = await StudentApi.addUsers(us)
    return res
}
const getUser = async (us:User)=>{
    const user = await StudentApi.getUser(us)
    return user
}
// Students posts
const getAllStudents = async ()=>{
    const students = await StudentApi.getAllStudents()

    return students
} 

const addStudents = async (st:Student)=>{
    await StudentApi.addStudents(st)
} 

const uploadImage = async (imageUri:String)=> {
    const url = await StudentApi.uploadImage(imageUri)
    return url
}

export default {
    addStudents,
    getAllStudents,
    uploadImage,
    addUsers,
    getUser,
    getUserName
}