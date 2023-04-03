import axios from "axios";
import React, { useEffect, useState } from "react";
import BookTable from "../components/BookTable";

const AllBooks = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/book-api/book-api",
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

  return (
    <div>
      <div className="relative overflow-x-auto">
        <BookTable books={bookList} />
      </div>
    </div>
  );
};

export default AllBooks;
