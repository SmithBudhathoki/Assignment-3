import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data', 'items.json'); // Your JSON file path

// Route for /cars
app.get('/cars', (req, res) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading data.');
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`JSFile2 running at http://localhost:${PORT}/cars`);
});
