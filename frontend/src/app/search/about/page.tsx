import data from "../../../../components/testData";
import DetailPageAssembly from "frontend/components/Assembly/DetailPage/DetailPageAssembly";


const DetailPage = () => {
  return (
    <div id="root">
      <DetailPageAssembly data={data.test}/>
    </div>
  );
};

export default DetailPage