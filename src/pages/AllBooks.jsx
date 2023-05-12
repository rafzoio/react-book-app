import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BookTable from "../components/BookTable";
import Spinner from "../components/Spinner";

const AllBooks = () => {
  const page = useSelector((state) => state.page.currentPage);
  const dispatch = useDispatch();
  const [numPages, setNumPages] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:8081/book-api/book-api",
          {
            params: {
              page: page,
              pageLength: pageLength,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setBookList(response.data.books);
        setNumPages(response.headers["x-total-pages"]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
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

  const handlePageLengthChange = (event) => {
    setPageLength(event.target.dataset.value);
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  };

  return (
    <div className="mt-4">
      <div
        className={
          isLoading
            ? "relative flex flex-row justify-between gap-2 p-2 px-4 bg-gray-800 rounded-lg right-auto"
            : "relative flex flex-row justify-between gap-2 p-2 px-4 bg-gray-800 rounded-t-lg right-auto"
        }
      >
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
              if (page !== numPages) {
                handlePageChange(page + 1);
              }
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
          <Link data-value="5" onClick={(e) => handlePageLengthChange(e)}>
            5
          </Link>
          <Link data-value="10" onClick={(e) => handlePageLengthChange(e)}>
            10
          </Link>
          <Link data-value="20" onClick={(e) => handlePageLengthChange(e)}>
            20
          </Link>
          <Link data-value="50" onClick={(e) => handlePageLengthChange(e)}>
            50
          </Link>
          <Link data-value="100" onClick={(e) => handlePageLengthChange(e)}>
            100
          </Link>
        </div>
      </div>
      <div className="pt-0">
        {isLoading ? (
          <Spinner />
        ) : (
          <BookTable books={bookList} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default AllBooks;
