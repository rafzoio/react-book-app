import React from "react";
import { Link } from "react-router-dom";
import BookIcon from "../resources/book.svg";

const Home = () => {
  return (
    <div className="flex flex-col align-middle items-center">
      <img src={BookIcon} className="h-56 mt-10" alt="Logo" />
      <h1 className="text-7xl font-bold">LibReact</h1>
      <button className="mt-5 mx-96 w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-medium py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <Link to="/books">See the library...</Link>
      </button>
    </div>
  );
};

export default Home;
