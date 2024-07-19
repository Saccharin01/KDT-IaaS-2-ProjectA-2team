const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/search', async (req, res) => {

  //CORS
  //쿼리스트링 인코딩이 안되어있다.
  //그대로 보내주고
  //DB에서 쿼리스트을 디코딩해서, 맞는데이터를 넣어준다.

  const dbRes = await fetch("http:localhost:3010" + req.url);
  const data = await dbRes.json();
  res.status(200).json(data);
})

module.exports = app;