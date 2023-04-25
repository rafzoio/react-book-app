import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import DeleteIcon from "../resources/delete.svg";
import EditIcon from "../resources/edit.png";
import InfoIcon from "../resources/info.png";

const BookTable = ({ books, onDelete }) => {
  const deleteBook = async (book) => {
    try {
      await axios.delete("http://localhost:8081/book-api/book-api", {
        params: {
          id: book.id,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      toast.success("Book " + book.id + " deleted successfully");
      onDelete(book.id);
    } catch (error) {
      toast.promise(Promise.reject(), {
        pending: "Deleting book...",
        success: "Book deleted successfully!",
        error: "Failed to delete book.",
      });
    }
  };

  return (
    <div>
      <table className="w-full text-sm text-left rounded-lg text-gray-500 dark:text-gray-400">
        <thead className="text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
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
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-5 gap-3 flex flex-row justify-evenly">
                <Link to={`/books/${book.id}`}>
                  <img className="w-7 py-auto" alt="Details" src={InfoIcon} />
                </Link>
                <Link to={`/update/${book.id}`}>
                  <img className="w-7 py-auto" alt="Update" src={EditIcon} />
                </Link>

                <Link onClick={() => deleteBook(book)}>
                  <img className="w-7 py-auto" alt="Delete" src={DeleteIcon} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
