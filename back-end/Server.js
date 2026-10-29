import express from 'express'
import dotenv from 'dotenv'
import { DBCONNECT } from './config/DB.js';
import authRoute from './router/authRouter.js';
import cors from 'cors'
import activitiesRouter from './router/activityRoutes.js';
import propertyRoutes from './router/propertyRoutes.js';
import dashboardRouter from './router/dashboardRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(
    "https://buyland-dusky.vercel.app"
))
app.use("/api/auth", authRoute);
app.use("/api/activities", activitiesRouter);
app.use("/api/property", propertyRoutes);
app.use("/api/dashboard", dashboardRouter)

await DBCONNECT()

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})