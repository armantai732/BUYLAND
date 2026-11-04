import bcrypt from "bcrypt";
import Auth from "../model/authMdel.js";
import jwt from 'jsonwebtoken'
import Property from "../model/propertyModel.js";

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


export const getMyProfileController = async (req, res) => {
  try {
    // User ID JWT token se milegi
    const userId = req.user.id || req.user._id || req.user.userId;

    const user = await Auth.findById(userId)
      .select("name email mobileNumber role city state")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get My Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find()
      .select("-password -secretKey")
      .sort({ createdAt: -1 })
      .lean();

    const usersWithPropertyCount = await Promise.all(
      users.map(async (user) => {
        const totalProperties = await Property.countDocuments({
          seller: user._id,
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.mobileNumber,
          role: user.role,
          status: user.status || "Active",
          joinedOn: user.createdAt,
          totalProperties,
        };
      })
    );

    return res.status(200).json({
      success: true,
      totalUsers: usersWithPropertyCount.length,
      users: usersWithPropertyCount,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    const allowedRoles = [
      "user",
      "owner",
      "agent",
      "builder",
      "investor",
      "admin",
    ];

    const allowedStatuses = ["Active", "Suspended"];

    // Check user ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check whether at least one field is provided
    if (role === undefined && status === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide role or status",
      });
    }

    // Validate role
    if (role !== undefined && !allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    // Validate status
    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status",
      });
    }

    const user = await Auth.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update only provided fields
    if (role !== undefined) user.role = role;
    if (status !== undefined) user.status = status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.mobileNumber,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};



// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Check required fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check new password length
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    // Check confirm password
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // Get logged-in user
    const user = await Auth.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Prevent same password
    const isSamePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE PROFILE
export const updateMyProfile = async (req, res) => {
  try {
    const { name, mobileNumber, city, state } = req.body;

    // Logged-in user
    const user = await Auth.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Name validation
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      user.name = name.trim();
    }

    // Mobile validation
    if (mobileNumber !== undefined) {
      const mobile = mobileNumber.trim();

      if (mobile && !/^(\+91)?[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid mobile number",
        });
      }

      user.mobileNumber = mobile || null;
    }

    // City
    if (city !== undefined) {
      user.city = city.trim();
    }

    // State
    if (state !== undefined) {
      user.state = state.trim();
    }

    await user.save();

    const updatedUser = await Auth.findById(user._id).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};