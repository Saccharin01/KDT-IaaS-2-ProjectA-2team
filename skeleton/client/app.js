const express = require('express');
const path = require('path');

const app = express();

// 정적 파일 제공을 위한 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;