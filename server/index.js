import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import db from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fullstack-auth-ixvgar7b0-nandakishore927s-projects.vercel.app"
  ],
  credentials: true
}));

// Register
app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER HIT");

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "All fields required" });
    }

    const results = await db.query(
  "SELECT * FROM users WHERE username = ?",
  [username]
);

const existingUser = results[0];

    console.log("Checked existing user");

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Password hashed");

    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    console.log("Inserted user:", result);

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
  console.error("❌ REGISTER ERROR:", err);
  res.status(500).json({ message: err.message });
}
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "All fields required" });

    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid user" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    res.json({ message: "Login successful" });
  } catch (err) {
  console.error("❌ LOGIN ERROR:", err);
  res.status(500).json({ message: err.message });
}
});

// Home route
app.get("/home", (req, res) => {
  res.json({ username: "User" });
});

// Logout route
app.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

const PORT = process.env.PORT || 5731;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));