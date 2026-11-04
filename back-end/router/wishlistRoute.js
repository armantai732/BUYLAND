import express from "express";
import verifyToken from "../middelware/verifyToken.js";
import { addToWishlist, clearWishlist, getMyWishlist, removeFromWishlist } from "../controler/wishlistController.js";


const wishlistRoutes = express.Router();

wishlistRoutes.post("/add", verifyToken, addToWishlist);

wishlistRoutes.get("/my-wishlist", verifyToken, getMyWishlist);

wishlistRoutes.delete("/remove/:propertyId", verifyToken, removeFromWishlist);

wishlistRoutes.delete("/clear", verifyToken, clearWishlist);

export default wishlistRoutes;
