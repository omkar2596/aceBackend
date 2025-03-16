const Contact = require("../models/contactModel");

// Create a new contact entry
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, mobile, message } = req.body;
    const contact = await Contact.create({ name, email, subject, mobile, message });

    res.status(201).json({ success: true, message: "Form submitted successfully", data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all contacts

const getContactForms = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // Check if contacts exist
    if (contacts.length === 0) {
      return res.status(404).json({ success: false, message: "No contacts found" });
    }

    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// Get a single contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) { // Validate MongoDB ObjectId
      return res.status(400).json({ success: false, message: "Invalid contact ID" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete a contact entry by ID
const deleteContactForm = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) { // Validate MongoDB ObjectId
      return res.status(400).json({ success: false, message: "Invalid contact ID" });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, message: "Contact deleted successfully", data: deletedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete all contact entries
const deleteAllContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res.status(200).json({ success: true, message: `${result.deletedCount} contacts deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { submitContactForm, getContactForms, getContactById, deleteContactForm, deleteAllContacts };
