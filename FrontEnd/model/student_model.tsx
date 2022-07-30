import StudentApi from "./student_api"

export type Student = {
    id: String,
    name:String,
    imageUrl: String
}


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
    uploadImage
}