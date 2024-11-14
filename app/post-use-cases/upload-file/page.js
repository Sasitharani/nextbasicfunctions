"use client";
import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data); // Log the server response
      setMessage(`File uploaded: ${response.data.message}`);
    } catch (err) {
      console.error('Upload error:', err.response ? err.response.data : err.message); // Log the error
      setMessage('Failed to upload file');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload a File</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleFileUpload}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload File
          </button>
        </div>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default UploadFile;