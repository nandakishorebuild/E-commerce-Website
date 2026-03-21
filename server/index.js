import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";        // ✅ NEW - import jwt
import db from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ Fixed CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.includes("vercel.app") || origin.includes("localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ NEW - Middleware to verify JWT cookie (used in /home)
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded has { id, username }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Register - no changes needed here
app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER HIT");

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Fixed Login - now creates JWT and sets cookie
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) 
      return res.status(400).json({ message: "All fields required" });

    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ?", 
      [username]
    );
    if (rows.length === 0) 
      return res.status(400).json({ message: "Invalid user" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) 
      return res.status(400).json({ message: "Invalid password" });

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }  // token expires in 1 day
    );

    // ✅ Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,      // JS can't access it (safe)
      secure: true,        // only sent over HTTPS
      sameSite: "None",    // needed for cross-origin (Vercel + Render)
      maxAge: 24 * 60 * 60 * 1000  // 1 day in milliseconds
    });

    res.json({ message: "Login successful" });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Fixed Home - now protected and returns real username
app.get("/home", verifyToken, (req, res) => {
  res.json({ username: req.user.username }); // ✅ real username from JWT
});

// ✅ Fixed Logout - now clears the cookie
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.json({ message: "Logout successful" });
});

const PORT = process.env.PORT || 5731;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));