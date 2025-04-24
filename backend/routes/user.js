import { Router } from "express";
import { JWT_KEY } from "../constants.js";
import authenticateToken from "./userAuth.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const router = Router();
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address, number } = req.body;
    // console.log(username, email, password, address, number);
    //check username length is more than 3
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should be greater than 3" });
    }
    //check username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exits" });
    }
    //check email already exits
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exits" });
    }
    //check password length
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length must 6 charater" });
    }
    //Number length
    // if (number.length  10) {
    //   return res.status(400).json({ message: "Number length" });
    // }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      address: address,
      number: number,
    });
    await newUser.save();
    return res.status(200).json({ message: "sign up" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

//Sign-IN
router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(400).json({ message: "Invaild Credential" });
  }
  const match = password === existingUser.password ? true : false;
  if (match) {
    const authClaims = [
      { name: existingUser.username },
      { role: existingUser.role },
    ];
    const token = jwt.sign({ authClaims }, JWT_KEY, { expiresIn: "24h" });
    res.status(200).json({
      id: existingUser._id,
      role: existingUser.role,
      token: token,
      message: "Sign in successfully",
    });
  } else {
    res.status(400).json({ message: "Password wrong" });
  }
});

//get-user-information

router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update address
router.put("/update-profile", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { username, address, number } = req.body;
    await User.findByIdAndUpdate(id, {
      username: username,
      number: number,
      address: address,
    });
    return res.status(200).json({ message: "Profile  updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/update-pwd", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { oldpwd, newpwd } = req.body;
    const user = await User.findOne({ _id: id });
    //  console.log(id, oldpwd, newpwd,user.password);
    const matchpwd = oldpwd === user.password ? true : false;
    if (matchpwd) {
      await User.findByIdAndUpdate(id, { password: newpwd });
      return res.status(200).json({ message: "password update successfully" });
    } else {
      res.status(400).json({ message: "Password wrong" });
    }
  } catch (error) {
    //  console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//all user list for admin
router.get("/get-userlist", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const isAdmin = await User.findById(id);
    if (isAdmin.role != "admin") {
      res
        .status(400)
        .json({ message: "You are not having to access to perfome admin" });
    }
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    return res.json({ status: "success", data: users });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: "An Error occured" });
  }
});

export default router;
