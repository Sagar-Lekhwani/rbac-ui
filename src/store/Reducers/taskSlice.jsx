import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    user: JSON.parse(localStorage.getItem("user")) || {}, // Assume user info is stored in localStorage
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { user } = state;
            if (user.role === "admin" || user.role === "manager") {
                const newTask = { ...action.payload };
                state.tasks.push(newTask);
                localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to localStorage
            } else {
                console.error("Only admin or manager can add tasks");
            }
        },
        updateTask: (state, action) => {
            const { taskId, updatedTask } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

            if (taskIndex !== -1) {
                const task = state.tasks[taskIndex];
                const { user } = state;

                // Manager cannot update a task assigned to themselves
                if (user.role === "manager" && task.assignedTo === user.id) {
                    console.error("Manager cannot update their own tasks.");
                    return;
                }

                // Update the task
                state.tasks[taskIndex] = { ...task, ...updatedTask };
                localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Save to localStorage
            } else {
                console.error("Task not found");
            }
        },
        deleteTask: (state, action) => {
            const { taskId } = action.payload;
            const taskToDelete = state.tasks.find((task) => task.id === taskId);

            if (!taskToDelete) {
                console.error("Task not found");
                return;
            }

            const { user } = state;
            // Manager cannot delete their own tasks
            if (user.role === "manager" && taskToDelete.assignedTo === user.id) {
                console.error("Manager cannot delete their own tasks.");
                return;
            }

            // Only admin or manager can delete a task, and manager cannot delete their own task
            if (user.role === "admin" || (user.role === "manager" && taskToDelete.assignedTo !== user.id)) {
                state.tasks = state.tasks.filter((task) => task.id !== taskId);
                localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Ensure tasks are updated in localStorage
            } else {
                console.error("Only admin or manager (not assigned to the task) can delete tasks.");
            }
        },
        saveTasks: (state) => {
            // Save all tasks to localStorage
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
    },
});

export const { addTask, updateTask, deleteTask, saveTasks } = taskSlice.actions;

export default taskSlice.reducer;
