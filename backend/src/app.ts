import express from 'express';
import { json,urlencoded } from 'body-parser';
import cors from 'cors';
import config from './config';
import { errorHandler } from './utils/apiError';
import routes from './routes';
import multer from 'multer';

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

const upload = multer({ storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }
});


app.use("/api/v1",routes(upload));

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);

export default app;