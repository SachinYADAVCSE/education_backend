import express from 'express';
import {LectureModel,UserModel } from "../../db/index.js"; 
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import { StudentAbilityModel } from "../../db/index.js";
const JWT_SECRET = "badmanSuper_890"

const route = express.Router();

// @route   POST /api/student-ability
// @desc    Save student ability data
route.post("/studentAbility", async (req, res) => {
    console.log("Is it working");
    console.log(req.body, "It's coming from backend");
    try {
      const student = new StudentAbilityModel(req.body);
      await student.save();
      res.status(201).json({
        success: true,
        message: "Student data saved successfully",
        data: student,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // @route   GET /api/student-ability
  // @desc    Fetch all students data
route.get("/studentAbility", async (req, res) => {
    try {
      const students = await StudentAbilityModel.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: students });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });


// register your user
// upload.single('profile.avatarUrl' )
route.post('/register', async (req, res) => {
    console.log("it workings, ###########");
    try {
        const { name, username, email, password } = req.body;
        
       // const profileFile = req.file;

        if (!name || !username || !email || !password)
            return res.status(400).json({ msg: "Please fill all the Fields" });

        // Check if user doesn't already exists
        // $or this is a query operator of mongodb which is used to do or thing, like email or username if exist one of them
        const exist = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (exist) return res.status(409).json({ error: "User already Exists" })

        // hashing the password
        const passwordHash = await bcrypt.hash(password, 10);

        //  inserting the data into the database

        const user = await UserModel.create({
            name: name,
            username: username,
            email: email,
            passwordHash: passwordHash,
            // profile: {
            //     avatarUrl: profileFile ? profileFile.path : null, 
            // },
            // settings: { publicPageSlug: username }
        })

        const token = jwt.sign({ id: user._id, username: username }, JWT_SECRET)

        return res.status(200).json({
            user: user,
            token: token
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

// Register your user
route.post('/login', async (req, res) => {

    // don't forget to return and adding await in front of databases
    const { email, password } = req.body;

    const exist = await UserModel.findOne({ email });
    console.log(exist);
    if (!exist) return res.status(409).json({ code: 409, message: "Email doesn't Exists", data: "" })


    // getting the passwordHash
    // checking for passowrd
    if (exist) {
        const ok = await bcrypt.compare(password.toString(), exist.passwordHash)
        if (!ok) return res.status(400).json({ code: 400, message: "Invalid Credentials", data: "" })
    }

    // generate a jwt token
    const token = jwt.sign({ id: exist._id, username: exist.username }, JWT_SECRET);
    return res.status(200).json({ code: 200, message: "Login Successfully", token: token, data: exist });

})

// Get all lectures
route.get("/lectures", async (req, res) => {
    const lectures = await LectureModel.find().sort({ createdAt: -1 });
    res.json(lectures);
  });

route.get("/lectures/:id", async (req, res) => {
    try {
      const lecture = await LectureModel.findById(req.params.id);
      if (!lecture) return res.status(404).json({ message: "Lecture not found" });
      res.json(lecture);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



export default route;