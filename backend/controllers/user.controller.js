import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import PDFDocument from "pdfkit";
import multer from "multer";
import { Connection } from "mongoose";

// Convert user profile to PDF
const convertUserDataTOPDF = async (userData) => {
  const doc = new PDFDocument();
  const outputPath = crypto.randomBytes(16).toString("hex") + ".pdf";
  const fullPath = "uploads/" + outputPath;

  const stream = fs.createWriteStream(fullPath);
  doc.pipe(stream);

  // Add profile picture if available
  if (userData.userId.profilePicture) {
    try {
      doc.image(`uploads/${userData.userId.profilePicture}`, {
        align: "center",
        width: 100,
      });
    } catch (e) {
      console.warn("Profile picture not found or invalid:", e.message);
    }
  }

  // Basic user info
  doc.fontSize(14).text(`Name: ${userData.userId.name}`);
  doc.text(`Email: ${userData.userId.email}`);
  doc.text(`Username: ${userData.userId.username}`);
  if (userData.userId.phone) doc.text(`Phone: ${userData.userId.phone}`);
  if (userData.userId.address) doc.text(`Address: ${userData.userId.address}`);
  if (userData.userId.currentPosition)
    doc.text(`Current Position: ${userData.userId.currentPost}`);

  // Past work section
  if (Array.isArray(userData.pastWork) && userData.pastWork.length > 0) {
    doc.moveDown().fontSize(14).text("Past Work:");
    userData.pastWork.forEach((work, index) => {
      doc.moveDown().fontSize(12).text(`Work ${index + 1}:`);
      doc.text(`Company Name: ${work.companyName}`);
      doc.text(`Years: ${work.years}`);
      doc.text(`Year: ${work.year}`);
    });
  }

  doc.end();

  
  await new Promise((resolve) => stream.on("finish", resolve));

  return outputPath;
};


// USER REGISTRATION
export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !password || !email || !username)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const profile = new Profile({ userId: newUser._id });
    await profile.save();

    return res.json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// USER LOGIN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = crypto.randomBytes(32).toString("hex");
    user.token = token;
    await user.save();

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// PROFILE PICTURE UPLOAD
export const uploadProfilePicture = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ token });

    if (!user)
      return res.status(404).json({ message: "User not found or invalid token" });

    user.profilePicture = req.file.filename;
    await user.save();

    return res.json({ message: "Profile picture updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// UPDATE USER PROFILE

export const updateUserProfile = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;
    const user = await User.findOne({ token });

    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, email } = newUserData;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (
      existingUser &&
      String(existingUser._id) !== String(user._id)
    ) {
      return res.status(400).json({ message: "Username or email already taken" });
    }

    Object.assign(user, newUserData);
    await user.save();

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET USER + PROFILE

export const getUserAndProfile = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name email username profilePicture"
    );

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// UPDATE PROFILE DATA
export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;
    const user = await User.findOne({ token });

    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await Profile.findOne({ userId: user._id });
    Object.assign(profile, newProfileData);
    await profile.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// GET ALL PROFILES
export const getAllUserProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "userId",
      "name username email profilePicture"
    );
    return res.json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DOWNLOAD PROFILE AS PDF

export const downloadProfile = async (req, res) => {
  try {
    const user_id = req.query.id;
    const profile = await Profile.findOne({ userId: user_id }).populate(
      "userId",
      "name username email profilePicture"
    );

    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const pdfFileName = await convertUserDataTOPDF(profile);
    return res.json({ file: pdfFileName });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const sendConnectionRequest = async(req,res) =>{
    const { token, connectionId } = req.body;
    
    try{
        const user = await User.findOne({ token }); // token se pta cha jayeg ki kon bhej rha h, kisko bhej rha h ye connection id h 

        if(!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const connectionUser = await User.findOne({ _id: connectionId });

        if(!connectionUser) {
            return res.status(404).json({ message: "Connection User not found" })
        }

        const existingRequest = await sendConnectionRequest.findOne(
            {
                userId: updateUserProfile._id,
                connectionId: connectionUser._id
            }
        )

        if(existingRequest) {
            return res.status(400).json({ message: "Request already sent" })
        }

        const request = new ConnectionRequest({
            userId :user._id,
            connectionId :connectionUser._id
        });

        await request.save();

        return res.json({ message: "Request sent" })

    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}


//connection layenge kse 
export const getMyConnectionRequests = async(req,res) =>{
    const { token } = req.body;
    try{
      const user = await User.findOne({ token });

      if(!user) {
        return res.status(404).json({ message: "User not found" })
      }
      const connections = await ConnectionRequest.find({ userId: user._id })
        .populate('connectionId', 'name username email profilePicture');

        return res.json({ connections })

    }catch(err){
        return res.status(500).json({ message : err.message })
    }
}


export const whatAreMyConnections = async (req, res) =>{
  const { token }= req.body;

  try{
    const user = await User.findOne({ token });

    if(!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const connections = await ConnectionRequest.find({ connectionId: user._id })
    .populate('userId', 'name username email profilePicture');

    return res.json(connections);
  }catch (error){
    return res.status(500).json({ message: error.message })
  }
}

export const acceptConectionRequest = async(req,res) =>{
  const { token, requestId, action_type } = req.body;

  try{
    const user = await User.findOne({ token });
    if(!user) {
      return res.status(404).json({message: "user not found" })
    }

    const connection = await connectionRequest.findOne({ _id: requestId });
    if(!connection) {
      return res.status(404).json({message :"Connectiom not found" })
    }

    if(action_type == "accept"){
      connection.status_accepted = true;
    }else{
      connection.status_accepted = false;
    }

    await connection.save();
    return res.json({message: "Request Updated" })

  }catch(error){
    return res.status(500).json({ message: error.message })
  }
}