const myLibrary = [];

function Book(bookname, author, pages, haveRead) {
  this.book = bookname;
  this.author = author;
  this.pages = pages;
  this.haveRead = Boolean(haveRead);
}
