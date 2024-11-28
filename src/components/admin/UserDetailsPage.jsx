
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserRole } from "../../store/Reducers/userSlice";

const UserDetailsPage = () => {
    const { userId } = useParams();
    const { users } = useSelector((state) => state.user);
    const { tasks } = useSelector((state) => state.tasks);
    const user = users.find((u) => u.id === parseInt(userId));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [role, setRole] = useState(user?.role);

    const userTasks = user.tasks
        .map((taskId) => tasks.find((task) => task.id === taskId)) // Find task details by ID
        .filter((task) => task); 

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSaveRole = () => {
        if (user) {
            dispatch(updateUserRole({ userId: user.id, newRole: role }));
            navigate("/");
        }
    };

    const handleTaskClick = (taskId) => {
        navigate(`/tasks/${taskId}`); // Redirect to the task edit page
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">User Details</h1>
                {user ? (
                    <>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    disabled
                                    className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full p-2 mt-2 bg-gray-100 rounded border border-gray-300"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Role:</label>
                                <select
                                    value={role}
                                    onChange={handleRoleChange}
                                    className="w-full p-2 mt-2 bg-white rounded border border-gray-300"
                                >
                                    <option value="employee">Employee</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-between mb-6">
                                <button
                                    onClick={handleSaveRole}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Save Role
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Tasks</h2>
                        {userTasks && userTasks.length > 0 ? (
                            <table className="table-auto w-full text-left border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-200">Task</th>
                                        <th className="px-4 py-2 border border-gray-200">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userTasks.map((task) => (
                                        <tr
                                            key={task.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleTaskClick(task.id)}
                                        >
                                            <td className="px-4 py-2 border border-gray-200">
                                                {task.id}
                                            </td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                {task.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600">No tasks assigned.</p>
                        )}
                    </>
                ) : (
                    <p className="text-red-600 font-semibold">User not found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailsPage;

