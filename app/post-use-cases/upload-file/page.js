"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SendEmail = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [highlightUpload, setHighlightUpload] = useState(false);

  const handleAttachFile = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 25 * 1024 * 1024) { // Check if file size is more than 25MB
      Swal.fire({
        icon: 'error',
        title: 'File size exceeds 25MB',
        text: 'Please select a smaller file.',
      });
      setFileSize(selectedFile.size);
      return;
    }
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
    setFileSize(selectedFile.size);
    setMessage(''); // Clear any previous messages

    // Automatically upload the file when it is selected
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File upload response:', response.data); // Log the file upload response
      setUploadedFilePath(response.data.filePath);
      setMessage(`File uploaded successfully: ${selectedFile.name}`);
      setHighlightUpload(false); // Clear highlight
    } catch (err) {
      console.error('Upload error:', err.response ? err.response.data : err.message); // Log the error
      setMessage('Failed to upload file');
    }
  };

  const handleSendEmail = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    if (!uploadedFilePath) {
      const result = await Swal.fire({
        title: 'No resume uploaded',
        text: 'Would you like to upload the resume? If you click "No", the email will be sent without the resume.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, upload resume',
        cancelButtonText: 'No, send email',
      });

      if (result.isConfirmed) {
        setHighlightUpload(true); // Highlight the upload input and button
        return;
      }
    }

    if (fileSize > 25 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File size exceeds 25MB',
        text: 'Please upload a file less than 25MB.',
      });
      return;
    }

    const emailDetails = {
      email,
      subject: 'File Upload',
      body: uploadedFilePath ? 'Please find the attached file.' : 'No attachment included.',
      ...(uploadedFilePath && { attachmentPath: uploadedFilePath, filename: fileName }),
    };

    Swal.fire({
      title: 'Sending Email...',
      text: 'Please wait while we send your email.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post('http://localhost:3001/api/send-email', emailDetails);
      console.log('Email response:', response.data); // Log the email response
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: response.data.message,
      });
      setMessage(`Email sent: ${response.data.message}`);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to send email',
        text: err.response ? err.response.data : err.message,
      });
      setMessage('Failed to send email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload a File and Send Email</h1>
        <div className={`mb-4 ${highlightUpload ? 'bg-red-100' : ''}`}>
          <label className="block text-gray-700 text-sm font-bold mb-2">File:</label>
          <input
            type="file"
            onChange={handleAttachFile}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${highlightUpload ? 'border-red-500' : ''}`}
          />
          {fileName && (
            <p className="mt-2 text-gray-700">
              File name: {fileName} ({(fileSize / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}
          {message && (
            <p className="mt-2 text-green-500">
              {message}
            </p>
          )}
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
          >
            Send Email
          </button>
        </div>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default SendEmail;