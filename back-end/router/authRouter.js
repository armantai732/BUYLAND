import express, { Router } from 'express'
import { loginController, registerController } from '../controler/authControler.js';
import { googleAuthController } from '../controler/googleAuthController.js';

const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/google", googleAuthController);

export default authRoute;