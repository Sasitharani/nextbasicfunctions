const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Step 4: Handle GET request to check server connection
app.get('/api/connect', (req, res) => {
    console.log(req.query)
  res.status(200).send('Connected to server');
});

// Step 5: Handle POST request to process form data
app.post('/api/submit', (req, res) => {
  const { username, role } = req.body;
  let message = `Welcome ${username} from post request`;
  if (role === 'admin') {
    message += ', you have admin rights';
  }
  res.status(200).json({ message });
});

// Step 6: Handle GET request with username and role as query parameters
app.get('/api/user/query', (req, res) => {
    const { username, role } = req.query; // Query parameters
    let message = `Welcome ${username} with role ${role} from get request as Query parameter`;
    res.status(200).json({ message });
  });
  
  // Step 7: Handle GET request with username and role as route parameters
  app.get('/api/user/route/:username/:role', (req, res) => {
    const { username, role } = req.params; // Route parameters
    let message = `Welcome ${username} with role ${role} from get request as Route parameter`;
    res.status(200).json({ message });
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});