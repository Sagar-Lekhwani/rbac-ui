// src/utils/initializeMockData.js
const initializeMockData = () => {
    // Check if 'users' data exists in localStorage, if not, initialize with demo data
    if (!localStorage.getItem('users')) {
        const users = [
            { id: 1, name: 'Admin User', email: 'admin@company.com', password: 'admin123', role: 'admin', tasks: [] },
            { id: 2, name: 'Manager User', email: 'manager@company.com', password: 'manager123', role: 'manager', tasks: [2] },
            { id: 3, name: 'Employee User', email: 'employee@company.com', password: 'employee123', role: 'employee', tasks: [1,3] },
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Check if 'roles' data exists in localStorage, if not, initialize with demo data
    if (!localStorage.getItem('roles')) {
        const roles = [
            { id: 1, name: 'Admin' },
            { id: 2, name: 'Manager' },
            { id: 3, name: 'Employee' },
        ];
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    // Check if 'tasks' data exists in localStorage, if not, initialize with demo data
    if (!localStorage.getItem('tasks')) {
        const tasks = [
            { id: 1, title: 'Task 1', description: 'This is a task for Employee', userId: 3, status: 'pending' },
            { id: 2, title: 'Task 2', description: 'This is a task for Manager', userId: 2, status: 'pending' },
            { id: 3, title: 'Task 3', description: 'This is a task for Employee', userId: 3, status: 'pending' },
        ];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Check if 'auth' data exists in localStorage, if not, set to null (no user logged in initially)
    if (!localStorage.getItem('auth')) {
        localStorage.setItem('auth', JSON.stringify(null));
    }
};

// Export this function for use in other parts of the app
export default initializeMockData;
