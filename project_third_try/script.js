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
      "«Что же ты, Иван, не везрит в дьявола?»",
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

// 🎯 Рекомендуемые книги (ПРОСТАЯ ВЕРСИЯ)
function renderRecommendedBooks() {
  const recommendedGrid = document.getElementById('recommendedBooks');

  // Просто берем все книги (или можно отфильтровать)
  const recommendedBooks = books; // все книги

  recommendedBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "new_release_card";
    card.style.backgroundColor = "#2a2a2a"; // тот же цвет
    card.setAttribute("data-book-id", book.id); // Добавляем ID книги
    card.style.cursor = "pointer"; // Делаем курсор указателем

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="new_release_cover">
      <div class="new_release_info">
        <div class="new_release_title">${book.title}</div>
        <div class="new_release_rating">Оценка: ${book.rating} ⭐</div>
      </div>
    `;

    // Добавляем обработчик клика
    card.addEventListener("click", () => {
      localStorage.setItem("selectedBook", JSON.stringify(book));
      window.location.href = book.link;
    });

    recommendedGrid.appendChild(card);
  });
}

// 🏠 Новинки на главной
function renderMainCards(featuredBooks) {
  const container = document.getElementById("mainFeatured");

  featuredBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "new_release_card";
    card.style.backgroundColor = book.bgColor;
    card.setAttribute("data-book-id", book.id); // Добавляем ID книги
    card.style.cursor = "pointer"; // Делаем курсор указателем

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" class="new_release_cover">
      <div class="new_release_info">
        <div class="new_release_title">${book.title}</div>
        <div class="new_release_rating">Оценка: ${book.rating} ⭐</div>
      </div>
    `;

    // Добавляем обработчик клика
    card.addEventListener("click", () => {
      // Находим полную информацию о книге по ID
      const fullBook = books.find(b => b.id === book.id);
      if (fullBook) {
        localStorage.setItem("selectedBook", JSON.stringify(fullBook));
        window.location.href = fullBook.link;
      }
    });

    container.appendChild(card);
  });
}

// 🚀 Инициализация
// 🚀 Инициализация
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("bookList")) {
    renderCatalogCards(books);
  }

  if (document.getElementById("mainFeatured")) {
    const featuredBooks = books.map(book => ({
      id: book.id, // Добавляем ID для связи
      title: book.title,
      rating: book.rating,
      cover: book.cover,
      bgColor: "#2a2a2a"
    }));
    renderMainCards(featuredBooks);
  }

  if (document.getElementById("recommendedBooks")) {
    renderRecommendedBooks();
  }

  if (document.getElementById("book-page")) {
    const bookId = getBookIdFromURL();
    const book = findBookById(bookId) || JSON.parse(localStorage.getItem("selectedBook"));

    if (book) {
      renderBookPage(book);
      // ✅ ВАЖНО: Инициализируем читалку после рендера страницы книги
      setTimeout(initOnlineReader, 100);
    } else {
      document.getElementById("book-page").innerHTML = "<p>Книга не найдена</p>";
    }
  }
});




