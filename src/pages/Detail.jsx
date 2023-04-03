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
        const response = await axios.get(
          "http://localhost:8081/book-api/book-api?id=" + id,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setBook(response.data.books.book);
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
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.date}</p>
      <p>{book.description}</p>
      <button>Update</button>
      <button>Delete</button>
    </div>
  );
};

export default Detail;
