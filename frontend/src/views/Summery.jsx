import { useState, useEffect } from "react";
import { Button } from "../components";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export const Summery = () => {
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [book, setBook] = useState();
  const [contact, setContact] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/totalorder`);
      setOrder(response.data.data);
    };
    fetch();
  }, [order]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/totalUser`);
      setUser(response.data.data);
    };
    fetch();
  }, [user]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/totalbooks`);
      setBook(response.data.data);
    };
    fetch();
  }, [book]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${BASE_URL}/totalcontact`);
      setContact(response.data.data);
    };
    fetch();
  }, [contact]);

  return (
    <div className="h-screen">
      <h1 className="text-center text-3xl">DashBoard </h1>
      <div className="p-8">
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
          <Button head="Total orders" total={order} />
          <Button head="Total Contact" total={contact} />
          <Button head="Total Book" total={book} />
          <Button head="Total user" total={user} />
        </div>
      </div>
    </div>
  );
};
