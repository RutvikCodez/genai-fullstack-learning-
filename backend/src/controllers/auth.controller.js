import userModel from "../models/user.model.js";
import { hash as _hash, compare } from "bcryptjs";
import pkg from "jsonwebtoken";
import blackListModel from "../models/blacklist.model.js";
const { sign } = pkg;

export async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const isUSerAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUSerAlreadyExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hash = await _hash(password, 10);

  const user = await userModel.create({ username, email, password: hash });

  const token = sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function loginUserController(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  const token = sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User loggedIn successfully!",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function logoutUserController(req, res) {
    console.log(req.cookies);
    
  const token = req.cookies.token;

  if (token) {
    await blackListModel.create({ token });
  }
  
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully!" });
}

export async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({ user });
}