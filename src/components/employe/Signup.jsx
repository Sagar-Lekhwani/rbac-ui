import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignup } from "../../store/Actions/userActions";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setrole] = useState('employee');
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const signupuser = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Generate a unique ID for the new user
        let newId;
        do {
            newId = Math.floor(Math.random() * 1000000); // Generate a random ID
        } while (users.some(user => user.id === newId)); // Ensure it doesn't exist

        const newuser = {
            id: newId,
            name: firstname,
            email: email,
            password: password,
            role: role,
        };

        // Dispatch the action to update Redux store
        dispatch(asyncsignup(newuser));
    };

    useEffect(() => {
        isAuth && navigate("/");
    }, [isAuth]);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-200">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
                <h2 className="text-2xl font-semibold text-center mb-4">Sign up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">First Name</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstname"
                        type="text"
                        placeholder="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={signupuser}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
