const app = require('./app.js');
const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Open : http://localhost:${PORT}`);
})