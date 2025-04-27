import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { MdDelete } from "react-icons/md";

export default function AdminAllContact() {
  const [allContact, setAllContact] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${BASE_URL}/allcontactlist`, { headers })
        .then((res) => {
          setAllContact(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, [allContact]);
  const deleteContact = async (contactid) => {
    await axios
      .delete(`${BASE_URL}/delete-contact/${contactid}`, { headers })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.data.message));
  };
  return (
    <>
      {!allContact && (
        <div className="flex items-center justify-center h-[100%]">
          <Loading />
        </div>
      )}

      {allContact && allContact.length > 0 && (
        <div className="h-screen p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Contact
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded font-bold py-2 px-4 flex gap-2">
            <div className="w-[5%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[15%]">
              <h1 className="">Name</h1>
            </div>
            <div className="w-[25%]">
              <h1 className="">Email</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Message</h1>
            </div>
            <div className="w-[10%]">
              <h1 className="">Action</h1>
            </div>
          </div>
          {allContact.map((items, i) => (
            <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-700 hover:cursor-pointer transition-all duration-100">
              <div className="w-[5%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className=" w-[15%] ">
                <h1> {items.name}</h1>
              </div>
              <div className="w-[25%]">
                <h1 className="">{items.email}</h1>
              </div>
              <div className="w-[45%]">
                <h1 className="">{items.message}</h1>
              </div>
              <div className="w-[10%]">
                <button
                  className="text-2xl hover:text-red-500 text-center"
                  onClick={() => deleteContact(items._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
