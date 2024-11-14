// server.js
const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const uploadRouter = require('./express/routes/upload');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const port = 3001; // Always use port 3001

  // Ensure the upload directory exists
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Configure body size limit
  server.use(express.json({ limit: '50mb' })); // Adjust the limit as needed
  server.use(express.urlencoded({ limit: '50mb', extended: true })); // Adjust the limit as needed

  // Use the upload router
  server.use('/api/upload', uploadRouter);

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    console.log(`Handling request for ${req.url}`); // Logging statement
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});


