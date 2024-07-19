const obj = Object.freeze({
  book_list: {
    _id: Number,
    title: String,
    author: String,
    publisher: String,
    genre: String,
    price: Number,
    explantation: String,
    stock: Number
  }
})

module.exports = obj;