import ExplainComponent from "frontend/components/ExplainationComponent/ExplainationComponent";
import data from "../components/testData";

const searchPage = () => {
  return (
    <div id="root">
      <ExplainComponent parsedData={data.parsedData}/>
    </div>
  );
};

export default searchPage