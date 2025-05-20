import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Themetoggle } from "./Themetoggle";

export const Navbar = () => {
  const links = [
    { title: "Home", links: "/" },
    { title: "All Books", links: "/all-books" },
    { title: "Cart", links: "/cart" },
    { title: "Profile", links: "/profile" },
    { title: "Admin Profile", links: "/profile" },
  ];
  const [mobileNav, setMobileNav] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  //console.log(isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2);
  }
  return (
    <>
      <nav className="relative bg-gray-300 flex z-50 dark:bg-zinc-800 dark:text-white px-8 py-4 items-center justify-between ">
        <div>
          <Link
            to={"/"}
            className="text-5xl font-[Dancing-Script] font-semibold "
          >
            WordNest
          </Link>
        </div>
        <div className="flex-auto justify-end items-end px-5 hidden md:flex p-2 ">
          <Themetoggle />{" "}
        </div>
        <div className="nav-links-bookstore  flex items-center gap-4 ">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center justify-center" key={i}>
                {items.title === "Profile" ||
                items.title === "Admin Profile" ? (
                  <Link
                    to={items.links}
                    className="px-4 py-1 border rounded border-blue-600 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    // key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.links}
                    className="hover:text-blue-500 transition-all duration-300"
                    // key={i}
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex gap-4">
            {isLoggedIn === false && (
              <>
                <Link
                  to={"/login"}
                  role="button"
                  className="px-4 py-1 border rounded border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to={"/signup"}
                  role="button"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-200"
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <HiOutlineBars3 />
          </button>
        </div>
      </nav>

      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.links}
            className={`${mobileNav} text-white text-3xl mb-4 font-semibold hover:text-blue-500 transition-all duration-300`}
            key={i}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to={"/login"}
              role="button"
              className="px-4 py-1 mb-4 text-white border rounded border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              LogIn
            </Link>
            <Link
              to={"/signup"}
              role="button"
              className="px-4 py-1 bg-blue-500 rounded hover:bg-white text-zinc-800 transition-all duration-300"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};
