import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
const BookList = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/book-api/book-api?id=1000",
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
    fetchBooks();
  }, []);

  if (bookList.length === 0) {
    return <Spinner />;
  }

  return (
    <div>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr
                key={book.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.id}
                </th>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.date}</td>
                <td className="px-6 py-4 flex flex-row items-stretch">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <Link to={`/books/${book.id}`}>Details</Link>
                  </button>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <Link to={`/update/${book.id}`}>Edit</Link>
                  </button>
                  <button className=" focus:outline-none dark:focus:ring-blue-800focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <Link to={`/delete/${book.id}`}>Delete</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
    </div>
  );
};

export default BookList;
