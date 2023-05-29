import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
/* Routes Import */
import indexRoute from './routes/index.routes.js';
import scrapingRoutes from './routes/test-task.routes.js';

/* Task Import */
import { coinsTask } from './tasks/coins/index.js';
import { newsTask } from './tasks/news/index.js';

const app = express();
const PORT = process.env.PORT;

coinsTask.initScheduledCoins();
newsTask.initScheduledNews();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
/* Importing the routes from the routes folder. */
app.use(indexRoute);
app.use(scrapingRoutes);

/* Listening to the port 3000. */
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
