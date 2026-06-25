import express from 'express';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  const health = {
    status: 'OK',
    message: 'blogging-platform-api is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(health);
});

app.listen(3333, () => {
  console.log(`blogging-platform-api is running on port 3333`);
});
