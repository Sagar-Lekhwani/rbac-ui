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
// import { asynccurrentEmploye, asyncremoveEmploye } from "./store/Actions/employeActions";
// import SignInPage from "./components/admin/signinemp";
import initializeMockData from "./utils/localstorage";
// import Employeepage from "./components/admin/AdminDashboard";
import UserDetailsPage from "./components/admin/UserDetailsPage";
// import AddTaskForm from "./components/admin/AddTaskForm";
import TaskEditPage from "./components/Task/TaskEditPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import NotAuthorized from "./components/employe/notauthorised";
import AddTaskPage from "./components/admin/AddTaskPage";
// import TaskEditPage from "./components/Task/TaskEditPage";





const App = () => {
    const { isAuth, user } = useSelector((state) => state.user);
    const { isEmploye, employe } = useState(false);
    const [sign, setsign] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlecancel = () => {
        setsign(!sign)
    }

    const LogoutHandler = () => {
        console.log("click");
        setsign(!sign)
        dispatch(asyncremoveUser());
        navigate('/')
    };

    useEffect(() => {
        dispatch(asynccurrentUser());
    }, []);
    useEffect(() => {
      initializeMockData();
    }, []);
    return (
        <div className="h-screen w-screen ">
            <nav className="p-5 flex gap-x-5">
            <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
            
          
                
                {isAuth && user.role !== 'employee' ? (
                    <>
                      <div className="flex items-center">
                      Employee Management System
                     </div>
                    <ul className="flex space-x-6">
                    {/* <Link to="/">Home</Link> */}
                        <Link to="/">Home</Link>
                        <Link to="/edit">Edit Profile</Link>
                        <Link to="/add-Task">Add Task</Link>
                        <button className="" onClick={LogoutHandler}>Logout</button>
                        
                        </ul>
                    </>
                ) : (isAuth  ? (
                  <>
                  <div className="flex items-center">
                  Employee Management System </div>
                <ul className="flex space-x-6">
                {/* <Link to="/">Home</Link> */}
                    <Link to="/">Home</Link>
                    <Link to="/edit">Edit Profile</Link>
                    {/* <Link to="/add-Task">Add Task</Link> */}
                    <button className="" onClick={LogoutHandler}>Logout</button>
                    
                    </ul>
                    </>

                )

                : ( <>
                    <div className="flex items-center">
                      Employee Management System
                     </div>
                    <ul className="flex space-x-6">
                        <button className=" border-blue-400 border-[1px] border-solid text-blue-400 font-bold py-2 px-4 rounded" onClick={() => setsign(!sign)}>Login</button>
                        <Link className=" bg-blue-400 text-white font-bold py-2 px-4 rounded" to="/signup">Signup</Link>
                        </ul>
                        </>
                )) 
              }
                
                </div>
                </div>
            </nav>
            <hr />
            <Routes>
                <Route path="/" element={isAuth ? <AdminDashboard /> : <Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signupemploye" element={<Signupemployee />} />
                <Route path="/signin" element={<Signin />} />
                {/* <Route path="/signinpage" element={<SignInPage />} /> */}
                <Route path="/edit" element={!isAuth ? <Home /> : <Edit />} />
                {/* <Route path="/not-authorized" element={<NotAuthorized />}/> */}
                <Route path="/add-Task" element={ isAuth && (user.role === 'admin' || 'manager') ? <AddTaskPage /> : (isAuth ? <NotAuthorized/> : <Signin />)}/>
                <Route path="/tasks/:taskId" element={ isAuth && (user.role === 'admin' || 'manager') ? <TaskEditPage /> : <Signin />}/>
                <Route
    path="/user-details/:userId"
    element={isAuth && user.role === "admin" || 'manager' ? <UserDetailsPage /> : <Signin />}
/>

            </Routes>
 
            {sign && <Signin onSubmit={handlecancel}/>}
        </div>
    );
};

export default App;

