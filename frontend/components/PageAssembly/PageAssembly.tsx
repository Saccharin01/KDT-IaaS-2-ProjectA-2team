import React from "react"
import IPageAssembly from "./PageAssemblyInterface"
import ImageComponent from "../ImageComponent/ImageComponent"
import DetailComponent from "../DetailComponent/DetailComponent"
import ButtonComponent from "../ButtonComponent/ButtonComponent"



const PageAssembly:React.FC<IPageAssembly> = ({data}) => {

  return(
    data.map((element, index)=> 
      <div key={index} className="test">
        <ImageComponent src={`${element._id}`} alt={`${element._id}`}/>
        <DetailComponent
        title={element.title}
        author={element.author}
        price={element.price}
        explanation={element.explanation}
        />
        <ButtonComponent type="button" title = "basket" children="장봐군이"/>
        <ButtonComponent type="button" title = "buy_now" children="뽜뤄구매"/>
      </div>
    )
  )
}

export default PageAssembly