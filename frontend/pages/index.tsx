import data from "../components/testData";
import PageAssembly from "frontend/components/PageAssembly/PageAssembly";

const searchPage = () => {
  return (
    <div id="root"
    className="h-screen">
      <PageAssembly data={data.test}/>
    </div>
  );
};

export default searchPage