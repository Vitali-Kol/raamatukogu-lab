// ============================================
// ANDMESALV
// Kõik andmed hoitakse mälus
// ============================================

const data = {
  users: [
    { id: 1, username: "mari", password: "1234", name: "Mari Maasikas" },
    { id: 2, username: "jaan", password: "1234", name: "Jaan Jansen" },
  ],

  books: [
    { id: 1, title: "Tõde ja õigus", author: "A. H. Tammsaare", year: 1926, genre: "romaan", available: true },
    { id: 2, title: "Rehepapp", author: "Andrus Kivirähk", year: 2000, genre: "romaan", available: true },
    { id: 3, title: "1984", author: "George Orwell", year: 1949, genre: "düstoopia", available: true },
    { id: 4, title: "Harry Potter ja filosoofiakivi", author: "J.K. Rowling", year: 1997, genre: "fantaasia", available: true },
    { id: 5, title: "Väike prints", author: "Antoine de Saint-Exupéry", year: 1943, genre: "jutustus", available: true },
    { id: 6, title: "Don Quijote", author: "Miguel de Cervantes", year: 1605, genre: "romaan", available: true },
    { id: 7, title: "Sõrmuste isand", author: "J.R.R. Tolkien", year: 1954, genre: "fantaasia", available: true },
    { id: 8, title: "Kurjuse banaalsus", author: "Hannah Arendt", year: 1963, genre: "filosoofia", available: true },
  ],

  loans: [],
  sessions: {},

  nextUserId: 3,
  nextLoanId: 1,
};

module.exports = data;
