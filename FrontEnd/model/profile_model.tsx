import ProfileApi from "./profile_api";

export type Profile = {
    email: String,
    password:String,
    name: String
}


const getAllStudents = async ()=>{
    const students = await ProfileApi.getAllStudents()
    return students
}

const addStudents = async (st:Profile)=>{
    await StudentApi.addStudents(st)
}
const createUserProfile = async (email:String,password:String,name:String)=> {
    await ProfileApi.createUserProfile(email, password, name)


    /*const uploadImage = async (imageUri:String)=> {
        const url = await ProfileApi.uploadImage(imageUri)
        return url
    }*/
}
export default {
    addStudents,
    getAllStudents,
    createUserProfile
   // uploadImage
}