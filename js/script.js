document.addEventListener("DOMContentLoaded", () => {
  function loadBooks() {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const tbody = document.querySelector("#bookTable tbody");
    tbody.innerHTML = "";

    books.forEach(book => {
      const row = `
        <tr>
          <td>${book.id}</td>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.publisher}</td>
          <td>${book.year}</td>
          <td>${book.quantity}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  }

  document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("bookId").value.trim();
    const name = document.getElementById("bookName").value.trim();
    const author = document.getElementById("author").value.trim();
    const publisher = document.getElementById("publisher").value.trim();
    const year = document.getElementById("year").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!id || !name || !author || !publisher || quantity <= 0) {
      alert("Please fill all required fields correctly!");
      return;
    }

    const books = JSON.parse(localStorage.getItem("books")) || [];

    if (books.some(b => b.id === id)) {
      alert("Book ID already exists!");
      return;
    }

    books.push({ id, name, author, publisher, year, quantity });
    localStorage.setItem("books", JSON.stringify(books));

    alert("Book added successfully!");
    this.reset();
    loadBooks();
  });

  const addBtn = document.getElementById("addBookBtn");
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("bookId").focus();
  });

  loadBooks();
});
