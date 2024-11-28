import { saveUser, removeUser, addUser, deleteUser, updateUsers } from "../Reducers/userSlice";
import { addTask, deleteTask, updateTask } from "../Reducers/taskSlice";



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

// Add user and sync with localStorage
export const asyncAddUser = (user) => (dispatch, getState) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(addUser(user));
};

// Delete user and sync with localStorage
export const asyncDeleteUser = (userId) => (dispatch) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch(deleteUser(userId));
};

// Add a task to the tasks array and update the user's task list
export const asyncAddTask = (userId, task) => async (dispatch, getState) => {
    // Convert userId to number if necessary
    const userIdNumber = Number(userId);

    // Generate a task ID using Date.now() or any other method
    const newTask = { ...task};

    // Get the list of users from the Redux state
    const { users } = getState().user;

    // Update the user's task array with the new task ID
    const updatedUsers = users.map((user) =>
        user.id === userIdNumber // Compare as numbers
            ? { ...user, tasks: [...user.tasks, newTask.id] }
            : user
    );

    // Update localStorage with the new list of users
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Dispatch the action to add the task to the tasks list in the Redux store
    dispatch(addTask(newTask));
    dispatch(updateUsers(updatedUsers));

};



// Update a task
export const asyncUpdateTask = (taskId, updatedTask) => (dispatch, getState) => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    dispatch(updateTask({ taskId, updatedTask }));
    
};

// Delete a task
// userActions.js
export const asyncDeleteTask = (taskId) => (dispatch, getState) => {
    const { tasks } = getState().tasks;  // Fetch current tasks from store
    const { users } = getState().user;  // Fetch current users from store

    // Find the task that we want to delete
    const taskToDelete = tasks.find((task) => task.id === taskId);
    
    if (!taskToDelete) {
        console.error("Task not found.");
        return;
    }

    // Remove task from tasks array
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    // Find the user to whom the task is assigned
    const updatedUsers = users.map((user) => {
        // If the user has this task, remove the task from the user's taskIds array
        if (user.tasks.includes(taskId)) {
            return {
                ...user,
                tasks: user.tasks.filter((id) => id !== taskId),
            };
        }
        return user;
    });

    // Update local storage with updated tasks and users
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Dispatch actions to update Redux state
    dispatch(deleteTask(taskId));  // Dispatch delete task from taskSlice
    dispatch(updateUsers(updatedUsers));  // Dispatch update users from userSlice
};






