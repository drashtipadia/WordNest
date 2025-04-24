import { Router } from "express";
import { Contact } from "../models/contact.js";
import authenticateToken from "./userAuth.js";
import { User } from "../models/user.js";

const router = Router();

//user contact
router.post("/usercontact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({
      name: name,
      email: email,
      message: message,
    });
    await newContact.save();
    return res.status(200).json({ message: "Thank you for contact :)" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

//all contact retrive
router.get("/allcontactlist", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const isAdmin = await User.findById(id);
    if (isAdmin.role != "admin") {
      res
        .status(400)
        .json({ message: "You are not having to access to perfome admin" });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.json({ status: "success", data: contacts });
  } catch (error) {
    return res.status(500).json({ message: "An Error occured" });
  }
});

//delete contact
router.delete(
  "/delete-contact/:contactid",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.headers;
      const { contactid } = req.params;
      const isAdmin = await User.findById(id);
      if (isAdmin.role != "admin") {
        res
          .status(400)
          .json({ message: "You are not having to access to perfome admin" });
      }
      await Contact.findByIdAndDelete(contactid);
      return res.status(200).json({ message: "Contact deleted Successfully" });
    } catch (error) {
      //console.log(error);
      return res.status(500).json({ message: "An Error occured" });
    }
  }
);

export default router;
