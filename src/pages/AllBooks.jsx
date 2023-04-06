import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookTable from "../components/BookTable";

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [pageLength, setPageLength] = useState(20);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/book-api/book-api?page=${page}&pageSize=${pageLength}`,
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
  }, [page, pageLength]);

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
    <div className="mt-4">
      <div className="relative flex flex-row justify-between gap-2 p-2 px-4 bg-gray-800 rounded-t-lg right-auto">
        <div className="flex flex-row gap-3">
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
        <div className="relative ml-10 text-white flex flex-row gap-3">
          <p>Page Length:</p>
          <Link onClick={() => setPageLength(10)}>10</Link>
          <Link onClick={() => setPageLength(20)}>20</Link>
          <Link onClick={() => setPageLength(50)}>50</Link>
          <Link onClick={() => setPageLength(100)}>100</Link>
        </div>
      </div>
      <div className="pt-0">
        <BookTable books={bookList} />
      </div>
    </div>
  );
};

export default AllBooks;
