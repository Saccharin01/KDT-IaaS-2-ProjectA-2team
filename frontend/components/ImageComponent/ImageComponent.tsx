import IImageInterface from "./IImageInterface";

const ImageComponent: React.FC<IImageInterface> = ({ ...props}) => {
  return <img {...props} />
}

export default ImageComponent