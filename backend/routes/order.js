import { Router } from "express";
import authenticateToken from "./userAuth.js";
import { Order } from "../models/order.js";
import { Book } from "../models/book.js";
import { User } from "../models/user.js";

const router = Router();

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    console.log(order);
    for (const orderData of order) {
      const neworder = new Order({ user: id, book: orderData._id });
      // console.log(neworder);
      const orderdataDb = await neworder.save();
      // console.log(orderdataDb);
      // save order usermodel
      await User.findByIdAndUpdate(id, { $push: { orders: orderdataDb._id } });
      //cleaning cart
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
      //update book quantity
      await Book.findByIdAndUpdate(orderData._id, { $inc: { quantity: -1 } });
      // console.log(order._id);
    }
    return res.status(200).json({ message: "Order Placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

//get order history of particular user

router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderdata = userdata.orders.reverse();
    return res.status(200).json({ data: orderdata, status: "suucess" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

//get all order admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: userData, status: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update order admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

router.delete("/delete-order/:orderid", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { orderid } = req.params;
    const isAdmin = await User.findById(id);
    if (isAdmin.role != "admin") {
      res
        .status(400)
        .json({ message: "You are not having to access to perfome admin" });
    }
    await Order.findByIdAndDelete(orderid);
    return res.status(200).json({ message: "Ordered deleted Successfully" });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: "An Error occured" });
  }
});

//delete contact

// quantity: orderData.quantity,
// address: orderData.address,
// pincode: orderData.pincode,
// state: orderData.state,
