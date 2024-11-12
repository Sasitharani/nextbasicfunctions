import React from 'react';

const DifferenceTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Feature</th>
            <th className="py-2">Route Parameters</th>
            <th className="py-2">Query Parameters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Definition</td>
            <td className="border px-4 py-2">Part of the URL path, defined using a colon (:)</td>
            <td className="border px-4 py-2">Appended to the URL after a question mark (?)</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Usage</td>
            <td className="border px-4 py-2">Typically used to identify specific resources</td>
            <td className="border px-4 py-2">Typically used to filter, sort, or provide additional data</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Appearance in URL</td>
            <td className="border px-4 py-2">Directly in the URL path</td>
            <td className="border px-4 py-2">After the URL path, separated by an ampersand (&) if multiple</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Example URL</td>
            <td className="border px-4 py-2">http://localhost:5000/api/user/admin</td>
            <td className="border px-4 py-2">http://localhost:5000/api/user?username=admin</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Route Definition</td>
            <td className="border px-4 py-2">{`app.get('/api/user/:username', (req, res) => { ... });`}</td>
            <td className="border px-4 py-2">{`app.get('/api/user', (req, res) => { ... });`}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Access in Code</td>
            <td className="border px-4 py-2">req.params.username</td>
            <td className="border px-4 py-2">req.query.username</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Example Use Case</td>
            <td className="border px-4 py-2">Accessing a specific user profile</td>
            <td className="border px-4 py-2">Filtering a list of users by username</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Multiple Values Client Side</td>
            <td className="border px-4 py-2">http://localhost:5000/api/user/admin/admin</td>
            <td className="border px-4 py-2">http://localhost:5000/api/user?username=admin&role=admin</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Multiple Values Server Side</td>
            <td className="border px-4 py-2">{`Defined in path../../../../../C:/Users/sasitharani.chandras/learnin/apithree/app/api/user\query\route.js`}</td>
            <td className="border px-4 py-2">{`Defined in path../../../../../C:/Users/sasitharani.chandras/learnin/apithree/app/api/user/[username]/[role]/route.js.`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DifferenceTable;