import React from "react";
import Hero from "../components/Hero";
import { RecentlyAdded } from "../components/RecentlyAdded";
import Aboutus from "../components/Aboutus";
import Contactus from "../components/Contactus";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-zinc-900 dark:text-white px-10 py-8">
      <Hero />
      <RecentlyAdded />
      <Aboutus />
      {role !== "admin" && <Contactus />}
    </div>
  );
}
