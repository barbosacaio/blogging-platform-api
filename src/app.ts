import express from 'express';
import { migrate } from './service/migration.service';
import { errorMiddleware } from './middleware/errorHandler';

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

app.use(errorMiddleware);

async function main() {
  try {
    await migrate();

    app.listen(3333, () => {
      console.log(`blogging-platform-api is running on port 3333`);
    });
  } catch (error) {
    console.error(`Error executing migrations: ${error}`);
    process.exit(1);
  }
}

main();
