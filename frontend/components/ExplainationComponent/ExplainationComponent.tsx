import {IExplaination, ISearchResponse} from "./IExplainationInterface"



const ExplainComponent:React.FC<IExplaination> = ({className,textNode,price,author,title})=>{
  
  return(
    <div className={className}>
      <div>
      <h3>{title}</h3>
      </div>
      <div>
      <h4>{price}</h4>
      </div>
      <div>
      <p>{author}</p>
      </div>
      <div>
      <p>{textNode}</p>
      </div>
    </div>
  )
}

const ExplainComponent2:React.FC<ISearchResponse> = (data)=>{
  const responseData = data.incomeData
  responseData.map((element, index)=>{

    <div key={index}>
      <div>
       <h3>{element.title}</h3>
      </div>

      <div>
        <h4>{element.author}</h4>
      </div>

      <div>
       <p>{element.price}</p>
      </div>

      <div>
        <p>{element.explanation}</p>
      </div>
  </div>


  })
    
  return(
      <div>
        <div>
        <h3></h3>
        </div>
        <div>
        <h4></h4>
        </div>
        <div>
        <p></p>
        </div>
        <div>
        <p></p>
        </div>
      </div>
  )
}



export default ExplainComponent