import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (request, response) => {
  try {
    const { email, password, username } = request.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
    });
    const token = generateToken(newUser._id);

    await newUser.save();

    return response.status(201).json({ success: true, token });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ success: false, message: "All fields are required " });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    response.status(200).json({ token: token, success: true, user: user });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//logout route doesnot need to be created since we just have to delete the token from localstorage in client

export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
