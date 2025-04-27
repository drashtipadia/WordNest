import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL, IMG_URL } from "../utils/config";
import { useSelector } from "react-redux";

const BookCard = ({ data, wishlist, cart, height }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveWishlist = async () => {
    const response = await axios.put(
      `${BASE_URL}/remove-book-to-wishlist`,
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    await axios
      .put(`${BASE_URL}/add-to-cart`, {}, { headers })
      .then((res) => {
        alert(res.data.message);
        axios.put(`${BASE_URL}/remove-book-to-wishlist`, {}, { headers });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={`bg-zinc-800 rounded p-4 flex flex-col ${height}`}>
      <Link to={`/book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img
              src={`${IMG_URL}/${data.image}`}
              alt="/"
              className="h-[25vh]"
            />
          </div>
          <h2 className="mt-4 text-xl text-white  font-semibold">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-100 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-100 font-semibold text-xl">
            ₹{data.price}
          </p>
          {isLoggedIn === true && role === "admin" && (
            <p className="text-red-500 mt-2 font-semibold">
              {data.quantity == 0 && "Out Of Stock"}
            </p>
          )}
        </div>
      </Link>

      {wishlist && (
        <button
          className=" px-4 py-2 rounded border border-red-500 text-red-500 mt-4 hover:bg-red-600 hover:text-white"
          onClick={handleRemoveWishlist}
        >
          Remove from wishlist
        </button>
      )}
      {cart && (
        <button
          className="px-4 py-2 rounded border border-blue-500  mt-4 hover:bg-blue-700 "
          onClick={handleCart}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default BookCard;
