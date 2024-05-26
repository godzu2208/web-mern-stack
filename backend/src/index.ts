import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config"
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB :", error));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get("/api/test", async (req: Request, res: Response) => {
//     res.json({ message: "Test Express server" })
// });
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(4000, () => {
    console.log("Server is running on localhost:4000")
})