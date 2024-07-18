import bookData from "./public/json/book.json"
import  Assembly  from "./components/Assembly.js"

const incommingData = bookData.json()


Assembly.tagAssembly(incommingData)
Assembly.reactAssembly(incommingData)

