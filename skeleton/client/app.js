const express = require('express');
const path = require('path');

const app = express();

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

// const PORT = 8080
// app.listen(PORT, () => {
//   console.log(`Server Open : http://localhost:${PORT}`);
// })
module.exports = app;