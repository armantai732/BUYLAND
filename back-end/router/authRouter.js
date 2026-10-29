import express, { Router } from 'express'
import { getMyProfileController, loginController, registerController } from '../controler/authControler.js';
import { googleAuthController } from '../controler/googleAuthController.js';
import verifyToken from '../middelware/verifyToken.js';

const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/google", googleAuthController);
authRoute.get("/me", verifyToken, getMyProfileController);


export default authRoute;