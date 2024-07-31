import React from "react"
import baseDTO from "@shared/SearchDTO"
import ImageComponent from "./ImageComponent/ImageComponent"
import ExplanationComponent from "./ExplainationComponent/ExplainationComponent"

interface ParsedData {
  data : baseDTO[]
}


const PageAssembly:React.FC<ParsedData> = ({data}) => {

  return(
    data.map((element, index)=> 
      <div key={index} className="test">
        <ImageComponent src={`${element._id}`} alt={`${element._id}`}/>
        <ExplanationComponent
        title={element.title}
        author={element.author}
        price={element.price}
        explanation={element.explanation}
        />
      </div>
    )
  )
}

export default PageAssembly