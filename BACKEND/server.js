const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer"); 
const path = require("path"); 
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //  Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage }); 

app.use("/uploads", express.static("uploads")); 

// Import routers
const PackageRouter = require("./routes/packages.js");
const cusPackRouter = require("./routes/cusPacks.js");
const paymentRouter = require("./routes/payment-route");
const paymentHistoryRouter = require("./routes/payment-history-route");
const hotelRouter = require("./routes/hotels.js");
const roomRouter = require("./routes/rooms.js");

const userRouter = require("./routes/user-route");
const tourguideRouter = require("./routes/tourguides.js");
const whatsappRouter = require("./routes/whatsapp");
const adminRouter = require("./routes/admin-route");
const feedBackRouter = require("./routes/feedBack");
const tourUpdatesRouter = require('./routes/ToursUpdate'); 
const khaltiVerifyRouter = require("./routes/khalti-verify.js");



//reservations
const reserveGuideRouter = require("./routes/TourguideReservation.js");
const reserveHotelRouter = require("./routes/HotelReservation.js");
const reservePackageRouter = require("./routes/PackageReservation.js");

const tourguideFeedback = require("./routes/tourguideFeedback.js");

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Basic routes
app.get("/", (req, res) => {
  res.send("Tour Guide Management System API is running");
});

app.get("/api-test", (req, res) => {
  res.json({
    status: "API working correctly",
    time: new Date().toISOString(),
  });
});

// Database connection
const MONGO_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/admin", adminRouter);
app.use("/package", PackageRouter);
app.use("/cusPack", cusPackRouter);
app.use("/payment", paymentRouter);
app.use("/payments/history", paymentHistoryRouter);
app.use("/hotel", hotelRouter);
app.use("/room", roomRouter);
app.use("/user", userRouter); 
app.use("/tourguide", tourguideRouter);
app.use("/whatsapp", whatsappRouter);
app.use("/feedBack", feedBackRouter);

app.use("/tourguideReservation", reserveGuideRouter);
app.use("/HotelReservation", reserveHotelRouter);
app.use("/reservePackageRouter", reservePackageRouter);

app.use('/tourupdates', tourUpdatesRouter);  
app.use("/tourguideFeedback",tourguideFeedback )

app.use("/verify", khaltiVerifyRouter);

console.log("Test");

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
