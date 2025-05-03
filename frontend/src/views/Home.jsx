import React from "react";
import { Link } from "react-router-dom";
import { RecentlyAdded } from "../components/RecentlyAdded";
import Contactus from "../components/Contactus";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="dark:bg-zinc-900 dark:text-white px-10 py-8">
      <div className="h-screen md:h-[75vh] flex flex-col md:flex-row justify-center items-center">
        <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center ">
          <h1 className="text-4xl lg:text-6xl font-semibold dark:text-yellow-100 text-center lg:text-left">
            Discover Your Next Great Read
          </h1>
          <p className="mt-4 text-xl dark:text-zinc-300 lg:text-left">
            Uncover captivating storirs, enriching knowledge, and endless
            inspiration in our curated collection of books{" "}
          </p>
          <div className="mt-8">
            <Link
              to={"/all-books"}
              className="dark:text-yellow-100 text-xl lg:text-2xl font-semibold border dark:border-yellow-100 px-10 py-3 hover:bg-zinc-800 hover:text-white rounded-full"
            >
              Discover Book
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center mt-8">
          <img src="./Hero.png" alt="hero" />
        </div>
      </div>
      <RecentlyAdded />
      <div className="p-5">
        <h1 className="font-mono text-5xl text-center dark:text-yellow-100">
          About us
        </h1>
        <div className="p-5 mt-4 text-xl dark:text-zinc-300 lg:text-left">
          <p>
            {" "}
            Welcome to WordNest, your ultimate destination for all things books!
            Whether you're an avid reader, a casual book lover, or someone
            searching for the perfect gift, we are here to bring you closer to
            the stories, ideas, and knowledge that matter most.
          </p>
          <br />
          <p>
            Founded with a passion for literature and an obsession with quality,
            WordNest is dedicated to curating a diverse collection of books
            across every genre imaginable. From the latest bestsellers to
            timeless classics, from thought-provoking non-fiction to thrilling
            fiction, our selection is designed to cater to every taste, age
            group, and interest.
          </p>

          <h2 className="mt-6 mb-3 font-mono text-3xl text-start font-bold dark:text-yellow-100">
            Our mission
          </h2>
          <p className="mt-4 text-xl dark:text-zinc-300">
            Our Mission At WordNest, our mission is simple to make books
            accessible to everyone and to foster a love of reading. We believe
            that books have the power to change lives, spark new ideas, and
            provide a window to the world.
          </p>
          <br />
          <p>
            {" "}
            With a user-friendly online shopping experience, fast delivery, and
            personalized recommendations, we aim to make your book-buying
            journey as easy and enjoyable as possible.
          </p>
        </div>
      </div>
      {role !== "admin" && <Contactus />}
    </div>
  );
}
