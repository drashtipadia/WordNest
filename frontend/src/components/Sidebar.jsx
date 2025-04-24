import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

export const Sidebar = ({ data }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    history("/");
  };
  return (
    <div className="bg-zinc-800 md:p-4 rounded flex flex-col h-auto items-center justify-between lg:h-[100%]">
      <div className="flex flex-col items-center justify-center">
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>{" "}
      </div>
      {isLoggedIn === true && role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex">
          <Link
            to="/profile/wishlist"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Wishlist
          </Link>
          <Link
            to="/profile/order"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            {" "}
            My Orders
          </Link>
          <Link
            to="/profile/details"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            {" "}
            Details
          </Link>
        </div>
      )}
      {isLoggedIn === true && role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden md:flex">
          <Link
            to="/profile/adminadd-book"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
          <Link
            to="/profile/admin-allorder"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/admin-userlist"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Users
          </Link>
          <Link
            to="/profile/admin-contact"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Contacts
          </Link>
          <Link
            to="/profile/details"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            {" "}
            Details
          </Link>
        </div>
      )}

      <button
        className="bg-zinc-900 text-xl w-full mt-4 lg:mt-0 text-white font-semibold flex itmes-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900"
        onClick={handleLogout}
      >
        Logout <FaArrowRightFromBracket className="ms-4 mt-1" />
      </button>
    </div>
  );
};
