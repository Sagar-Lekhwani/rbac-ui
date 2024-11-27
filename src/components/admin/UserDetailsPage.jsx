import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { updateUserRole } from "../../store/Reducers/userSlice";

const UserDetailsPage = () => {
    const { userId } = useParams(); // Get user ID from the URL
    const { users } = useSelector((state) => state.user);
    const user = users.find((u) => u.id === parseInt(userId)); // Find the user by ID
    console.log(user)
    const dispatch = useDispatch();
    const history = useNavigate();

    const [role, setRole] = useState(user?.role);

    useEffect(() => {
        if (!user) {
            history("/admin"); // If the user doesn't exist, redirect to the admin dashboard
        }
    }, [user, history]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSave = () => {
        if (user) {
            dispatch(updateUserRole({ userId: user.id, newRole: role }));
            history("/admin"); // Redirect back to the dashboard after saving
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">User Details</h1>
                {user ? (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={user.firstname}
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

                        <div className="flex justify-between">
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => history("/admin")}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-600 font-semibold">User not found.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailsPage;
