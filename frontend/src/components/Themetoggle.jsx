import { useEffect, useState } from "react";
import React from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useDarkMode } from "../context/ThemeContext";

const Themetoggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-6 py-2 bg-gray-200  rounded-md transition-all"
    >
      {darkMode ? "Light mode" : "Darkmode"}
    </button>
    // <div
    //   className="relative w-16 h-8 flex items-center dark:bg-gray-700 bg-blue-500 cursor-pointer rounded-full p-2 m-1"
    //   onClick={() => setDarkMode(!darkMode)}
    // >
    //   {darkMode ? (
    //     <FaMoon className="text-white" size={17} />
    //   ) : (
    //     <>
    //       <div
    //         className="absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
    //         style={darkMode ? { left: "3px" } : { right: "3px" }}
    //       ></div>
    //       <BsSunFill className="ml-auto text-yellow-400" size={17} />{" "}
    //     </>
    //   )}
    // </div>
  );
};

export default Themetoggle;
