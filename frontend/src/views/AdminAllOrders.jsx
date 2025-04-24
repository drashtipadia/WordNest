import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import Loading from "../components/Loading";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";
import { MdDelete } from "react-icons/md";

export const AdminAllOrders = () => {
  const [allOrder, setAllOrder] = useState();
  const [option, setOption] = useState(-1);
  const [statusValue, setStatusValue] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${BASE_URL}/get-all-orders`, { headers })
        .then((res) => {
          setAllOrder(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [allOrder]);
  //allOrder && allOrder.splice(allOrder.length - 1, 1);
  const chnageStatus = (e) => {
    const { value } = e.target;
    setStatusValue({ status: value });
  };
  const submitChanges = async (i) => {
    const id = allOrder[i]._id;
    await axios
      .put(`${BASE_URL}/update-status/${id}`, statusValue, { headers })
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err));
  };

  const deleteOrder = async (orderid) => {
    await axios
      .delete(`${BASE_URL}/delete-order/${orderid}`, { headers })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.data.message));
  };

  return (
    <>
      {!allOrder && (
        <div className="flex items-center justify-center h-[100%]">
          <Loading />
        </div>
      )}
      {allOrder && allOrder.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books </h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[12%]">
              <h1 className="">Order Date</h1>
            </div>

            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
            <div className="w-[8%]">
              <h1 className="">Action</h1>
            </div>
          </div>
          {allOrder.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-700 hover:cursor-pointer transition-all duration-100">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className=" w-[40%] md:w-[22%]">
                <Link
                  to={`/book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">{items.book.desc.slice(0, 30)}...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">₹ {items.book.price}</h1>
              </div>
              <div className="w-[17%] md:w-[12%]">
                <h1 className="">{items.createdAt.slice(0, 10)}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOption(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div className={`${option === i ? "flex" : "hidden"}`}>
                    <select
                      name="status"
                      id=""
                      className="bg-gray-800"
                      onChange={chnageStatus}
                      value={statusValue.status}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((items, i) => (
                        <option key={i} value={items}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOption(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-400"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
              <div className="w-[8%]">
                <button
                  className="text-2xl hover:text-red-500 text-center"
                  onClick={() => deleteOrder(items._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          userDivData={userDivData}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};
