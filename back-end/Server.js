import express from 'express'
import dotenv from 'dotenv'
import { DBCONNECT } from './config/DB.js';
import authRoute from './router/authRouter.js';
import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/auth", authRoute);

await DBCONNECT()

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})