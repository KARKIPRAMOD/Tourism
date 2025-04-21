const mongoose = require("mongoose");
const User = require("../models/user");

async function createDefaultAdmin() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/tourguide",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const adminExists = await User.findOne({ user_name: "admin" });
    if (!adminExists) {
      const admin = new User({
        user_name: "admin",
        full_name: "System Admin",
        email: "admin@system.com",
        password: "admin",
        role: "admin", // You should also include 'admin' in enum if used for roles
        address: "Default Address",
        phone: "0000000000",
        profile_picture: "default.jpg",
      });
      await admin.save();
      console.log("Default admin user created successfully");
    } else {
      // Update admin password and fields if it exists but password or role is different
      let updateNeeded = false;

      if (adminExists.password !== "admin") {
        adminExists.password = "admin";
        updateNeeded = true;
      }
      if (adminExists.role !== "admin") {
        adminExists.role = "admin";
        updateNeeded = true;
      }
      if (!adminExists.address) {
        adminExists.address = "Default Address";
        updateNeeded = true;
      }
      if (!adminExists.phone) {
        adminExists.phone = "0000000000";
        updateNeeded = true;
      }
      if (updateNeeded) {
        await adminExists.save();
        console.log(
          "Admin credentials reset and missing fields updated to defaults"
        );
      } else {
        console.log("Admin user already up-to-date");
      }
    }
  } catch (error) {
    console.error("Error managing admin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createDefaultAdmin();
