import { Router } from "express";
import authenticateToken from "./userAuth.js";
import { User } from "../models/user.js";
import { Book } from "../models/book.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    req.body.image = `${Date.now() + "-" + file.originalname}`;
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//add book --admin
router.post(
  "/add-book",
  [authenticateToken, upload.any("image")],
  async (req, res) => {
    try {
      const { id } = req.headers;
      const isAdmin = await User.findById(id);
      if (isAdmin.role != "admin") {
        res
          .status(400)
          .json({ message: "You are not having to access to perfome admin" });
      }
      // console.log(req.body);
      //console.log(req.headers);
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        image: req.body.image,
        language: req.body.language,
        quantity: req.body.quantity,
        ISBN: req.body.ISBN,
      });
      await book.save();
      res.status(200).json({ message: "Book add successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//update book
router.put(
  "/update-book",
  [authenticateToken, upload.any("image")],
  async (req, res) => {
    try {
      const { id, bookid } = req.headers;
      const isAdmin = await User.findById(id);
      if (isAdmin.role != "admin") {
        res
          .status(400)
          .json({ message: "You are not having to access to perfome admin" });
      }
      await Book.findByIdAndUpdate(bookid, {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        image: req.body.image,
        language: req.body.language,
        quantity: req.body.quantity,
        ISBN: req.body.ISBN,
      });
      return res.status(200).json({ message: "Book update successfully" });
    } catch (error) {
      //console.log(error);
      return res.status(500).json({ message: "An Error occured" });
    }
  }
);

//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const isAdmin = await User.findById(id);
    if (isAdmin.role != "admin") {
      res
        .status(400)
        .json({ message: "You are not having to access to perfome admin" });
    }
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book Delete Successfully" });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: "An Error occured" });
  }
});

//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({ status: "success", data: books });
  } catch (error) {
    return res.status(500).json({ message: "An Error occured" });
  }
});

//get-recent-book
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({ status: "success", data: books });
  } catch (error) {
    return res.status(500).json({ message: "An Error occured" });
  }
});

//get book by id
router.get("/get-book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({ status: "success", data: book });
  } catch (error) {
    return res.status(500).json({ message: "An Error occured" });
  }
});

export default router;
