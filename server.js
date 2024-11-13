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
  const port = process.env.PORT || 3000;

  // Ensure the upload directory exists
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Use the upload router
  server.use('/api/upload', uploadRouter);

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});