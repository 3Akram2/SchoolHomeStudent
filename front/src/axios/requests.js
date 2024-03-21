import axios from "axios";
const API = axios.create({ baseURL : 'http://localhost:3002/',withCredentials:true});
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
    
})
export const loggOut = async () => await API.post('/auth/logout',null)

export const updateProfile = async ( user,file ) => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', file);
    return  await API.patch('/user/updateprofile',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }})}
export const addChild = async (user) => await API.post('/user/addchild',user);
export const viewProfile = async (userId) => await API.get(`/user/viewProfile/${userId}`);
export const addTeacher = async (user) => await API.post('/user/addteacher',user);
export const updateFcm = async (fcm) => await API.put('/user/fcm',{fcm});

export const addSchool = async (user) => await API.post('/admin/addschool',user);
export const getAllUsers = async () => await API.get('/admin/allusers');

export const findSubjects = async () => await API.get('/subjects');
export const addSubject = async (name, teacherId) => await API.post('/subject',{name,teacherId});
export const deleteSubject = async (id) => await API.delete(`/subject/${id}`);
export const editSubject = async (id,name) => await API.patch(`/subject/${id}`,{name,});
export const joinSubject = async (subjectCode,subjectName) => await API.patch(`/subjects/join`,{subjectCode, subjectName});
export const findOne = async (id) => await API.get(`/subject/${id}`);

export const addExam = async (exam, subjectId) => await API.post('/exam',{exam,subjectId});
export const editExam = async (exam, examId, subjectId) => await API.patch(`/exam/${examId}/${subjectId}`,{exam});
export const deleteExam = async (examId, subjectId) => await API.delete(`/exam/${subjectId}/${examId}`);