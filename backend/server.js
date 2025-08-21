require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');

const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");

const app = express();

// Middleware to handle CORS
const corsOptions = {
	origin: [
		"https://ai-interview-prep-nc.vercel.app", // Your frontend
		"http://localhost:3000", // Local development
		"http://localhost:5173", // Vite dev server
	],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

app.use(cors(corsOptions));

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));