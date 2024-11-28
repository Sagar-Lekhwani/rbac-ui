import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Reducers/taskSlice";
import userReducer  from "./Reducers/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
    },
});
