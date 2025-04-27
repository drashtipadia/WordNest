import React from "react";

const Button = ({ head, total }) => {
  return (
    <>
      {" "}
      <div className={`bg-zinc-800 rounded p-4 flex flex-col`}>
        <h2 className="mt-4 text-xl text-white  font-semibold">{head}</h2>
        <p className="mt-2 text-zinc-100  text-3xl font-bold">{total}</p>
      </div>
    </>
  );
};

export default Button;
