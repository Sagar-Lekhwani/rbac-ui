import { saveUser, removeUser } from "../Reducers/userSlice";



export const asynccurrentUser = () => (dispatch, getState) => {
    try {
        // Retrieve the current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('auth'));

        // Check if the currentUser exists in localStorage
        if (currentUser) {
            // Dispatch action to save the user data
            dispatch(saveUser(currentUser));
        } else {
            // Handle the case where no user is found in localStorage
            console.log('No user data found in localStorage');
        }
    } catch (error) {
        // Handle any error that occurs during the process
        console.error('Error retrieving user from localStorage:', error);
    }
};


export const asyncsignup = (user) => (dispatch, getState) => {
    try {
        // Add the new user to localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Set the current user as the newly signed-up user
        localStorage.setItem('auth', JSON.stringify(user));

        // Dispatch action to update the Redux store with the new user
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log('Error signing up user:', error);
    }
};


export const asyncsignin = (user) => (dispatch, getState) => {
    try {
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user exists and the credentials match
        const foundUser = users.find(u => u.email === user.email && u.password === user.password);
        
        if (foundUser) {
            // Set the current user in localStorage
            localStorage.setItem('auth', JSON.stringify(foundUser));
            
            // Dispatch action to update the Redux store with the signed-in user
            dispatch(asynccurrentUser());
        } else {
            console.log('Invalid credentials');
        }
    } catch (error) {
        console.log('Error signing in user:', error);
    }
};


export const asyncremoveUser = () => (dispatch, getState) => {
    try {
        // Remove current user from localStorage
        localStorage.removeItem('auth');
        
        // Dispatch action to update Redux store (clearing user data)
        dispatch(removeUser());
        
    } catch (error) {
        console.log('Error signing out user:', error);
    }
};


export const asyncupdateUser = (user) => (dispatch, getState) => {
    try {
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Update the user information
        const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...user } : u);

        // Save the updated users back to localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Update the current user in localStorage
        if (user.id === JSON.parse(localStorage.getItem('auth')).id) {
            localStorage.setItem('auth', JSON.stringify(user));
        }

        // Dispatch action to update the Redux store with the updated user
        dispatch(asynccurrentUser());
    } catch (error) {
        console.log('Error updating user:', error);
    }
};


