const express = require("express");
const router = express.Router();
const data = require("../data");

function getUser(token) {
  const userId = data.sessions[token];
  if (!userId) return null;
  return data.users.find((u) => u.id === userId);
}

// POST /api/loans — laena raamat
router.post("/", (req, res) => {
  const user = getUser(req.headers.authorization);
  if (!user) return res.status(401).json({ error: "Pead olema sisse logitud" });

  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ error: "Vajalik väli: bookId" });

  const book = data.books.find((b) => b.id === parseInt(bookId));
  if (!book) return res.status(404).json({ error: "Raamatut ei leitud" });
  if (!book.available) return res.status(409).json({ error: "Raamat on juba laenatud" });

  // Kontrolli kas kasutajal on juba 3 laenu
  const userActiveLoans = data.loans.filter((l) => l.userId === user.id && !l.returnedAt);
  if (userActiveLoans.length >= 3) {
    return res.status(409).json({ error: "Sul on juba 3 aktiivset laenu. Tagasta raamat enne uue laenamist." });
  }

  book.available = false;
  const loan = {
    id: data.nextLoanId++,
    bookId: book.id,
    bookTitle: book.title,
    userId: user.id,
    userName: user.name,
    loanedAt: new Date().toISOString(),
    returnedAt: null,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  };
  data.loans.push(loan);
  res.status(201).json({ message: "Raamat laenatud!", loan });
});

// POST /api/loans/:id/return — tagasta raamat
router.post("/:id/return", (req, res) => {
  const user = getUser(req.headers.authorization);
  if (!user) return res.status(401).json({ error: "Pead olema sisse logitud" });

  const loan = data.loans.find((l) => l.id === parseInt(req.params.id));
  if (!loan) return res.status(404).json({ error: "Laenu ei leitud" });
  if (loan.userId !== user.id) return res.status(403).json({ error: "See ei ole sinu laen" });
  if (loan.returnedAt) return res.status(409).json({ error: "Raamat on juba tagastatud" });

  loan.returnedAt = new Date().toISOString();
  const book = data.books.find((b) => b.id === loan.bookId);
  if (book) book.available = true;

  res.json({ message: "Raamat tagastatud!", loan });
});

// GET /api/loans
router.get("/", (req, res) => {
  res.json({ loans: data.loans });
});

// GET /api/loans/me — minu laenud
router.get("/me", (req, res) => {
  const user = getUser(req.headers.authorization);
  if (!user) return res.status(401).json({ error: "Pead olema sisse logitud" });
  const userLoans = data.loans.filter((l) => l.userId === user.id);
  res.json({ loans: userLoans, active: userLoans.filter((l) => !l.returnedAt).length });
});

module.exports = router;
