import IExplainationInterface from "./IExplainationInterface"
import ParameterComponent from "../ParameterComponent/ParameterComponent";

const explanationAssembly: React.FC<IExplainationInterface> = ({ parsedData }) => {
  return (
      parsedData.map((element, index) => (
        <div key={index} className="details">
          <div>
            <h3>{element.title}</h3>
          </div>
          <div>
            <h4>{element.author}</h4>
          </div>
          <div>
            <ParameterComponent>{element.price}원</ParameterComponent>
          </div>
          <div>
            <ParameterComponent>{element.explanation}</ParameterComponent>
          </div>
        </div>
      ))
  );
};
export default explanationAssembly;




// const explanationAssembly: React.FC<IExplainationInterface> = ({parsedData}) => {

//   return ( 


//     <div className="details" key={index}>
//       <h3>{element.title}</h3>
//       <h4>{element.author}</h4>
//       <ParameterComponent>{element.price}원</ParameterComponent>
//       <ParameterComponent>{element.explanation}</ParameterComponent>
//     </div>
        
//   );
// };

