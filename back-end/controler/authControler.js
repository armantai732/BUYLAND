import bcrypt from "bcrypt";
import Auth from "../model/authMdel.js";
import jwt from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { role, name, mobileNumber, email, password, secretKey, } = req.body;

        // Validate required fields
        if (!name || !mobileNumber || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled",
            });
        }

        // Validate password
        if (password.length < 7) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedMobile = mobileNumber.trim();

        // Check duplicate email or mobile number
        const existingUser = await Auth.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }

        // Allow only approved roles
        const allowedRoles = [
            "user",
            "owner",
            "agent",
            "builder",
            "investor",
            "admin",
        ];

        const selectedRole = (role || "user").toLowerCase();

        if (!allowedRoles.includes(selectedRole)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type",
            });
        }

        // IMPORTANT: Public signup must not create admins automatically.
        // Configure ADMIN_SECRET_KEY in the backend environment.
        if (selectedRole === "admin") {
            if (
                !process.env.ADMIN_SECRET_KEY ||
                !secretKey ||
                secretKey !== process.env.ADMIN_SECRET_KEY
            ) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid admin secret key",
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create account
        const newUser = await Auth.create({
            role: selectedRole,
            name: name.trim(),
            mobileNumber: normalizedMobile,
            email: normalizedEmail,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobileNumber: newUser.mobileNumber,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);

        // Handle MongoDB unique index errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email or mobile number already registered",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await Auth.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Register First!",
            });
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Password Not Match",
            });
        }

        // JWT secret must be configured in backend .env
        if (!process.env.JWT) {
            console.error("JWT is not configured");

            return res.status(500).json({
                success: false,
                message: "Server configuration error",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id.toString(),
                role: user.role,
            },
            process.env.JWT,
            { expiresIn: "7d" }
        );

        // Send response without password
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};