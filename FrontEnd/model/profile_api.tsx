import apiClient from "./ApiClient"
import { Profile } from "./profile_model"
import FormData from 'form-data'

const getAllProfiles = async () => {
    console.log("getAllprofiles")
    const res = await apiClient.get("/post")
    let profiles = Array<Profile>()
    if (res.ok) {
        console.log("getAllSProfiles res.data " + res.data)
        if (res.data){
            res.data.forEach((item)=>{
                console.log("getAllProfiles item " + item.message)
                const st:Profile = {
                    email: item.email,
                    password: item.password,
                    name: item.name
                }
                profiles.push(st)
            })
        }
    } else {
        console.log("getAllProfiles fail")
    }
    return profiles
}

const addProfiles = async (st: Profile) => {
    const res = await apiClient.post("/auth/register", {
        email: st.email,
        password: st.password


    })
    if (res.ok) {
        console.log("addProfile success")
    } else {
        console.log("addProfile fail")
    }
}

/*const uploadImage = async (imageUri:String)=> {
    console.log("uploadImage")
    const formData = new FormData()
    formData.append('file',{name: 'name', type:'iamge/jpeg', uri: imageUri})
    let url = '/file/file'
    const res = await apiClient.post(url,formData)
    if (res.ok){
        console.log("uploadImage passed " + res.data)
        return res.data.url
    }else{
        console.log("save failed " + res.problem)
    }
}*/
const createUserProfile = async (
    email: String,
    password: String,
    name: String
) => {
    const res = await apiClient.post("/profile/createProfile", {
        email: email,
        password: password,
        name: name
    });
    if (res.ok) {
        console.log(email + "profile has been created ");
    } else {
        console.log(res.data);

        console.log("create profile fail");
    }
}
export default {
    getAllProfiles,
    addProfiles,
    createUserProfile,
    //uploadImage
}
