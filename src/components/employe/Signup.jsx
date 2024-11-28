import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignup } from "../../store/Actions/userActions";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('employee');
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
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstname">First Name</label>
                        <input
                            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="firstname"
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            className="block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="button"
                            onClick={signupuser}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:text-blue-800">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
