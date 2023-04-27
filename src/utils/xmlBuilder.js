const xmlBuilder = (newBook) => {
  const xmlbuilder = require("xmlbuilder");
  return xmlbuilder
    .create("bookList")
    .ele("book")
    .ele("title", newBook.title)
    .up()
    .ele("author", newBook.author)
    .up()
    .ele("date", newBook.date)
    .up()
    .ele("genres", newBook.genres)
    .up()
    .ele("characters", newBook.characters)
    .up()
    .ele("synopsis", newBook.synopsis)
    .up()
    .end({ pretty: true });
};

export default xmlBuilder;