// 📖 Онлайн-читалка
function initOnlineReader() {
  const readButtons = document.querySelectorAll('.buttons button:first-child');
  const onlineReader = document.getElementById('onlineReader');
  const closeReader = document.getElementById('closeReader');
  const readerTitle = document.getElementById('readerTitle');
  const readerText = document.getElementById('readerText');
  const prevPage = document.getElementById('prevPage');
  const nextPage = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');
  const fontSize = document.getElementById('fontSize');
  const darkMode = document.getElementById('darkMode');

  let currentBookId = null;
  let currentPage = 0;
  let isDarkMode = false;
  let bookPages = [];

  // Обработчики для кнопок "Читать сейчас"
  readButtons.forEach(button => {
    button.addEventListener('click', function () {
      const bookId = getBookIdFromURL();
      currentBookId = bookId;
      openReader(bookId);
    });
  });

  async function openReader(bookId) {
    const book = findBookById(bookId);
    readerTitle.textContent = book.title;

    // Показываем загрузку
    readerText.innerHTML = '<div style="text-align: center; padding: 40px;">Загрузка книги...</div>';
    onlineReader.classList.add('active');
    document.body.style.overflow = 'hidden';

    try {
      await loadBookText(bookId);
      currentPage = 0;
      showPage(0);
    } catch (error) {
      console.error('Ошибка загрузки книги:', error);
      readerText.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3>${book.title}</h3>
                    <p><em>${book.author}</em></p>
                    <div style="margin-top: 20px;">
                        ${Array.isArray(book.description)
          ? book.description.map(p => `<p>${p}</p>`).join('')
          : `<p>${book.description}</p>`}
                    </div>
                    <p style="margin-top: 20px; color: #e74c3c;">
                        <em>Ошибка загрузки текста книги. Файл не найден.</em>
                    </p>
                </div>
            `;
    }
  }

  async function loadBookText(bookId) {
    try {
      // Пытаемся загрузить текстовый файл
      const response = await fetch(`books/${bookId}.txt`);

      if (!response.ok) {
        throw new Error('Файл не найден');
      }

      const text = await response.text();

      // Разбиваем текст на страницы (примерно 500 символов на страницу)
      bookPages = splitTextIntoPages(text, 1500);

      if (bookPages.length === 0) {
        throw new Error('Файл пустой');
      }

    } catch (error) {
      throw error;
    }
  }

  function splitTextIntoPages(text, charsPerPage = 1500) {
    const pages = [];
    let start = 0;

    while (start < text.length) {
      let end = start + charsPerPage;

      // Если не конец текста, ищем ближайший конец предложения
      if (end < text.length) {
        // Ищем точку, восклицательный или вопросительный знак
        const sentenceEnd = Math.max(
          text.lastIndexOf('.', end),
          text.lastIndexOf('!', end),
          text.lastIndexOf('?', end),
          text.lastIndexOf('\n\n', end)
        );

        if (sentenceEnd > start + charsPerPage * 0.3) {
          end = sentenceEnd + 1;
        }
      } else {
        end = text.length;
      }

      const pageText = text.substring(start, end).trim();
      if (pageText) {
        pages.push(pageText);
      }

      start = end;
    }

    return pages;
  }

  function showPage(pageNum) {
    if (bookPages[pageNum]) {
      // Форматируем текст: заменяем переносы строк на параграфы
      const formattedText = bookPages[pageNum]
        .split('\n\n')
        .map(paragraph => {
          if (paragraph.trim()) {
            return `<p style="text-indent: 1.5em; margin-bottom: 1em;">${paragraph.trim()}</p>`;
          }
          return '';
        })
        .join('');

      readerText.innerHTML = formattedText || '<p>Текст страницы пуст</p>';
      currentPage = pageNum;
      updatePageInfo();
    }
  }

  function updatePageInfo() {
    pageInfo.textContent = `Страница ${currentPage + 1} из ${bookPages.length}`;

    prevPage.disabled = currentPage === 0;
    nextPage.disabled = currentPage === bookPages.length - 1;
  }

  // Обработчики элементов управления
  closeReader.addEventListener('click', () => {
    onlineReader.classList.remove('active');
    document.body.style.overflow = 'auto';
    bookPages = []; // Очищаем загруженные страницы
  });

  prevPage.addEventListener('click', () => {
    if (currentPage > 0) {
      showPage(currentPage - 1);
    }
  });

  nextPage.addEventListener('click', () => {
    if (currentPage < bookPages.length - 1) {
      showPage(currentPage + 1);
    }
  });

  fontSize.addEventListener('change', (e) => {
    readerText.style.fontSize = e.target.value + 'px';
  });

  darkMode.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    onlineReader.classList.toggle('reader-dark', isDarkMode);
    darkMode.textContent = isDarkMode ? '☀️' : '🌙';
  });

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && onlineReader.classList.contains('active')) {
      onlineReader.classList.remove('active');
      document.body.style.overflow = 'auto';
      bookPages = [];
    }

    // Навигация стрелками
    if (onlineReader.classList.contains('active')) {
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        showPage(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < bookPages.length - 1) {
        showPage(currentPage + 1);
      }
    }
  });
}

