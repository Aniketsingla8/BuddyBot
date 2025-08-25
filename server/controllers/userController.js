import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Chat from "../models/Chat.js";

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//API to register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({success: false, message: "User already exists" });
        }

        const user = await User.create({ name, email, password });

        const token = generateToken(user._id);
        res.json({success: true, message: "User registered successfully", token});
    } catch (error) {
        res.json({success: false, message: "Error registering user", error});
    }
};

//Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({success: false, message: "Invalid Email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Invalid Password" });
        }

        const token = generateToken(user._id);
        res.json({success: true, message: "User logged in successfully", token});
    } catch (error) {
        res.json({success: false, message: "Error logging in user", error});
    }
};

//Get User Data
export const getUserData = async (req, res) => {
    try {
        const user = req.user;
        res.json({success: true, user});
    } catch (error) {
        res.json({success: false, message: "Error fetching user data", error});
    }
};

//Api to get published images
export const getPublishedImages = async (req, res) => {
    try {
        const publishedImageMessages = await Chat.aggregate([
            {$unwind: "$messages"},
            {$match: {"messages.isImage": true, "messages.isPublished": true}},
            {$project: {_id: 0, imageUrl: '$messages.content', userName: "$userName"}}
        ]);

        res.json({ success: true, images: publishedImageMessages.reverse() });
    } catch (error) {
        res.json({ success: false, message: "Error fetching published images" });
    }
};