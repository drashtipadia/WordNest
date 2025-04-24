import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/config";
export default function Signup() {
  const [newuser, setNewuser] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    number: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        newuser.username.trim() === "" ||
        newuser.password.trim() === "" ||
        newuser.email.trim() === "" ||
        newuser.address.trim() === "" ||
        newuser.number.trim() === ""
      ) {
        alert("All field is required");
      }
      await axios
        .post(`${BASE_URL}/sign-up`, newuser)
        .then((result) => alert(result.data.message), navigate("/login"))
        .catch((err) => alert(error.data.message));
    } catch (error) {}
  };
  return (
    <>
      <div className="h-auto bg-zinc-900 flex py-4 items-center justify-center font-sans">
        <div className=" bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-4xl text-center">Sign Up</p>

          <form
            className=" mb-4 text-zinc-50 pt-1 px-8"
            onSubmit={handleSubmit}
            action="#"
          >
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold "
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow-sm w-full bg-zinc-900 cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                name="username"
                id="username"
                type="text"
                placeholder="Username"
                required
                value={newuser.username}
                onChange={handleInput}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold " htmlFor="email">
                E-mail
              </label>
              <input
                className="shadow-sm w-full bg-zinc-900 cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                name="email"
                id="email"
                type="email"
                placeholder="email"
                required
                value={newuser.email}
                onChange={handleInput}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold" htmlFor="phone">
                Phone
              </label>
              <input
                className="shadow-sm w-full bg-zinc-900 cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                name="number"
                id="phone"
                type="phone"
                placeholder="Phone"
                required
                value={newuser.number}
                onChange={handleInput}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-sm w-full bg-zinc-900 cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                name="password"
                id="password"
                type="password"
                placeholder="******"
                required
                value={newuser.password}
                onChange={handleInput}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold" htmlFor="address">
                Address
              </label>
              <textarea
                className="shadow-sm w-full bg-zinc-900 cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                name="address"
                id="address"
                type="text"
                placeholder="Address"
                required
                value={newuser.address}
                onChange={handleInput}
              ></textarea>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
                type="submit"
              >
                Create account
              </button>
            </div>
          </form>
          <p className="flex mt-4 items-center text-white justify-center">or</p>
          <p className="flex mt-4 items-center text-white justify-center">
            Already have an account? &nbsp;
            <Link to={"/login"} className="hover:text-blue-400">
              {" "}
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
