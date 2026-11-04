import express, { Router } from 'express'
import { changePassword, getAllUsers, getMyProfileController, loginController, registerController, updateMyProfile, updateUser } from '../controler/authControler.js';
import { googleAuthController } from '../controler/googleAuthController.js';
import verifyToken from '../middelware/verifyToken.js';
import isAdmin from '../middelware/isAdmin.js';

const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/google", googleAuthController);
authRoute.get("/me", verifyToken, getMyProfileController);
authRoute.put("/change-password", verifyToken, changePassword);
authRoute.put("/update-profile", verifyToken, updateMyProfile);



authRoute.get("/admin/users", verifyToken, isAdmin, getAllUsers);
authRoute.put("/admin/users/:id", verifyToken, isAdmin, updateUser);


export default authRoute;