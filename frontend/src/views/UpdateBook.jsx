import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../utils/config";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateBook = () => {
  const { id } = useParams();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
    bookid: id,
  };
  const [book, setBook] = useState({
    image: null,
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    quantity: "",
    ISBN: "",
  });
  const [displayimg, setDisplayimg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/get-book/${id}`);
      // console.log(response);
      setBook(response.data.data);
      setDisplayimg(`${IMG_URL}/${response.data.data.image}`);
    };
    fetch();
  }, []);

  const handleInput = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (e) => {
    setBook({ ...book, [e.target.name]: e.target.files[0] });
    setDisplayimg(URL.createObjectURL(e.target.files[0]));
  };

  let formdata = new FormData();
  const handleSubmit = async (e) => {
    formdata.append("image", book.image);
    formdata.append("title", book.title);
    formdata.append("author", book.author);
    formdata.append("price", book.price);
    formdata.append("desc", book.desc);
    formdata.append("language", book.language);
    formdata.append("quantity", book.quantity);
    formdata.append("ISBN", book.ISBN);

    e.preventDefault();
    //console.log(book);
    await axios
      .put(`${BASE_URL}/update-book`, formdata, { headers })
      .then((result) => {
        alert(result.data.message);
        navigate(`/book-details/${id}`);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div>
            <label className="text-zinc-400">Image</label>
            <div className="flex gap-4">
              <input
                type="file"
                className="w-2/6 mt-2 bg-zinc-900 text-zinc-100 p-2 "
                name="image"
                // required
                onChange={handleFileUpload}
              />
              <img
                src={`${displayimg}`}
                alt="/"
                className="h-[15vh]  rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Title of Book</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="title"
              placeholder="Title of the Book"
              required
              value={book.title}
              onChange={handleInput}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label className="text-zinc-400">Author of Book</label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="author"
                placeholder="Author of Book"
                required
                value={book.author}
                onChange={handleInput}
              />
            </div>
            <div className="w-3/6">
              <label className="text-zinc-400">Language</label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="language"
                placeholder="Language of Book"
                required
                value={book.language}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label className="text-zinc-400">Price</label>
              <input
                type="number"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="price"
                placeholder="Price of Book"
                required
                value={book.price}
                onChange={handleInput}
              />
            </div>
            <div className="w-3/6">
              <label className="text-zinc-400">Quantity</label>
              <input
                type="number"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                name="quantity"
                placeholder="Quantity of Book"
                required
                value={book.quantity}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">ISBN Number</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="ISBN"
              placeholder="Enter the ISBN Number"
              required
              value={book.ISBN}
              onChange={handleInput}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Description of Book</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows={5}
              name="desc"
              placeholder="Deacription of the Book"
              required
              value={book.desc}
              onChange={handleInput}
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-3 bg-blue-500 text-white  font-semibold py-2 rounded hover:bg-blue-600 transition-all"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
