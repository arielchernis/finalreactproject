import StudentApi from "./student_api"

export type Student = {

    id: String,
    name: String,
    imageUrl: String
}
export type User = {
    name: String,
    email: String,
    password: String,
    imageUrl: String
}



// Users

const addUsers = async (us:User)=>{

    const res = await StudentApi.addUsers(us)
    return res
}
const getUser = async (us:User)=>{
    const user = await StudentApi.getUser(us)
    return user
}
const getUseremail = async (email : String)=>{
    const user = await StudentApi.getUseremail(email)
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
const deletePost = async (name : String) => {
    const res = await StudentApi.deletePost(name)
    return res
}

export default {
    addStudents,
    getAllStudents,
    uploadImage,
    getUseremail,
    getUser,
    addUsers,
    uploadImage,
    deletePost

}