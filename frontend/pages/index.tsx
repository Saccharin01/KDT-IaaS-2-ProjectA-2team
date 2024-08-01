import data from "../components/testData";
import SearchBooksAssembly from "frontend/components/Assembly/SearchBooks/SearchBooksAssembly";

const SearchBook = () => {
  return (
    <div id="root"
    className="h-screen">
      <SearchBooksAssembly data={data.test}/>
    </div>
  );
};

export default SearchBook