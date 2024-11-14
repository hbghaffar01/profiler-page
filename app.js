const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/profile", upload.single("profilePicture"), (req, res) => {
  const { name, email, bio } = req.body;
  const profilePicture = req.file ? req.file.filename : null;
  console.log("Profile Data:", { name, email, bio, profilePicture });

  res.json({
    message: "Profile submitted successfully!",
    data: { name, email, bio, profilePicture },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
