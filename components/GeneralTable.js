import React from 'react';

const GeneralTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Feature</th>
            <th className="py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Client-Side (Browser)</td>
            <td className="border px-4 py-2">The user's web browser where the application is accessed.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">User Action</td>
            <td className="border px-4 py-2">User clicks a button or interacts with the application.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Client-Side Code</td>
            <td className="border px-4 py-2">JavaScript code running in the browser, typically using a framework like React.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">HTTP Request</td>
            <td className="border px-4 py-2">An HTTP request is sent from the client to the server.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Network Request</td>
            <td className="border px-4 py-2">The request travels over the network to the server.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Server-Side (Express Server)</td>
            <td className="border px-4 py-2">The server receives the request and processes it.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Server Response</td>
            <td className="border px-4 py-2">The server sends a response back to the client.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Client-Side Code</td>
            <td className="border px-4 py-2">The client receives the response and updates the application state.</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">State Update</td>
            <td className="border px-4 py-2">The application state is updated based on the server response.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;