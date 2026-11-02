import express, { Router } from 'express'
import { getAllUsers, getMyProfileController, loginController, registerController, updateUser } from '../controler/authControler.js';
import { googleAuthController } from '../controler/googleAuthController.js';
import verifyToken from '../middelware/verifyToken.js';
import isAdmin from '../middelware/isAdmin.js';

const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/google", googleAuthController);
authRoute.get("/me", verifyToken, getMyProfileController);



authRoute.get("/admin/users", verifyToken, isAdmin, getAllUsers);
authRoute.put("/admin/users/:id", verifyToken, isAdmin, updateUser);


export default authRoute;