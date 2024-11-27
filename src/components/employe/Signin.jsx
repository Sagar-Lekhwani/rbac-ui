import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignin } from "../../store/Actions/userActions";
import { Link, useNavigate } from "react-router-dom";
// import { asyncsigninEmploye } from "../../store/Actions/employeActions";

const Signin = ({onSubmit}) => {
    const [selectedOption, setSelectedOption] = useState("student");

    return (
        <div className=" fixed min-h-screen w-screen flex items-center justify-center bg-black bg-opacity-75 top-0">
            <div className="max-w-md w-full space-y-8 bg-white rounded-md p-8 relative">
                <button className="absolute top-0 right-6 text-black" onClick={onSubmit}>X</button>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
               <StudentForm onSubmit={onSubmit} />
                {/* {selectedOption === "employee" && <EmployeeForm  onSubmit={onSubmit}/>} */}
            </div>
        </div>
    );
}

const StudentForm = ({onSubmit}) => {
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
        onSubmit();
        dispatch(asyncsignin(newuser));
    };

    useEffect(() => {
        isAuth && navigate("/");
    }, [isAuth]);

    return (
        <div className="mt-6">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); signinuser(); }}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

// const EmployeeForm = ({onSubmit}) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
    
//     const navigate = useNavigate();
//     const { isEmploye } = useSelector((state) => state.employe);

//     const dispatch = useDispatch();
//     const signinuser = () => {
//         const newuser = {
//             email: email,
//             password: password,
//         };
//         onSubmit();
//         // dispatch(asyncsigninEmploye(newuser));
//     };

//     useEffect(() => {
//         isEmploye && navigate("/");
//     }, [isEmploye]);

//     return (
//         <div className="mt-6">
//             <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); signinuser(); }}>
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                     <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         autoComplete="email"
//                         required
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                     <input
//                         id="password"
//                         name="password"
//                         type="password"
//                         autoComplete="current-password"
//                         required
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <button
//                         type="submit"
//                         className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                         Sign In
//                     </button>
//                 </div>
//             </form>
//             <div className="text-center mt-4">
//                 <Link to="/sendmail" className="text-sm text-blue-500 hover:underline">Forgot your password?</Link>
//             </div>
//         </div>
//     );
// };

export default Signin;
