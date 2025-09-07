// routes/assets.js
import express from "express";
import multer from "multer";
import cloudinary from "../../config/cloudinary.js";
import fs from "fs";
import {LectureModel}from "../../db/index.js";

const router = express.Router();

// Save temporarily before uploading to Cloudinary
const upload = multer({ dest: "uploads/" });

router.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("✅ File received:", req.file); // debug

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",  // required for PDFs
      folder: "lectures",    // Cloudinary folder
    });

    console.log(result);
    
    // Remove local temp file
    fs.unlinkSync(req.file.path);

    // Save to DB
    const lecture = new LectureModel({
        title: req.body.title || "Utitled Lecture",
        description: req.body.description || "",
        pdfUrl: result.secure_url,
        pdfPublicId: result.public_id,
    })

    // saving data into the database
    const data = await lecture.save();


    // Giving data to the frontend
    res.json({
      message: "✅ PDF uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("❌ Cloudinary upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
