const express = require('express');
const router = express.Router();
const getInstanceDB = require("../Controllers/getInstanceDB.js");

// /search 라우터 설정
router.get('/', async (req, res) => {
  const query = req.query.title; // 쿼리 문자열 q를 가져옴

  const db = await getInstanceDB();
  const schema = db.GetSchema("book_info");
  let books;

  if (query) {
    books = await schema.find({ title: new RegExp(query, 'i') })

  } else {
    books = await schema.find({});
  }

  res.status(200).json(books);
});

module.exports = router;