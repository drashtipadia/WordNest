import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BASE_URL, IMG_URL } from "../utils/config";

export const ViewBookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // console.log(isLoggedIn, role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/get-book/${id}`);
      // console.log(response);
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleWishlist = async () => {
    await axios
      .put(`${BASE_URL}/add-book-to-wishlist`, {}, { headers })
      .then((res) => alert(res.data.message))
      .catch((error) => console.log(error));
  };
  const handleCart = async () => {
    await axios
      .put(`${BASE_URL}/add-to-cart`, {}, { headers })
      .then((res) => alert(res.data.message))
      .catch((error) => console.log(error));
  };
  const handleDelete = async () => {
    await axios
      .delete(`${BASE_URL}/delete-book`, { headers })
      .then((res) => {
        alert(res.data.message);
        navigate("/all-books");
      })
      .catch((error) => alert(error.data.message));
  };
  return (
    <>
      {data && (
        <div className="px-8 md:px-12 py-8 dark:bg-zinc-900 flex flex-col md:flex-row ">
          <div className="p-4 w-full lg:w-3/6 bg-gray-200 dark:bg-zinc-800 rounded h-[45vh] lg:h-[80vh] flex  items-center justify-center ">
            <img
              src={`${IMG_URL}/${data.image}`}
              alt="/"
              className="h-[35vh] lg:h-[70vh] rounded"
            />
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl dark:text-zinc-300 font-semibold">
              {data.title}
            </h1>
            <p className="dark:text-zinc-400 mt-1"> by {data.author}</p>
            <p className="dark:text-zinc-500 mt-4 text-xl">{data.desc}</p>
            <p className="flex mt-4 items-center justify-start dark:text-zinc-400">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 dark:text-zinc-100 text-xl font-semibold">
              ISBN no. {data.ISBN}
            </p>
            <p className="mt-4 dark:text-zinc-100 text-3xl font-semibold">
              Price: ₹ {data.price}
            </p>
            {data.quantity === 0 && (
              <p className="mt-4 text-red-500 text-2xl font-semibold">
                Out Of Stock
              </p>
            )}
            {isLoggedIn === true && role === "user" && data.quantity > 0 && (
              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                <button
                  className="darh:bg-white lg:rounded-full text-2xl p-3 mt-0 flex items-center justify-center"
                  onClick={handleWishlist}
                >
                  <FaHeart /> <span className="ms-3"> Add Wishlist</span>
                </button>

                <button
                  className="dark:bg-white lg:rounded-full text-2xl p-3 mt-0 flex items-center justify-center"
                  onClick={handleCart}
                >
                  <FaCartShopping /> <span className="ms-3">Add to Cart</span>
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className="mt-4 ">
                <p className="dark:text-zinc-100 text-3xl font-semibold">
                  Quantity : {data.quantity}
                </p>
                <div className="flex flex-col lg:flex-row gap-4">
                  <Link
                    to={`/updatebook/${id}`}
                    className=" dark:text-white dark:bg-zinc-700 hover:bg-white hover:text-black lg:rounded-full text-3xl p-3 mt-4 flex items-center justify-center"
                  >
                    <FaEdit />
                    <span className="ms-3">Update</span>
                  </Link>
                  <button
                    className=" text-red-600 bg-white  lg:rounded-full text-3xl p-3 mt-4 flex items-center justify-center"
                    onClick={handleDelete}
                  >
                    <MdOutlineDeleteOutline />{" "}
                    <span className="ms-3">Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-700 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};
