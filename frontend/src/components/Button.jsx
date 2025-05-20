export const Button = ({ head, total }) => {
  return (
    <>
      {" "}
      <div className={`bg-gray-200 dark:bg-zinc-800 rounded p-4 flex flex-col`}>
        <h2 className="mt-4 text-xl dark:text-white  font-semibold">{head}</h2>
        <p className="mt-2 dark:text-zinc-100  text-3xl font-bold">{total}</p>
      </div>
    </>
  );
};
