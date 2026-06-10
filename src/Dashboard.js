import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Dashboard = () => ( // Remove the props here
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <nav className="flex justify-end p-4 bg-white shadow">
      {/* Wrap buttons with Link or change buttons to Links styled as buttons */}
      <Link to="/login">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
          Login
        </button>
      </Link>
      
      <Link to="/signup">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </Link>
    </nav>
    <main className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-700">Welcome to Cricket Scoring Dashboard</h1>
    </main>
  </div>
);

export default Dashboard;