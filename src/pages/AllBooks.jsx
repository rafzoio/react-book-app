import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BookTable from "../components/BookTable";

const AllBooks = () => {
  const page = useSelector((state) => state.page.currentPage);
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const fetchBooks = debounce(async () => {
      try {
        console.log(page);
        const response = await axios.get(
          `http://localhost:8081/book-api/book-api?page=${page}&pageSize=${pageLength}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setBookList(response.data.books);
        setNumPages(response.headers["x-total-pages"]);
      } catch (error) {
        console.error(error);
      }
    }, 100);
    fetchBooks();
  }, [page, pageLength]);

  const handlePageChange = (newPage) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
  };

  const displayOptions = () => {
    const options = [];
    for (let i = 1; i <= numPages; i++) {
      options.push(<option key={i}>{i}</option>);
    }
    return options;
  };

  const handleDelete = (id) => {
    setBookList(bookList.filter((b) => b.id !== id));
    if (bookList.length === 0) {
      handlePageChange(page - 1);
    }
  };

  return (
    <div className="mt-4">
      <div className="relative flex flex-row justify-between gap-2 p-2 px-4 bg-gray-800 rounded-t-lg right-auto">
        <div className="flex flex-row gap-3">
          <Link
            className="text-white hover:text-blue-600"
            onClick={() => {
              handlePageChange(1);
            }}
          >
            First
          </Link>
          <Link
            className="text-white hover:text-blue-600"
            onClick={() => {
              handlePageChange(page - 1);
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
              handlePageChange(page + 1);
            }}
          >
            Next
          </Link>
          <Link
            className="text-white hover:text-blue-600"
            onClick={() => {
              handlePageChange(numPages);
            }}
          >
            Last
          </Link>
        </div>
        <div className="relative ml-10 text-white flex flex-row gap-3">
          <p>Page Length:</p>
          <Link onClick={() => setPageLength(5)}>5</Link>
          <Link onClick={() => setPageLength(10)}>10</Link>
          <Link onClick={() => setPageLength(20)}>20</Link>
          <Link onClick={() => setPageLength(50)}>50</Link>
          <Link onClick={() => setPageLength(100)}>100</Link>
        </div>
      </div>
      <div className="pt-0">
        <BookTable books={bookList} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AllBooks;
