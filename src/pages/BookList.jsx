import axios from "axios";
import React, { useEffect, useState } from "react";

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
        setBookList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className="text-large">All Books</h1>
      {bookList.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
