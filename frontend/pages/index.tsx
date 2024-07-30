import data from "../components/testData";
import PageAssembly from "frontend/components/ImageComponent/PageAssembly";
import ImageAssembly from "frontend/components/ImageComponent/ImageAssembly";
import ExplanationAssembly from "frontend/components/ExplainationComponent/ExplainationAssembly";


// const searchPage = () => {
//   return (
//     <div id="root">
//       <ImageAssembly parsedData={data.parsedData}/>
//       <ExplanationAssembly parsedData={data.parsedData} />
//     </div>
//   );
// };
const searchPage = () => {
  return (
    <div id="root">
      <PageAssembly/>
    </div>
  );
};

export default searchPage