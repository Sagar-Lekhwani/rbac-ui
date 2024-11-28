import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignin } from "../../store/Actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ onSubmit }) => {
    const [selectedOption, setSelectedOption] = useState("student");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-500 bg-opacity-75">
            <div className="max-w-lg w-full space-y-8 bg-white rounded-xl shadow-lg p-8 relative">
                <button
                    className="absolute top-4 right-6 text-gray-700 text-xl"
                    onClick={onSubmit}
                >
                    X
                </button>
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Sign in</h2>
                <Form onSubmit={onSubmit} />
            </div>
        </div>
    );
};

const Form = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const signinuser = () => {
        const newuser = {
            email: email,
            password: password,
        };
        dispatch(asyncsignin(newuser));
    };

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    return (
        <div className="mt-6">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); signinuser(); onSubmit(); }}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <Link to="/sendmail" className="text-sm text-blue-500 hover:underline">Forgot your password?</Link>
            </div>
        </div>
    );
};

export default Signin;
