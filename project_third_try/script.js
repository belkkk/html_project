// 📚 Каталог книг
const books = [
  {
    id: "master-i-margarita",
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967,
    genres: ["Роман", "Фантастика"],
    rating: 4.8,
    cover: "images/images.jpg",
    description: [
      "Жарким майским вечером председатель правления МАССОЛИТ Михаил Берлиоз...",
      "Александр Берлиоз и Иван Бездомный сочли собеседника сумасшедшим...",
      "Тем временем Воланд со свитой весьма необычным образом исследуют..."
    ],
    excerpt: [
      "«Рукописи не горят» — Воланд.",
      "«Что же ты, Иван, не веришь в дьявола?»",
      "«Каждому воздастся по вере его»."
    ],
    review: "Булгаков создал не просто роман, а философскую притчу о добре и зле.",
    link: "book.html?id=master-i-margarita"
  },
  {
    id: "prestuplenie-i-nakazanie",
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    year: 1866,
    genres: ["Роман", "Психология"],
    rating: 4.6,
    cover: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Crimeandpunishmentcover.png",
    description: [
      "История студента Раскольникова, совершившего убийство и переживающего нравственные муки."
    ],
    excerpt: [
      "«Тварь ли я дрожащая или право имею?»",
      "«Страдание — великая вещь»"
    ],
    review: "Глубокое психологическое исследование человеческой совести и морали.",
    link: "book.html?id=prestuplenie-i-nakazanie"
  },
  {
    id: "anna-karenina",
    title: "Анна Каренина",
    author: "Лев Толстой",
    year: 1877,
    genres: ["Роман", "Классика"],
    rating: 4.7,
    cover: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Anna_Karenina_book_cover.jpg",
    description: [
      "Трагическая история любви Анны Карениной и Вронского на фоне российской аристократии."
    ],
    excerpt: [
      "«Все счастливые семьи похожи друг на друга...»",
      "«Если ищешь совершенства — ты его не найдёшь»"
    ],
    review: "Один из величайших романов о любви, семье и обществе.",
    link: "book.html?id=anna-karenina"
  }
];

// 🔍 Получение ID из URL
function getBookIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// 🔎 Поиск книги по ID
function findBookById(id) {
  return books.find(book => book.id === id);
}

// 📘 Страница книги
function renderBookPage(book) {
  const container = document.getElementById("book-page");

  container.innerHTML = `
    <div class="left_container">
      <img src="${book.cover}" alt="${book.title}" class="book_cover" />
      <div class="excerpt">
        <h2>Цитаты из книги</h2>
        ${book.excerpt.map(line => `<p>${line}</p>`).join("")}
      </div>
    </div>

    <div class="right-container">
      <div class="upper-container">
        <h1>${book.title}</h1>
        <div class="meta">Автор: ${book.author} • Год: ${book.year} • Оценка: ${book.rating} ⭐</div>
        <div class="quote">"${book.review}"</div>
        <div class="buttons">
          <button>Читать сейчас</button>
          <button>Добавить в библиотеку</button>
        </div>
      </div>
      <div class="book-description">
        ${Array.isArray(book.description)
      ? book.description.map(p => `<p>${p}</p>`).join("")
      : `<p>${book.description}</p>`}
      </div>
    </div>
  `;
}

// 📚 Каталог книг
function renderCatalogCards(books) {
  const bookList = document.getElementById("bookList");
  bookList.classList.add("book-list");

  books.forEach(book => {
    const card = document.createElement("a");
    card.className = "book-card";
    card.href = book.link;

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="book-cover">
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-meta">Автор: ${book.author}</div>
        <div class="book-meta">Год: ${book.year}</div>
        <div class="book-meta">Жанры: ${book.genres.join(", ")}</div>
        <div class="book-meta">Оценка: ${book.rating} ⭐</div>
        <div class="book-description">
          ${Array.isArray(book.description)
        ? book.description.map(p => `<p>${p}</p>`).join("")
        : `<p>${book.description}</p>`}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      localStorage.setItem("selectedBook", JSON.stringify(book));
    });

    bookList.appendChild(card);
  });
}

// 🏠 Новинки на главной
function renderMainCards(featuredBooks) {
  const container = document.getElementById("mainFeatured");

  featuredBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "new_release_card";
    card.style.backgroundColor = book.bgColor;

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="new_release_cover">
      <div class="new_release_info">
        <div class="new_release_title">${book.title}</div>
        <div class="new_release_rating">Оценка: ${book.rating} ⭐</div>
      </div>
    `;

    container.appendChild(card);
  });
}

// 🚀 Инициализация
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("bookList")) {
    renderCatalogCards(books);
  }

  if (document.getElementById("mainFeatured")) {
    const featuredBooks = books.map(book => ({
      title: book.title,
      rating: book.rating,
      cover: book.cover,
      bgColor: "#2a2a2a"
    }));
    renderMainCards(featuredBooks);
  }

  if (document.getElementById("book-page")) {
    const bookId = getBookIdFromURL();
    const book = findBookById(bookId) || JSON.parse(localStorage.getItem("selectedBook"));

    if (book) {
      renderBookPage(book);
    } else {
      document.getElementById("book-page").innerHTML = "<p>Книга не найдена</p>";
    }
  }
});
