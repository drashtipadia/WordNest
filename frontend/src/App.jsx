import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import AllBooks from "./views/AllBooks";
import Cart from "./views/Cart";
import Profile from "./views/Profile";
import Wishlists from "./views/Wishlists";
import ViewBookDetail from "./views/ViewBookDetail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import UserOrder from "./views/UserOrder";
import ProfileDetails from "./views/ProfileDetails";
import { AdminAllOrders } from "./views/AdminAllOrders";
import { AddBook } from "./views/AddBook";
import { UpdateBook } from "./views/UpdateBook";
import AdminAllContact from "./views/AdminAllContact";
import AdminAllUserlist from "./views/AdminAllUserlist";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <>
              <Route path="/profile/wishlist" element={<Wishlists />} />
              <Route path="/profile/order" element={<UserOrder />} />
              
            </>
          ) : (
            <>
              <Route path="/profile/adminadd-book" element={<AddBook />} />
              <Route
                path="/profile/admin-allorder"
                element={<AdminAllOrders />}
              />
              <Route
                path="/profile/admin-contact"
                element={<AdminAllContact />}
              />
              <Route
                path="/profile/admin-userlist"
                element={<AdminAllUserlist />}
              />
            </>
          )}
          <Route index path="/profile/details" element={<ProfileDetails />} />
        </Route>
        <Route path="/book-details/:id" element={<ViewBookDetail />} />
        <Route path="/updatebook/:id" element={<UpdateBook />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
