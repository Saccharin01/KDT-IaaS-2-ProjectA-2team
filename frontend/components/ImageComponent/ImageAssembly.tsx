import React from "react";
import ImageComponent from "./ImageComponent";
import base from "@shared/SearchDTO";
interface IImageAssembly {
  parsedData : base[]
}


const ImageAssembly:React.FC<IImageAssembly> = ({parsedData})=>{

  return( parsedData.map((element, index)=>
      <div key={index}>
        <ImageComponent className="product_image" src={element._id.toString()} alt={element._id.toString()}/>
      </div>
    )
  )
}

export default ImageAssembly