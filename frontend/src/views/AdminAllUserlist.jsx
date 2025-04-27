import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export default function AdminAllUserlist() {
  const [allUsers, setAllUsers] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${BASE_URL}/get-userlist`, { headers })
        .then((res) => {
          setAllUsers(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [allUsers]);

  return (
    <>
      {!allUsers && (
        <div className="flex items-center justify-center h-[100%]">
          <Loading />
        </div>
      )}

      {allUsers && allUsers.length > 0 && (
        <div className="h-screen p-0 md:p-4 text-zinc-100 ">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All UserList
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded font-bold py-2 px-4 flex gap-2">
            <div className="w-[5%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[15%]">
              <h1 className="">UserName</h1>
            </div>
            <div className="w-[25%]">
              <h1 className="">Email</h1>
            </div>
            <div className="w-[25%]">
              <h1 className="">Number</h1>
            </div>
            <div className="w-[25%]">
              <h1 className="">Address</h1>
            </div>
          </div>
          {allUsers.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-700 hover:cursor-pointer transition-all duration-100">
              <div className="w-[5%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className=" w-[15%] ">
                <h1> {items.username}</h1>
              </div>
              <div className="w-[25%]">
                <h1 className="">{items.email}</h1>
              </div>
              <div className="w-[25%]">
                <h1 className="">{items.number}</h1>
              </div>
              <div className="w-[25%]">
                <h1 className="">{items.address}</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
