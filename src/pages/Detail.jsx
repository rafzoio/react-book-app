import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const Detail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("Hello");
        const response = await axios.get(
          "http://localhost:8081/book-api/book-api?id=" + id,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setBook(response.data.books[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <Spinner className="snap-center" />;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-3 m-10">
        <div className="px-6 py-4">
          <div className="font-bold text-6xl mb-2">{book.title}</div>
          <p className="text-gray-700 text-2xl">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">ID:</span> {book.id}
          </p>
          <p className="text-gray-700 text-base mb-2">
            <span className="font-semibold">Date:</span> {book.date}
          </p>
          <p className="text-gray-700 text-base mb-2">
            <span className="font-semibold">Characters:</span> {book.characters}
          </p>
          <div className="my-4">
            <p className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Genres:</span> {book.genres}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-semibold">Synopsis:</span> {book.synopsis}
            </p>
          </div>
        </div>
      </div>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

export default Detail;
