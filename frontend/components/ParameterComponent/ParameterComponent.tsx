import React from "react";
import IParameterinterface from "./IParameterInterFace";


const ParameterComponent:React.FC<IParameterinterface> = ({...props}) => <p {...props}/>


export default ParameterComponent