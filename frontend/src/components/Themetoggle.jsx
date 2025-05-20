import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

export const Themetoggle = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPefersDark = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPefersDark) {
      setTheme("dark");
    }
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="top-6 right-6 p-2 rounded-full bg-gray-400 dark:bg-gray-700  dark:hover:bg-gray-600 transition-colors"
    >
      {theme === "dark" ? (
        <BsSunFill className="ml-auto text-yellow-400" size={17} />
      ) : (
        <FaMoon className="hover:text-white" size={17} />
      )}
    </button>
  );
};
