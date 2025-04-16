import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data', 'items.json'); // Your JSON file path

app.use(express.json());

// GET all items (will list the car items)
app.get('/items', (req, res) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.send(JSON.parse(data)); // Return JSON data
  });
});

// POST a new item (create a new car)
app.post('/items', (req, res) => {
  const newItem = req.body;

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const items = JSON.parse(data);
    items.push(newItem);

    fs.writeFile(dataPath, JSON.stringify(items, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.status(201).send(newItem);
    });
  });
});

// PUT - update an item by id (update car details)
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const items = JSON.parse(data);
    const index = items.findIndex(i => i.id === itemId);
    if (index === -1) return res.status(404).send('Item not found');

    items[index] = { ...items[index], ...updatedData };

    fs.writeFile(dataPath, JSON.stringify(items, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.send(items[index]);
    });
  });
});

// DELETE an item by id (delete a car)
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    let items = JSON.parse(data);
    items = items.filter(i => i.id !== itemId);

    fs.writeFile(dataPath, JSON.stringify(items, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.send({ message: 'Item deleted' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`JSFile3 running at http://localhost:${PORT}`);
});
