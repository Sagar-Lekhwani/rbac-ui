import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncupdateUser } from '../../store/Actions/userActions';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validatePassword = () => {
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return false;
        }
        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        setPasswordError('');
        return true;
    };

    const updateUser = () => {
        if (newPassword || oldPassword) {
            if (!validatePassword()) return;
        }

        const updatedUser = {
            email: email,
            name: name,
            id: user.id,
            role: user.role,
            password: newPassword,
        };

        dispatch(asyncupdateUser(updatedUser));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200  py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Edit Profile</h2>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-gray-700 text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-gray-700 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Fields */}
                    <div className="space-y-1">
                        <label className="text-gray-700 text-sm font-medium">Old Password</label>
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="Enter your old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-gray-700 text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter a new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-gray-700 text-sm font-medium">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Display password error */}
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>

                <div>
                    <button
                        onClick={updateUser}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
