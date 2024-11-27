import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employe: null,
    isEmploye: false,
};

export const employeSlice = createSlice({
    name: "employe",
    initialState,
    reducers: {
        saveEmploye: (state, action) => {
            state.employe = action.payload;
            state.isEmploye = true;
        },
        removeEmploye: (state, action) => {
            state.employe = null;
            state.isEmploye = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveEmploye, removeEmploye } = employeSlice.actions;

export default employeSlice.reducer;
