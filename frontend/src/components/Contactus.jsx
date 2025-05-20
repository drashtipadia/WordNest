import axios from "axios";
import  { useState } from "react";
import { BASE_URL } from "../utils/config";

export const Contactus = () => {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const handleInput = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/usercontact`, contact)
      .then((result) => {
        alert(result.data.message);
        setContact({ name: "", email: "", message: "" });
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <div className=" dark:bg-zinc-900 flex py-2.5 items-center justify-center font-sans ">
      <div className="bg-gray-200 dark:bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-4/6">
        <p className="dark:text-yellow-100 text-4xl text-center">Conatct Us</p>
        <form
          className=" mb-4 dark:text-zinc-50 pt-4 px-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold " htmlFor="email">
              Full Name
            </label>
            <input
              className="shadow-sm w-full dark:bg-zinc-900 cursor-text appearance-none rounded border dark:border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={contact.name}
              onChange={handleInput}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold " htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow-sm w-full dark:bg-zinc-900 cursor-text appearance-none rounded border dark:border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={contact.email}
              onChange={handleInput}
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow-sm w-full dark:bg-zinc-900 cursor-text appearance-none rounded border dark:border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="message"
              type="text"
              rows={5}
              name="message"
              placeholder="Your Message/query write here..."
              value={contact.message}
              onChange={handleInput}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
