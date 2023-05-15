import React from "react";
import { Link } from "react-router-dom";
import BookIcon from "../resources/book.svg";

const About = () => {
  return (
    <div className="flex flex-col align-middle mx-auto w-full items-center">
      <img src={BookIcon} className="h-24 mt-10" alt="Logo" />
      <h2 className="font-bold text-white">Designed by Raphael Zoio</h2>
      <button className="mt-5 w-36 text-black focus:ring-4 focus:outline-none font-bold rounded-lg text-medium py-2.5 text-center bg-gray-200 hover:bg-gray-400">
        <Link
          to="https://github.com/rafzoio/react-book-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </button>
    </div>
  );
};

export default About;