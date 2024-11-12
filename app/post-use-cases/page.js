"use client"
import React, { useState } from 'react';
import axios from 'axios';

const PostUseCases = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  // Handle POST request to create a new resource
  const handleCreateResource = async () => {
    try {
      const response = await axios.post('/api/submit', { username, role });
      setMessage(`Resource created: ${response.data.username} with role ${response.data.role}`);
    } catch (err) {
      setMessage('Failed to create resource');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Resource</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleCreateResource}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Resource
          </button>
        </div>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default PostUseCases;