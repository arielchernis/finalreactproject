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
        email: us.email,
        password: us.password
    })
    if (res.ok) {
        console.log("addUser success")
    } else {
        console.log("addUSer fail")
    }
}
const getUser = async (us: User) => {
    console.log("getUser")
    const res = await apiClient.post("/auth/login",{
        name: "",
        email: us.email,
        password: us.password

    })
    if  (res.ok) {
        console.log("getUser res.data " + res.data)
        if (res.data){

               return us;
            }
        }else {
        console.log("getUser fail")
    }
    }

export default {
    getAllStudents,
    addStudents,
    addUsers,
    getUser

    //uploadImage
}
