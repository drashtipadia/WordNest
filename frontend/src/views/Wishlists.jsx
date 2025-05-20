import axios from "axios";
import { useEffect, useState } from "react";
import { BookCard } from "../components";
import { BASE_URL } from "../utils/config";

export const Wishlists = () => {
  const [wishlistbook, setWishlistbook] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/get-wishlist-books`, {
        headers,
      });
      //console.log(response);
      setWishlistbook(response.data.data);
    };
    fetch();
  }, [wishlistbook]);
  return (
    <div className="grid gap-4 ">
      {wishlistbook && wishlistbook.length === 0 && (
        <div className="text-white justify-center items-center">
          {" "}
          Wishlist Empty
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 grid-cols-4 gap-4">
        {wishlistbook &&
          wishlistbook.map((items, i) => (
            <>
              <div key={i} className="">
                <BookCard data={items} wishlist={true} cart={true} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};
