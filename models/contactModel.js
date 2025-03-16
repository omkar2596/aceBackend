const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: 100,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
      unique: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
