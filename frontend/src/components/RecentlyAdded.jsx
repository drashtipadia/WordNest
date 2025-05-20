import axios from "axios";
import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import { Loading } from "./Loading";
import { BASE_URL } from "../utils/config";

export const RecentlyAdded = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/get-recent-books`);
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      <div className="mt-8 px-4">
        <h4 className="text-3xl dark:text-yellow-100">Recently added book</h4>
        {!data && (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        )}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          {data &&
            data.map((items, i) => (
              <div key={i}>
                <BookCard data={items} height={"h-[60vh]"} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
