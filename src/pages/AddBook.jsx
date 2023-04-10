import axios from "axios";
import React, { useState } from "react";

const AddBook = () => {
  const [format, setFormat] = useState("application/json");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    date: "",
    genres: "",
    characters: "",
    synopsis: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    postBook();
  };

  const changeFormat = (event) => {
    setFormat(event.target.value);
  };

  const postBook = async () => {
    try {
      await axios.post(
        "http://localhost:8081/book-api/book-api",
        {
          books: [newBook],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <div className="flex flex-col align-middle mx-20 mb-5 mt-2">
      <h1 className="text-4xl my-2 text-white">Add a new book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 flex flex-row gap-3 items-center">
          <label
            htmlFor="title"
            className="block mb-0 text-large text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter a title..."
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
        </div>
        <div className="mb-3 flex flex-row gap-3 items-center">
          <label
            htmlFor="author"
            className="block mb-0 text-large text-gray-900 dark:text-white"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter an author's name..."
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
        </div>
        <div className="mb-3 flex flex-row gap-3 items-center">
          <label
            htmlFor="date"
            className="block mb-0 text-large text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={newBook.date}
            onChange={(e) => setNewBook({ ...newBook, date: e.target.value })}
          />
        </div>

        <div className="mb-3 flex flex-row gap-3 items-center">
          <label
            htmlFor="characters"
            className="block mb-0 text-large text-gray-900 dark:text-white"
          >
            Characters
          </label>
          <input
            type="text"
            id="characters"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter any characters' names..."
            value={newBook.characters}
            onChange={(e) =>
              setNewBook({ ...newBook, characters: e.target.value })
            }
          />
        </div>
        <div className="mb-3 flex flex-row gap-3 items-center">
          <label
            htmlFor="genres"
            className="block mb-0 text-large text-gray-900 dark:text-white"
          >
            Genres
          </label>
          <input
            type="text"
            id="genres"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter one or multiple genres..."
            value={newBook.genres}
            onChange={(e) => setNewBook({ ...newBook, genres: e.target.value })}
          />
        </div>
        <div className="mb-3 flex flex-row gap-3 items-center">
          <label
            htmlFor="synopsis"
            className="block mb-0 text-large text-gray-900 dark:text-white"
          >
            Synopsis
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter the synopsis..."
            value={newBook.synopsis}
            onChange={(e) =>
              setNewBook({ ...newBook, synopsis: e.target.value })
            }
          ></textarea>
        </div>
        <label className="text-white" htmlFor="format-dropdown">
          Format:{" "}
        </label>
        <select
          className="mr-4"
          id="format-dropdown"
          value={format}
          onChange={(event) => changeFormat(event)}
        >
          <option>application/json</option>
          <option>application/xml</option>
        </select>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
