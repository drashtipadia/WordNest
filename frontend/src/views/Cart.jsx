import { useEffect, useState } from "react";
import { Loading } from "../components";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../utils/config";

export const Cart = () => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${BASE_URL}/get-user-cart`, { headers })
        .then((res) => setCart(res.data.data))
        .catch((error) => console.log(error));
    };
    fetch();
  }, [cart]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const deleteItem = async (bookid) => {
    await axios
      .put(`${BASE_URL}/remove-from-cart/${bookid}`, {}, { headers })
      .then((result) => alert(result.data.message))
      .catch((error) => console.log(error));
  };

  const placeOrder = async (e) => {
    //console.log(cart);
    if (confirm("Confirm For Your Order")) {
      await axios
        .post(`${BASE_URL}/place-order`, { order: cart }, { headers })
        .then((res) => alert(res.data.message))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-auto py-8">
      {!cart && <Loading />}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-4xl lg:text-5xl font-semibold text-zinc-400">
              Empty cart
            </h1>
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-xl font-semibold text-zinc-500 mb-8">
            {" "}
            Your Cart
          </h1>
          {cart.map((items, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={`${IMG_URL}/${items.image}`}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {items.desc.slice(0, 80)}...
                </p>
                {/* <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:block">
                  {items.desc.slice(0, 55)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 md:hidden block">
                  {items.desc.slice(0, 80)}...
                </p> */}
              </div>
              {/* <div className="flex mt-4 w-full md:w-auto text-white items-center justify-between">
                <button className="ms-3">-</button>
                <p className="text-normal m-2">{items.quantity}</p>
                <button className="ms-3">+</button>
              </div> */}
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  {" "}
                  ₹ {items.price}{" "}
                </h2>

                <button
                  className="bg-red-100 text-red-700 border border-red-700  rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} books</h2>
              <h2>₹{total} </h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2  flex justify-center w-full font-semibold hover:bg-zinc-200"
                onClick={placeOrder}
              >
                Place your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
