//modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Routes
import songRoutes from "./routes/songRoutes.js";

//Database
import connectDB from "./config/db.js";

//middlewares
import { NotFound, ErrorMiddleware } from "./middlewares/errorMiddleware.js";

//Config
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/song", songRoutes);

app.use(NotFound);
app.use(ErrorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
