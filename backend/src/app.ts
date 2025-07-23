import express from 'express';
import { json,urlencoded } from 'body-parser';
import cors from 'cors';
import config from './config';
import { errorHandler } from './utils/apiError';

const app = express();

app.use(
  cors({
    origin: config.allowed_origins.split(","),
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(errorHandler);

export default app;