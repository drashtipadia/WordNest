import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MobileProfile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {isLoggedIn === true && role === "user" && (
        <div className="w-full flex md:hidden items-center justify-between mt-4">
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
        <div className="w-full flex md:hidden items-center justify-between mt-4">
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
            to=""
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Users
          </Link>
          <Link
            to=""
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Contact
          </Link>
        </div>
      )}
    </>
  );
};
