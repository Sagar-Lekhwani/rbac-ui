import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userSlice";
// import  internshipReducer  from "./Reducers/intershipSlice";
// import resumeReducer from "./Reducers/resumeSlice";
// import employeReducer from "./Reducers/employeSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        // internships: internshipReducer,
        // resume: resumeReducer,
        // employe: employeReducer,
    },
});
