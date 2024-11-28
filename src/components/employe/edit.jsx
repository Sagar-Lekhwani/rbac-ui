import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncupdateUser } from '../../store/Actions/userActions';
import { useNavigate } from 'react-router-dom';
// import { asyncupdateUser } from '../../store/Actions/userActions';

const Edit = () => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

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
        // Validate password if provided
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
        navigate('/')

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-md shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Profile</h2>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6">
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {/* Password Fields */}
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {/* Display password error */}
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <div className="mt-6">
                    <button
                        onClick={updateUser}
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Edit;
