import IInformationInterface from "./IInformationInterface"
import ParameterComponent from "../ParameterComponent/ParameterComponent";


const InformationComponent: React.FC<IInformationInterface> = ({title,author,price,introduce}) => {
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
            <ParameterComponent>{introduce}</ParameterComponent>
          </div>
    </div>
  );
};
export default InformationComponent;