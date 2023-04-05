import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookTable from "../components/BookTable";

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(75);
  const [pageSize, setPageSize] = useState(20);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/book-api/book-api?page=${page}&pageSize=${pageSize}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setBookList(response.data.books);
        setNumPages(response.headers["x-total-pages"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [page, pageSize]);

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.value));
  };

  const displayOptions = () => {
    const options = [];
    for (let i = 1; i <= numPages; i++) {
      options.push(<option key={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div>
      <div className="relative flex flex-row justify-center gap-2 p-3 mt-4 bg-gray-800 rounded-r-lg right-auto">
        <Link
          className="text-white hover:text-blue-600"
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </Link>
        <select
          className=""
          id="page-dropdown"
          value={page}
          onChange={handlePageChange}
        >
          {displayOptions()}
        </select>
        <Link
          className="text-white hover:text-blue-600"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <BookTable books={bookList} />
      </div>
    </div>
  );
};

export default AllBooks;
