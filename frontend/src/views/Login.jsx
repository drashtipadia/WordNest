import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/config.js";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/sign-in`, user)
      .then((result) => {
        //console.log(result);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(result.data.role));
        localStorage.setItem("id", result.data.id);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.role);
        navigate("/");
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <>
      <div className="h-screen bg-zinc-900 flex py-2.5 items-center justify-center font-sans ">
        <div className=" bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-zinc-200 text-4xl text-center">Login</p>

          <form
            className=" mb-4 text-zinc-50 pt-1 px-8"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold " htmlFor="email">
                E-mail
              </label>
              <input
                className="shadow-sm w-full bg-zinc-900 cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                id="email"
                type="email"
                name="email"
                placeholder="email"
                value={user.email}
                onChange={handleInput}
                required
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
                id="password"
                type="password"
                name="password"
                placeholder="******"
                value={user.password}
                onChange={handleInput}
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
                type="submit"
              >
                LOGIN
              </button>
            </div>
          </form>
          <p className="flex mt-4 items-center text-white justify-center">or</p>
          <p className="flex mt-4 items-center text-white justify-center">
            Don't have an account? &nbsp;
            <Link to={"/signup"} className="hover:text-blue-400">
              {" "}
              <u>Sign Up</u>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
