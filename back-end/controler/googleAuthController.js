import jwt from "jsonwebtoken";
import Auth from "../model/authMdel.js";
import { firebaseAdminAuth } from "../config/firebaseAdmin.js";

export const googleAuthController = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "Firebase ID token is required",
            });
        }

        if (!process.env.JWT) {
            return res.status(500).json({
                success: false,
                message: "Server configuration error",
            });
        }

        // Verify token using Firebase Admin SDK
        const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);

        if (!decodedToken.uid || !decodedToken.email) {
            return res.status(401).json({
                success: false,
                message: "Google account details are missing",
            });
        }

        if (decodedToken.email_verified !== true) {
            return res.status(403).json({
                success: false,
                message: "Please use a verified Google email",
            });
        }

        const firebaseUid = decodedToken.uid;
        const email = decodedToken.email.trim().toLowerCase();
        const name =
            decodedToken.name?.trim() ||
            email.split("@")[0];

        // Find existing Firebase account first
        let user = await Auth.findOne({ firebaseUid });

        if (user) {
            // Do not silently switch an existing account's email
            if (user.email !== email) {
                return res.status(409).json({
                    success: false,
                    message: "Google email does not match the linked account",
                });
            }
        } else {
            // Reuse an existing account with this verified email
            user = await Auth.findOne({ email });

            if (user) {
                // Link Google identity without overwriting role/password
                if (user.firebaseUid && user.firebaseUid !== firebaseUid) {
                    return res.status(409).json({
                        success: false,
                        message: "This email is linked to another Google account",
                    });
                }

                user.firebaseUid = firebaseUid;
                user.provider = "google";

                if (!user.name && name) {
                    user.name = name;
                }

                await user.save();
            } else {
                // New Google user: role is assigned by the server
                user = await Auth.create({
                    name,
                    email,
                    firebaseUid,
                    provider: "google",
                    role: "user",
                });
            }
        }

        // Issue your own backend JWT for existing protected APIs
        const token = jwt.sign(
            {
                id: user._id.toString(),
                role: user.role,
            },
            process.env.JWT,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Google login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber ?? null,
                role: user.role,
                provider: user.provider,
            },
        });
    } catch (error) {
        console.error("Google Auth Error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Account already exists. Please try logging in again.",
            });
        }

        if (
            error.code === "auth/argument-error" ||
            error.code === "auth/id-token-expired" ||
            error.code === "auth/invalid-id-token"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired Firebase token",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Google login failed. Check backend terminal.",
        });
    }
}