const myLibrary = [];

const btn = document.getElementById("form-btn");
const bookContainer = document.querySelector(".book-container");

// Book object
function Book(bookName, author, pages, haveRead) {
  this.book = bookName;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}
// adds book obj to myLbrary array
function addBookToLibrary(bookName, author, pages, haveRead) {
  const newBook = new Book(bookName, author, pages, haveRead);
  myLibrary.push(newBook);
}
// creates a div box for holding book
function createBookBox(index) {
  const container = document.querySelector(".book-container");
  const bookBox = document.createElement("div");

  bookBox.classList.add("book-box");
  bookBox.setAttribute("index", index);
  container.appendChild(bookBox);
}
// add text from my aray to book box
function addContentToBookBox(obj, index) {
  const con = document.querySelector(`[index='${index}']`);
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    const content = document.createElement("div");
    const changeBtn = document.createElement("button");
    const removeBtn = document.createElement("button");
    switch (key) {
      case "book":
        content.innerText = `${obj.book}`;
        con.appendChild(content);
        break;
      case "author":
        content.innerText = `Author : ${obj.author}`;
        con.appendChild(content);
        break;
      case "pages":
        content.innerText = `Pages : ${obj.pages}`;
        con.appendChild(content);
        break;
      case "haveRead":
        if (obj.haveRead === "true") {
          content.innerText = "Status : Completed";
        } else {
          content.innerText = "Status : Reading";
        }
        // adding class , data attr , and text to change book status button
        changeBtn.classList.add("change-btn");
        changeBtn.setAttribute("chg-index", index);
        changeBtn.innerText = "Change Status";
        // adding class , data attr , and text to remove book button
        removeBtn.classList.add("remove-btn");
        removeBtn.setAttribute("rm-index", index);
        removeBtn.innerHTML = "Remove";
        con.appendChild(content);
        con.appendChild(changeBtn);
        con.appendChild(removeBtn);
        break;
      default:
        console.log("there is erorr in switch");
    }
  }
}
// remove all box
function cleanDisplay() {
  bookContainer.replaceChildren();
}
// adds event listner to all remove btn
function addEvenListner() {
  const rmBtn = document.querySelectorAll(".remove-btn");
  const chgbtn = document.querySelectorAll(".change-btn");

  chgbtn.forEach((e) => {
    e.addEventListener("click", () => {
      const i = e.getAttribute("chg-index");
      changeBookStatus(i);
    });
  });

  rmBtn.forEach((e) => {
    e.addEventListener("click", () => {
      const i = e.getAttribute("rm-index");
      // eslint-disable-next-line no-use-before-define
      removeBook(i);
      // eslint-disable-next-line no-use-before-define
      addBookToDisplay(myLibrary);
    });
  });
}
// make div from myLibrary array for all obj inside
function addBookToDisplay(arrObj) {
  cleanDisplay();
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (let i = 0; i < arrObj.length; i += 1) {
    createBookBox(i);
    // addContentToBookBox(arrObj[i]);
    addContentToBookBox(arrObj[i], i);
  }
  addEvenListner();
}
// remove text from input field
function removeText() {
  document.getElementById("bookName").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
}
// link form data to newly created Book obj
function setDataToBook() {
  /* eslint prefer-const: ["error", {"ignoreReadBeforeAssign": true}] */
  const book = document.getElementById("bookName").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const haveread = document.getElementById("haveRead").value;
  
  if (book === '' || author === '' || pages === ''){
    alert('Please enter BOOK details')
    return
  }
  addBookToLibrary(book, author, pages, haveread);
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();
  removeText();
}
// eventlisner for add book button that add book in container
btn.addEventListener("click", () => {
  setDataToBook();
  addBookToDisplay(myLibrary);
  // console.log(document.getElementById('haveRead').value)
});
// remove book from array
function removeBook(index) {
  myLibrary.splice(index, 1);
}
// change book status using button 
function changeBookStatus(index) {
  if (myLibrary[index].haveRead === "true") {
    myLibrary[index].haveRead = "false";
  } else {
    myLibrary[index].haveRead = "true";
  }
  addBookToDisplay(myLibrary);
}
