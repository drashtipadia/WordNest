import {
  Home,
  Login,
  Signup,
  AllBooks,
  Cart,
  Profile,
  Wishlists,
  ViewBookDetail,
  UserOrder,
  ProfileDetails,
  AdminAllContact,
  AdminAllOrders,
  AddBook,
  UpdateBook,
  AdminAllUserlist,
  Summery,
} from "./views";

import { Navbar, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";

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
              <Route index element={<Summery />} />
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
