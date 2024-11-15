"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const PostUseCases = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">POST Use Cases</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigateTo('/post-use-cases/create-resource')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create a New Resource
          </button>
          <button
            onClick={() => navigateTo('/post-use-cases/submit-form')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Form Data
          </button>
          <button
            onClick={() => navigateTo('/post-use-cases/upload-file')}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload a File
          </button>
          <button
            onClick={() => navigateTo('/post-use-cases/login')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            onClick={() => navigateTo('/payment')}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostUseCases;