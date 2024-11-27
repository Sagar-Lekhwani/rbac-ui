import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser } from "../../store/Reducers/userSlice";

const AdminDashboard = () => {
    const { users, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "employee",
        password: "",
    });

    const handleAddUser = () => {
        setShowForm(true); // Show the form when "Add New User" is clicked
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newUser.name && newUser.email && newUser.role && newUser.password) {
            const userToAdd = {
                id: Math.floor(Math.random() * 1000000),
                ...newUser,
            };
            dispatch(addUser(userToAdd));
            setShowForm(false); // Close the form
            setNewUser({ name: "", email: "", role: "employee", password: "" }); // Reset form
        } else {
            alert("Please fill in all fields!");
        }
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };

    const handleRowClick = (e, userId) => {
        if (e.target.tagName === "BUTTON") return;
        navigate(`/user-details/${userId}`);
    };

    const filteredUsers = users.filter((u) => u.id !== user.id);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Admin Dashboard</h1>

                {user?.role === "admin" ? (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={handleAddUser}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Add New User
                            </button>
                            <p className="text-gray-600">
                                Logged in as: <span className="font-semibold">{user.name}</span>
                            </p>
                        </div>

                        {/* Add User Form */}
                        {showForm && (
                            <form
                                onSubmit={handleFormSubmit}
                                className="bg-gray-100 p-4 rounded-lg shadow-md mb-6"
                            >
                                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Role:</label>
                                    <select
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-200">Name</th>
                                        <th className="px-4 py-2 border border-gray-200">Email</th>
                                        <th className="px-4 py-2 border border-gray-200">Role</th>
                                        <th className="px-4 py-2 border border-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((u) => (
                                        <tr
                                            key={u.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={(e) => handleRowClick(e, u.id)}
                                        >
                                            <td className="px-4 py-2 border border-gray-200">{u.name}</td>
                                            <td className="px-4 py-2 border border-gray-200">{u.email}</td>
                                            <td className="px-4 py-2 border border-gray-200">{u.role}</td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <button
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p className="text-red-600 font-semibold">
                        Access Denied. Only admins can view this page.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
