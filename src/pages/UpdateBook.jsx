import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import xmlBuilder from "../utils/xmlBuilder";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const format = useSelector((state) => state.format.currentFormat);
  const [existingBook, setExistingBook] = useState({
    id: id,
    title: "",
    author: "",
    date: "",
    genres: "",
    characters: "",
    synopsis: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/book-api/book-api",
          {
            params: {
              id: id,
            },
            headers: {
              Accept: "application/json",
            },
          }
        );
        setExistingBook(response.data.books[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBookXml = xmlBuilder(existingBook);

    const postData =
      format === "application/xml" ? newBookXml : { books: [existingBook] };

    try {
      const response = await axios.put(
        "http://localhost:8081/book-api/book-api",
        postData,
        {
          headers: {
            "Content-Type": format,
            Accept: "application/json",
          },
        }
      );

      console.log(response.data);
      navigate("/books/" + existingBook.id);
      toast.success("Book " + existingBook.id + " updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book " + existingBook.id);
    }
  };

  return (
    <div className="flex flex-col align-middle mx-20 mb-5 mt-2">
      <h1 className="text-4xl font-extrabold my-2 p-4 text-white">
        Updating book: {existingBook.title}
      </h1>
      <form className="p-4" onSubmit={handleSubmit}>
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
            value={existingBook.title}
            onChange={(e) =>
              setExistingBook({ ...existingBook, title: e.target.value })
            }
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
            value={existingBook.author}
            onChange={(e) =>
              setExistingBook({ ...existingBook, author: e.target.value })
            }
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
            value={existingBook.date}
            onChange={(e) =>
              setExistingBook({ ...existingBook, date: e.target.value })
            }
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
            value={existingBook.characters}
            onChange={(e) =>
              setExistingBook({ ...existingBook, characters: e.target.value })
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
            value={existingBook.genres}
            onChange={(e) =>
              setExistingBook({ ...existingBook, genres: e.target.value })
            }
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
            value={existingBook.synopsis}
            onChange={(e) =>
              setExistingBook({ ...existingBook, synopsis: e.target.value })
            }
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;