import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import BookCard from "../components/BookCard";
import { BASE_URL } from "../utils/config";

export default function AllBooks() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/get-all-books`);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="dark:bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl dark:text-yellow-100">All books</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loading />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data &&
          data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} height={"h-[62vh]"} />
            </div>
          ))}
      </div>
    </div>
  );
}
