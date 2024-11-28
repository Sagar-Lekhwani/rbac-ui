import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncAddTask } from "../../store/Actions/userActions";

const AddTaskPage = () => {
  const { users, user } = useSelector((state) => state.user); // Get users and user from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    userId: "", // ID of the selected user
    date: new Date().toISOString().split("T")[0],
    status: 'pending', // Default to current date
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Filter users based on current user role
  const filterUsers = () => {
    if (user?.role === "admin") {
      // Admin can assign to anyone except themselves
      return users.filter((user) => user.role !== "admin");
    } else if (user?.role === "manager") {
      // Manager can only assign tasks to employees
      return users.filter((user) => user.role === "employee");
    }
    // Employees can't assign tasks to others
    return [];
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    const newTask = {
      ...taskDetails,
      id: Math.floor(Math.random() * 1000000), // Generate random task ID
    };

    try {
      await dispatch(asyncAddTask(taskDetails.userId, newTask)); // Use asyncAddTask with selected user ID
      navigate("/"); // Navigate to admin page after successful addition
    } catch (error) {
      setError("Failed to add the task. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-10">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-8 sm:p-10 md:p-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6 text-center">Add New Task</h1>
        
        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={taskDetails.title}
            onChange={handleChange}
            className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium">Description:</label>
          <textarea
            name="description"
            value={taskDetails.description}
            onChange={handleChange}
            className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            disabled={loading}
          />
        </div>

        {user?.role !== "employee" && (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">Assign to User:</label>
            <select
              name="userId"
              value={taskDetails.userId}
              onChange={handleChange}
              className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              disabled={loading}
            >
              <option value="">Select a user</option>
              {filterUsers().map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium">Date:</label>
          <input
            type="date"
            name="date"
            value={taskDetails.date}
            onChange={handleChange}
            className="w-full p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            disabled={loading}
          />
        </div>

        <div className="flex justify-center sm:justify-start">
          <button
            onClick={handleSave}
            className={`bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out ${loading ? "cursor-wait opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;
