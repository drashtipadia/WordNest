import express from "express";
import cors from "cors";
import { config } from "dotenv";
import "./db.js";
import book from "./routes/book.js";
import user from "./routes/user.js";
import wishlist from "./routes/wishlist.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";
import contact from "./routes/contact.js";

const app = express();
app.use(express.json());
app.use(cors());
config();

app.use("/images", express.static("images"));

app.get("/", function (req, res) {
  res.send({ checkHealth: "done" });
});

app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", wishlist);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", contact);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at port ${process.env.PORT}`);
});
