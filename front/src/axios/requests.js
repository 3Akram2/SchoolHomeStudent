import axios from "axios";
const API = axios.create({ baseURL : 'http://localhost:3002/'});
export const registerUserWithGoogle = async (token) => await API.post('/auth/registerWithGoogle',null,{
    headers:{
        Authorization: `Bearer ${token}`,
    }
}) 
export const registerUserWithEmailPass = async (token,userCred) => await API.post('/auth/registerWithEmailPass',userCred,{
    headers:{
        Authorization: `Bearer ${token}`,
    }
})
export const logIn = async (token) => await API.post('/auth/login',null,{
    headers:{
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
})
export const loggOut = async () => await API.post('/auth/logout',null)

export const updateProfile = async () => await API.patch('/user/updateprofile',null)


