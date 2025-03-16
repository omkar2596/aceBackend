const { body, validationResult } = require("express-validator");
const Contact = require("../models/contactModel"); // Import your Contact model

const validateRequest = [
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("mobile")
    .trim()
    .isNumeric()
    .withMessage("Mobile number must contain only digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be exactly 10 digits")
    .custom(async (value) => {
      const existingUser = await Contact.findOne({ mobile: value });
      if (existingUser) {
        throw new Error("Mobile number already exists");
      }
      return true;
    }),
  body("message").isLength({ min: 10 }).withMessage("Message must be at least 10 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

module.exports = validateRequest;
