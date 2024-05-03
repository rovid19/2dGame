import expressPackage from "express";
const express = expressPackage;

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      //"https://note-editor-client.up.railway.app",
    ],
  })
);

const server = createServer(app);
server.listen(port);
