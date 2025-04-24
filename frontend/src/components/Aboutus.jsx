import React from "react";

export default function Aboutus() {
  return (
    <div className="p-5">
      <h1 className="font-mono text-5xl text-center text-yellow-100">
        About us
      </h1>
      <div className="p-5 mt-4 text-xl text-zinc-300 lg:text-left">
        <p>
          {" "}
          Welcome to WordNest, your ultimate destination for all things books!
          Whether you're an avid reader, a casual book lover, or someone
          searching for the perfect gift, we are here to bring you closer to the
          stories, ideas, and knowledge that matter most.
        </p>
        <br />
        <p>
          Founded with a passion for literature and an obsession with quality,
          WordNest is dedicated to curating a diverse collection of books across
          every genre imaginable. From the latest bestsellers to timeless
          classics, from thought-provoking non-fiction to thrilling fiction, our
          selection is designed to cater to every taste, age group, and
          interest.
        </p>

        <h2 className="mt-6 mb-3 font-mono text-3xl text-start font-bold text-yellow-100">
          Our mission
        </h2>
        <p className="mt-4 text-xl text-zinc-300">
          Our Mission At WordNest, our mission is simple to make books
          accessible to everyone and to foster a love of reading. We believe
          that books have the power to change lives, spark new ideas, and
          provide a window to the world.
        </p>
        <br />
        <p>
          {" "}
          With a user-friendly online shopping experience, fast delivery, and
          personalized recommendations, we aim to make your book-buying journey
          as easy and enjoyable as possible.
        </p>
      </div>
    </div>
  );
}
