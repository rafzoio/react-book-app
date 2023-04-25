import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import DeleteIcon from "../resources/delete.svg";
import EditIcon from "../resources/edit.png";

const Detail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({
    title: "",
    author: "",
    date: "",
    genres: "",
    characters: "",
    synopsis: "",
  });

  const deleteBook = async (id) => {
    try {
      console.log("Hello");
      await axios.delete("http://localhost:8081/book-api/book-api?id=" + id, {
        headers: {
          Accept: "application/json",
        },
      });
      navigate("/books/" + (id - 1));
      toast.success("Book " + id + "deleted successfully!");
    } catch (error) {
      toast.error("Error deleting book" + id);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        navigate("/books");
        toast.error("Book not found");
      }
    };
    fetchBook();
  }, [id, navigate]);

  if (!book) {
    return <Spinner className="snap-center" />;
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-lg mt-5">
          <div className="px-6 py-4 flex flex-col justify-start">
            <div className="mb-2 flex flex-row justify-center items-center">
              <h1 className="font-bold text-6xl pr-5 ">{book.title}</h1>
              <Link to={`/update/${book.id}`}>
                <img className="w-10 pt-4" alt="Update" src={EditIcon} />
              </Link>
              <Link onClick={() => deleteBook(book.id)}>
                <img className="w-10 pt-4" alt="Delete" src={DeleteIcon} />
              </Link>
            </div>
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
              <span className="font-semibold">Characters:</span>{" "}
              {book.characters}
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
      )}
    </div>
  );
};

export default Detail;
