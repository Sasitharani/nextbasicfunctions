"use client";
import React, { useState } from 'react';
import axios from 'axios';

const SendEmail = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleAttachFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSendEmail = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('body', body);

    try {
      const response = await axios.post('http://localhost:3001/api/send-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Email response:', response.data); // Log the email response
      setMessage(`Email sent: ${response.data.message}`);
    } catch (err) {
      console.error('Email error:', err.response ? err.response.data : err.message); // Log the error
      setMessage('Failed to send email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Attach Resume and Send Email</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">File:</label>
          <input
            type="file"
            onChange={handleAttachFile}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSendEmail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!file} // Disable the button if no file is selected
          >
            Send Email
          </button>
        </div>
        {fileName && <p className="mt-4 text-center text-gray-700">File name: {fileName}</p>}
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default SendEmail;