import IImageInterface from "./IImageInterface";

const ImageComponent: React.FC<IImageInterface> = ({parsedData}) => {

  return(
      parsedData.map((element, index)=>
      <div className="produce_image" key={index}>
        <img src={element._id.toString()} alt={element._id.toString()}/>
      </div>
    )
  )
}

export default ImageComponent