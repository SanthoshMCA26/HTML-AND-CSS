document.addEventListener("DOMContentLoaded", () => {

  // Load books from Local Storage and display in table
  function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const tbody = document.getElementById("bookTable");
    tbody.innerHTML = ""; //for prevent duplicate rows

    books.forEach(book => { //for every book create table
      const row = `
        <tr>
          <td>${book.id}</td>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.Category}</td>
          <td>${book.quantity}</td>
          <td>
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary me-2" onclick="editBook('${book.id}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteBooks('${book.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);// Adds the new row into the table body at the end.
    });
  }

  // Save book (Add or Update)
  document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("bookId").value.trim();
    const name = document.getElementById("bookName").value.trim();
    const author = document.getElementById("author").value.trim();
    const Category = document.getElementById("Category").value.trim();
    const year = document.getElementById("year").value.trim(); // stored but not displayed
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!id || !name || !author || !Category || quantity <= 0) {
      alert("Please fill all required fields correctly!");
      return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];

    // Update if ID exists, else add new
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      books[index] = { id, name, author, Category, year, quantity };
    } else {
      books.push({ id, name, author, Category, year, quantity });
    }

    localStorage.setItem("books", JSON.stringify(books));
    alert("Book saved successfully!");
    this.reset();
    loadBooks();
  });

  // Add Book button → focus on Book ID
  const addBtn = document.getElementById("addBookBtn");
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("bookId").focus();
  });

  // Delete function
  window.deleteBooks = function(id) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(b => b.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
    alert("confirn to Delete");
    loadBooks();
  };

  // Edit function (fills form only)
  window.editBook = function(id) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books.find(b => b.id === id);
    if (!book) return;

    document.getElementById("bookId").value = book.id;
    document.getElementById("bookName").value = book.name;
    document.getElementById("author").value = book.author;
    document.getElementById("Category").value = book.Category;
    document.getElementById("year").value = book.year;
    document.getElementById("quantity").value = book.quantity;
  };

  // Load books on page load
  loadBooks();
});
