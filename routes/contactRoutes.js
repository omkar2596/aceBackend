const express = require("express");
const { 
  submitContactForm, 
  getContactForms, 
  getContactById,  // Added Get Contact by ID function
  deleteContactForm, 
  deleteAllContacts 
} = require("../controllers/contactController");
const validateRequest = require("../middleware/validation");

const router = express.Router();

router.post("/contact", validateRequest, submitContactForm);  // Submit form
router.get("/contacts", getContactForms);                     // Get all forms
router.get("/contact/:id", getContactById);                   // Get contact by ID
router.delete("/contact/:id", deleteContactForm);             // Delete a form by ID
router.delete("/contacts", deleteAllContacts);                // Delete all forms

module.exports = router;
