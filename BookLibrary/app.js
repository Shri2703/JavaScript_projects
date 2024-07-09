document.addEventListener('DOMContentLoaded', () => {
    // Initialize book list and borrowing history from local storage
    let bookList = JSON.parse(localStorage.getItem('bookList')) || [
      { title: "Clean Code: A Handbook of Agile Software Craftsmanship", author: "Robert C. Martin", category: "Software Development" },
      { title: "You Don't Know JS", author: "Kyle Simpson", category: "JavaScript/Web Development" },
      { title: "Full-Stack React Projects", author: "Shama Hoque", category: "Full-Stack Development" },
      { title: "Mastering Blockchain", author: "Imran Bashir", category: "Blockchain" },
      { title: "Data Science from Scratch: First Principles with Python", author: "Joel Grus", category: "Data Science" },
      { title: "Artificial Intelligence: A Guide for Thinking Humans", author: "Melanie Mitchell", category: "Artificial Intelligence" },
      { title: "Robotics: Modelling, Planning and Control", author: "Bruno Siciliano, Lorenzo Sciavicco, Luigi Villani, and Giuseppe Oriolo", category: "Robotics" },
      { title: "Eloquent JavaScript: A Modern Introduction to Programming", author: "Marijn Haverbeke", category: "JavaScript/Web Development" },
      { title: "Learning React: Modern Patterns for Developing React Apps", author: "Alex Banks and Eve Porcello", category: "React/Web Development" },
      { title: "Blockchain Basics: A Non-Technical Introduction in 25 Steps", author: "Daniel Drescher", category: "Blockchain" }
    ];
    let borrowHistory = JSON.parse(localStorage.getItem('borrowHistory')) || [];
  
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const addBookForm = document.getElementById('add-book-form');
    const bookListEl = document.getElementById('book-list');
    const borrowHistoryEl = document.getElementById('borrow-history');
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const formSection = document.querySelector('.form-section');
  
    // Function to save data to local storage
    function saveToLocalStorage() {
      localStorage.setItem('bookList', JSON.stringify(bookList));
      localStorage.setItem('borrowHistory', JSON.stringify(borrowHistory));
    }
  
    // Function to render books
    function renderBooks() {
      bookListEl.innerHTML = '';
      bookList.forEach(book => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${book.title} by ${book.author} (${book.category})`;
        bookListEl.appendChild(li);
      });
    }
  
    // Function to render borrowing history
    function renderBorrowHistory() {
      borrowHistoryEl.innerHTML = '';
      borrowHistory.forEach(record => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${record.book.title} borrowed on ${record.date}`;
        borrowHistoryEl.appendChild(li);
      });
    }
  
    // Handle book search
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.toLowerCase();
      searchResults.innerHTML = '';
      const results = bookList.filter(book =>
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
      );
      results.forEach(book => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${book.title} by ${book.author}`;
        searchResults.appendChild(li);
      });
    });
  
    // Handle adding new book
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const category = document.getElementById('category').value;
      const newBook = { title, author, category };
      bookList.push(newBook);
      saveToLocalStorage();
      renderBooks();
      addBookForm.reset();
      formSection.style.display = 'none';
      toggleFormBtn.textContent = 'Show Form';
    });
  
    // Handle form toggle
    toggleFormBtn.addEventListener('click', () => {
      if (formSection.style.display === 'none') {
        formSection.style.display = 'block';
        toggleFormBtn.textContent = 'Hide Form';
      } else {
        formSection.style.display = 'none';
        toggleFormBtn.textContent = 'Show Form';
      }
    });
  
    // Initial render
    renderBooks();
    renderBorrowHistory();
  });
  