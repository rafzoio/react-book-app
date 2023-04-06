import axios from "axios";
import React, { useState } from "react";
import BookTable from "../components/BookTable";

const Search = () => {
  const [bookList, setBookList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchBooks = async (searchValue) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/book-api/book-api?title=" + searchValue,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setBookList(response.data.books);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    setShowList(false);
    fetchBooks(searchValue);
    setShowList(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative my-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10
          text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
          focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
          dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchValue}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleClick()}
          >
            Search
          </button>
        </div>
      </form>
      {showList && <BookTable books={bookList} />}
    </div>
  );
};

export default Search;
