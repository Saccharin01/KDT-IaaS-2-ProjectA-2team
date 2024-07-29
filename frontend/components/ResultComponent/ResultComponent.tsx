import IResultInterface from "./IResultInterface"


const ResultComponent:React.FC<IResultInterface>= ({className, textNode}) => {

  return(
    <div className={className}>
      <div>{textNode}</div>
      <div>자세한 정보들</div>
      <div>버튼들</div>
    </div>
  )
}

export default ResultComponent