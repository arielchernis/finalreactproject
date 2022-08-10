import ProfileApi from "./profile_api";

export type Profile = {
    email: String,
    password:String,
    name: String
}


const getAllProfiles = async ()=>{
    const students = await ProfileApi.getAllProfiles()
    return students
}

const addProfiles = async (st:Profile)=>{
    await ProfileApi.addProfiles(st)
}
const createUserProfile = async (email:String,password:String,name:String)=> {
    await ProfileApi.createUserProfile(email, password, name)

}
export default {
    addProfiles,
    getAllProfiles,
    createUserProfile
}