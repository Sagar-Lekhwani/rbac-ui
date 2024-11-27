// import axios from "../../config/axios";
// import { getinternships } from "../Reducers/intershipSlice";
// import { getresume } from "../Reducers/resumeSlice";
// import { removeEmploye, saveEmploye } from "../Reducers/employeSlice";


// export const asynccurrentEmploye = () => async (dispatch, getState) => {
//     try {
//         try {
//             const { data } = await axios.post("/employe/current");
//             dispatch(saveEmploye(data.employe));
//         } catch (error) {
//             console.log(error.response.data);
//         }
//     } catch (error) {}
// };

// export const asyncsignupEmploye = (employe) => async (dispatch, getState) => {
//     try {
//         await axios.post("/employe/signup", employe);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncsigninEmploye = (employe) => async (dispatch, getState) => {
//     try {
//         await axios.post("/employe/signin", employe);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncremoveEmploye = () => async (dispatch, getState) => {
//     try {
//         await axios.get("/employe/signout/");
//         dispatch(removeEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncupdateEmploye = (employe) => async (dispatch, getState) => {
//     try {
//         await axios.post(`/employe/update/${employe.id}` , employe);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncchangepasswordEmploye = (employe) => async (dispatch, getState) => {
//     try {
//         await axios.post(`/employe/reset-password/${employe.id}` , employe);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncSendmailEmploye = (employe) => async (dispatch, getState) => {
//     try {
//         await axios.post(`/employe/send-mail` , employe);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncseeinternshipEmploye = () => async (dispatch, getState) => {
//     // console.log(getState())
//     try {
//         const response = await axios.post(`/employe/internship/read`);
//         dispatch(getinternships(response.data.internship))
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asynccreateinternshipEmploye = () => async (dispatch, getState) => {
//     // console.log(getState())
//     try {
//         await axios.post(`/employe/internship/create`);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncsingleinternshipEmploye = (internid) => async (dispatch, getState) => {
//     // console.log(getState())
//     try {
//         await axios.post(`/employe/internship/read/${internid}`);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };


// export const asyncsinglejobEmploye = (internid) => async (dispatch, getState) => {
//     // console.log(getState())
//     try {
//         await axios.post(`/employe/job/read/${internid}`);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asyncseejobEmploye = () => async (dispatch, getState) => {
//     // console.log(getState())
//     try {
//         await axios.post(`/employe/job/read`);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

// export const asynccreatejobEmploye = () => async (dispatch, getState) => {
//     // console.log(getState())
//     try {
//         await axios.post(`/employe/job/create`);
//         dispatch(asynccurrentEmploye());
//     } catch (error) {
//         console.log(error.response.data);
//     }
// };

