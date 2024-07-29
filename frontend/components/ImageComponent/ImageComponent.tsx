import ImageInterface from "./IImageInterface";

const ImageComponent: React.FC<ImageInterface> = ({className,src}) =>{
  return(
    <div className={className}>
      <img src={src} alt={src}/>
    </div>
  )
}

export default ImageComponent