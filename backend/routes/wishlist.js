import { Router } from "express";
import authenticateToken from "./userAuth.js";
import { User } from "../models/user.js";
const router = Router();

//add book to wishlist
router.put("/add-book-to-wishlist", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.wishlist.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book already in wishlist" });
    }
    await User.findByIdAndUpdate(id, { $push: { wishlist: bookid } });
    return res.status(200).json({ message: "Book Added in Wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//remove book to wishlist
router.put("/remove-book-to-wishlist", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    // console.log(userData);
    const isBookFavourite = userData.wishlist.includes(bookid);
    if (isBookFavourite) {
      await User.findByIdAndUpdate(id, { $pull: { wishlist: bookid } });
    }

    return res.status(200).json({ message: "Book removed in Wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get Wishlist books
router.get("/get-wishlist-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("wishlist");
    const favouriteBooks = userData.wishlist;
    return res.json({ status: "Success", data: favouriteBooks });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
