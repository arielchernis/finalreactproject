import apiClient from "./ApiClient"
import { Student, User } from "./student_model"
import FormData from 'form-data'

const getAllStudents = async () => {
    console.log("getAllStudents")
    const res = await apiClient.get("/post")
    let students = Array<Student>()
    if (res.ok) {
        console.log("getAllStudents res.data " + res.data)
        if (res.data){
            res.data.forEach((item)=>{
                console.log("getAllStudents item " + item.message)
                const st:Student = {
                    id: item.sender,
                    name: item.message,
                    imageUrl: item.imageUrl
                }
                students.push(st)
            })
        }
    } else {
        console.log("getAllStudents fail")
    }
    return students
}

const addStudents = async (st: Student) => {
    const res = await apiClient.post("/post", {
        sender: st.id,
        message: st.name,
        imageUrl: st.imageUrl
    })
    if (res.ok) {
        console.log("addStudent success")
    } else {
        console.log("addStudent fail")
    }
}
// Users

const addUsers = async (us: User) => {
    const res = await apiClient.post("/auth/register", {
        name: us.name,
        email: us.email,
        password: us.password
    })
    if (res.ok) {
        console.log("addUser success")
        return true
    } else {
        console.log("addUSer fail")
        return  false
    }
}
const getUser =async (us: User) => {
    console.log("User Login")
    const res = await apiClient.post("/auth/login",{

        name: us.name,
        email: us.email,
        password: us.password

    })
    if  (res.ok) {
        console.log("getUser res.data " + res.data)
        if (res.data){


            const user: User = {
                name: res.data.name,
                email: res.data.email,
                password: res.data.password,
                imageUrl: res.data.imgUrl,
            }
            return user
        }
    }else {
        console.log("getUser fail")
    }
}
const getUseremail = async (email: String) => {

    console.log("getUseremail")

    console.log('The email being sent is = ' + email)

    const res = await apiClient.get("/auth/users?email=" + email.toString())

    if (res.ok) {

        if (res.data) {

            console.log("getUser res.data " + res.data)
            console.log("getUser name " + res.data.name)
            console.log("getUser email " + res.data.email)

            const user: User = {
                name: res.data.name,
                email: res.data.email,
                password: res.data.password,
                imageUrl: res.data.imgUrl,
            }
            return user
        }
        } else {
            console.log("getUseremail fail")
        }
    }
const deletePost = async (name: String) => {
    const res = await apiClient.delete("/post/"+name)
    if (res.ok) {
        console.log(name + "post deleted ");
        return true;
    } else {
        console.log(res.data);

        console.log("delete post fail");
        return false;
    }
};

    const uploadImage = async (imageUri:String)=> {
        console.log("uploadImage")
        const formData = new FormData()
        formData.append('file',{name: 'name', type:'image/jpeg', uri: imageUri})
        let url = '/file/file'
        const res = await apiClient.post(url,formData)
        if (res.ok){
            console.log("uploadImage passed " + res.data)
            return res.data.url
        }
        else{
            console.log("save failed " + res.problem)
        }
    }


export default {
    getAllStudents,
    addStudents,
    addUsers,
    getUser,
    getUseremail,
    uploadImage,
    deletePost

}
