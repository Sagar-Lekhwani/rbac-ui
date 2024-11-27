import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    users: JSON.parse(localStorage.getItem("users")) || [], // Load users from localStorage
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Save logged-in user details and set auth status
        saveUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        
        // Remove user details and clear auth status
        removeUser: (state) => {
            state.user = null;
            state.isAuth = false;
        },
        
        // Add a new user (only admin can perform this action)
        addUser: (state, action) => {
            if (state.user?.role === "admin") {
                state.users.push(action.payload);
                localStorage.setItem("users", JSON.stringify(state.users)); // Persist to localStorage
            } else {
                console.error("Only admins can add new users.");
            }
        },
        
        // Delete a user by ID (only admin can perform this action, cannot delete own profile)
        deleteUser: (state, action) => {
            const userIdToDelete = action.payload;
            if (state.user?.role === "admin") {
                if (state.user.id === userIdToDelete) {
                    console.error("Admins cannot delete their own profile.");
                    return;
                }
                state.users = state.users.filter(user => user.id !== userIdToDelete);
                localStorage.setItem("users", JSON.stringify(state.users)); // Persist to localStorage
            } else {
                console.error("Only admins can delete users.");
            }
        },
        
        // Update user role (only admin can perform this action, cannot change own role)
        updateUserRole: (state, action) => {
            if (state.user?.role === "admin") {
                const { userId, newRole } = action.payload;
                if (state.user.id === userId) {
                    console.error("Admins cannot change their own role.");
                    return;
                }
                state.users = state.users.map(user =>
                    user.id === userId ? { ...user, role: newRole } : user
                );
                localStorage.setItem("users", JSON.stringify(state.users)); // Persist to localStorage
            } else {
                console.error("Only admins can update user roles.");
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUser, addUser, deleteUser, updateUserRole } = userSlice.actions;

export default userSlice.reducer;
