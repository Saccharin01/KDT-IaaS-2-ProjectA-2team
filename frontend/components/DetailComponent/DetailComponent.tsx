import IDetailInterface from "./IDetailInterface"
import ParameterComponent from "../ParameterComponent/ParameterComponent";


const DetailComponent: React.FC<IDetailInterface> = ({title,author,price,explanation}) => {
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
export default DetailComponent;




// const DetailComponent: React.FC<IExplainationInterface> = ({parsedData}) => {

//   return ( 


//     <div className="details" key={index}>
//       <h3>{element.title}</h3>
//       <h4>{element.author}</h4>
//       <ParameterComponent>{element.price}원</ParameterComponent>
//       <ParameterComponent>{element.explanation}</ParameterComponent>
//     </div>
        
//   );
// };

