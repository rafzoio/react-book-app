const bookToPlainText = (newBook) => {
  return (
    newBook.title +
    "#" +
    newBook.author +
    "#" +
    newBook.date +
    "#" +
    newBook.genres +
    "#" +
    newBook.characters +
    "#" +
    newBook.synopsis
  );
};

export default bookToPlainText;
