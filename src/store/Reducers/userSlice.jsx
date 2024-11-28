import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,
    users: JSON.parse(localStorage.getItem("users")) || [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        removeUser: (state) => {
            state.user = null;
            state.isAuth = false;
        },
        addUser: (state, action) => {
            if (state.user?.role === "admin") {
                state.users.push({ ...action.payload, taskIds: [] }); // Link tasks by IDs
                localStorage.setItem("users", JSON.stringify(state.users));
            } else {
                console.error("Only admins can add new users.");
            }
        },
        deleteUser: (state, action) => {
            const userIdToDelete = action.payload;
            if (state.user?.role === "admin") {
                if (state.user.id === userIdToDelete) {
                    console.error("Admins cannot delete their own profile.");
                    return;
                }
                state.users = state.users.filter((user) => user.id !== userIdToDelete);
                localStorage.setItem("users", JSON.stringify(state.users));
            } else {
                console.error("Only admins can delete users.");
            }
        },
        updateUserRole: (state, action) => {
            if (state.user?.role === "admin") {
                const { userId, newRole } = action.payload;
                const validRoles = ["employee", "manager", "admin"];

                if (!validRoles.includes(newRole)) {
                    console.error(`Invalid role: ${newRole}`);
                    return;
                }

                if (state.user.id === userId) {
                    console.error("Admins cannot change their own role.");
                    return;
                }

                const adminCount = state.users.filter((user) => user.role === "admin").length;
                const targetUser = state.users.find((user) => user.id === userId);

                if (targetUser?.role === "admin" && adminCount <= 1) {
                    console.error("At least one admin must remain in the system.");
                    return;
                }

                state.users = state.users.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                );
                localStorage.setItem("users", JSON.stringify(state.users));
            } else {
                console.error("Only admins can update user roles.");
            }
        },
        updateUsers: (state, action) => {
            const updatedUsers = action.payload;
            state.users = updatedUsers;
            localStorage.setItem("users", JSON.stringify(state.users));
        },
    },
});

export const { saveUser, removeUser, addUser, deleteUser, updateUserRole , updateUsers } = userSlice.actions;

export default userSlice.reducer;
