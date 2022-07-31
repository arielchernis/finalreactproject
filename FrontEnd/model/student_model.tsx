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
const addUsers = async (us:User)=>{
    await StudentApi.addUsers(us)
}
const getUser = async (us:User)=>{
    const user = await StudentApi.getUser(us)
    return user
}
// Students
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
    getUser
}