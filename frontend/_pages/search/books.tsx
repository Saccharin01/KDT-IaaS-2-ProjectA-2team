import data from "../../components/testData";
import SearchBooksAssembly from "../../components/Assembly/SearchBooks/SearchBooksAssembly";

const searchPage = () => {
  return (
    <div id="root"
    className="h-screen">
      <SearchBooksAssembly data={data.test}/>
    </div>
  );
};

export default searchPage