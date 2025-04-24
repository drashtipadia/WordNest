import { Router } from "express";
import authenticateToken from "./userAuth.js";
import { User } from "../models/user.js";
import { Book } from "../models/book.js";

const router = Router();

//add a book

router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.status(200).json({ message: "Book already in Cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book Added in Cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.status(200).json({ message: "Book Removed from Cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get cart of a particular user

router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart;
    return res.json({ status: "Success", data: cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
