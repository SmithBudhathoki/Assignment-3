import express from 'express';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome!</h1>
    <p>Group Members:</p>
    <ul>
      <li>Member 1: Smith Budhathoki</li>
      <li>Member 2: No Teammate</li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`JSFile1 running at http://localhost:${PORT}`);
});
