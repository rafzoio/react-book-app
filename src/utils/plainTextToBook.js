const plainTextToBook = (plainTextString) => {
  let books = plainTextString.split("\n");

  let bookList = [];

  for (let book of books) {
    let params = book.split("#");

    bookList.push({
      id: params[0],
      title: params[1],
      author: params[2],
      date: params[3],
      genres: params[4],
      characters: params[5],
      synopsis: params[6],
    });
  }
  return bookList;
};

export default plainTextToBook;
