import IExplainationInterface from "./IExplainationInterface"
import ParameterComponent from "../ParameterComponent/ParameterComponent";


const ExplanationAssembly: React.FC<IExplainationInterface> = ({title,author,price,explanation}) => {
  return (
    <div>
          <div>
            <h3>{title}</h3>
          </div>
          <div>
            <h4>{author}</h4>
          </div>
          <div>
            <ParameterComponent>{price}</ParameterComponent>
          </div>
          <div>
            <ParameterComponent>{explanation}</ParameterComponent>
          </div>
    </div>
  );
};
export default ExplanationAssembly;




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

