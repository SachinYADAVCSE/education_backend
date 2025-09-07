import mongoose from 'mongoose';


const studentAbilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    qualification: {
      type: String,
      enum: [
        "High School (10th or below)",
        "Higher Secondary (11th - 12th)",
        "Graduate",
        "Postgraduate",
      ],
    },
    speaking: {
      type: String,
      enum: ["Very Poor", "Poor", "Good", "Better", "Excellent"],
    },
    listening: {
      type: String,
      enum: ["Very Poor", "Poor", "Good", "Better", "Excellent"],
    },
    reading: {
      type: String,
      enum: ["Very Poor", "Poor", "Good", "Better", "Excellent"],
    },
    bodyLanguage: {
      type: String,
      enum: ["Very Poor", "Poor", "Good", "Better", "Excellent"],
    },
    vocals: {
      type: String,
      enum: ["Very Poor", "Poor", "Good", "Better", "Excellent"],
    },
    grammar: {
      type: String,
      enum: ["Very Poor", "Poor", "Good", "Better", "Excellent"],
    },
    weakAreas: [
      {
        type: String,
        enum: [
          "Body Language",
          "Speaking",
          "Reading",
          "Interpersonal Communication",
          "Writing",
          "Grammar",
          "Public Speaking",
          "Presentation",
          "Interviews",
          "Q&A",
        ],
      },
    ],
  },
  { timestamps: true }
);

export const StudentAbilityModel = new mongoose.model("StudentAbility", studentAbilitySchema);


const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    userType: {type:String, default: 'user'},
})

export const UserModel = new mongoose.model('User', UserSchema);

const LectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    pdfUrl: { type: String, required: true },
    pdfPublicId: { type: String, required: true }, // for deleting later if needed
    uploadedAt: { type: Date, default: Date.now }
  });
  
export const LectureModel = new mongoose.model("Lecture", LectureSchema)


