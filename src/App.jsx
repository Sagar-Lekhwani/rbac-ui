import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/employe/Home";
import Signup from "./components/employe/Signup";
import Signin from "./components/employe/Signin";
import Profile from "./components/employe/notauthorised";
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentUser, asyncremoveUser } from "./store/Actions/userActions";
import Edit from "./components/employe/edit";
import Signupemployee from "./components/admin/signupemployee";
import Profile2 from "./components/admin/AddTaskPage";
import initializeMockData from "./utils/localstorage";
import UserDetailsPage from "./components/admin/UserDetailsPage";
import TaskEditPage from "./components/Task/TaskEditPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import NotAuthorized from "./components/employe/notauthorised";
import AddTaskPage from "./components/admin/AddTaskPage";

const App = () => {
    const { isAuth, user } = useSelector((state) => state.user);
    const [sign, setsign] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlecancel = () => {
        setsign(!sign);
    };

    const LogoutHandler = () => {
        setsign(!sign);
        dispatch(asyncremoveUser());
        navigate('/');
    };

    useEffect(() => {
        dispatch(asynccurrentUser());
    }, []);

    useEffect(() => {
        initializeMockData();
    }, []);

    return (
        <div className="h-full w-full bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-teal-500 to-teal-700 p-5 fixed top-0 left-0 w-full z-50 h-20 shadow-lg">
                <div className="container flex justify-between items-center ">
                    {/* Brand Name */}
                    <div className="text-white text-lg md:text-2xl font-semibold">
                        Employee Management System
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className="block lg:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Menu - Flex */}
                    <ul className={`lg:flex space-x-6 items-center justify-center lg:space-y-0 space-y-4 sm:w-full pl-4 lg:w-fit lg:relative bg-teal-700 lg:bg-transparent transition-all duration-300 ${menuOpen ? "block absolute top-20 left-0 w-full bg-teal-700" : "hidden"}`}>
                        {isAuth && user.role !== 'employee' ? (
                            <>
                                <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
                                <Link to="/edit" className="text-white hover:text-yellow-300">Edit Profile</Link>
                                <Link to="/add-Task" className="text-white hover:text-yellow-300">Add Task</Link>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                    onClick={LogoutHandler}
                                >
                                    Logout
                                </button>
                            </>
                        ) : isAuth ? (
                            <>
                                <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
                                <Link to="/edit" className="text-white hover:text-yellow-300">Edit Profile</Link>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                    onClick={LogoutHandler}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="border-2 border-blue-400 text-blue-400 font-bold py-2 px-4 rounded hover:bg-blue-400 hover:text-white"
                                    onClick={() => setsign(!sign)}
                                >
                                    Login
                                </button>
                                <Link
                                    className="bg-blue-400 text-white font-bold py-2 px-4 rounded hover:bg-blue-500"
                                    to="/signup"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            <div className="pt-20 lg:pt-24 px-4 lg:px-8"> {/* Padding for responsive layout */}
                <hr className="my-5 border-gray-300" />

                {/* Routes */}
                <Routes>
                    <Route path="/" element={isAuth ? <AdminDashboard /> : <Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signupemploye" element={<Signupemployee />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/edit" element={!isAuth ? <Home /> : <Edit />} />
                    <Route
                        path="/add-Task"
                        element={isAuth && (user.role === 'admin' || user.role === 'manager') ? <AddTaskPage /> : (isAuth ? <NotAuthorized /> : <Signin />)}
                    />
                    <Route
                        path="/tasks/:taskId"
                        element={isAuth && (user.role === 'admin' || user.role === 'manager') ? <TaskEditPage /> : <Signin />}
                    />
                    <Route
                        path="/user-details/:userId"
                        element={isAuth && (user.role === 'admin' || user.role === 'manager') ? <UserDetailsPage /> : <Signin />}
                    />
                </Routes>
            </div>

            {/* Signin Modal */}
            {sign && <Signin onSubmit={handlecancel} />}
        </div>
    );
};

export default App;
