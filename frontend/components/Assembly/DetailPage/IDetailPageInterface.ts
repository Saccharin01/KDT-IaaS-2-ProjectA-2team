import Ititle from "@shared/interfaces/ITitle"
import IPrice from "@shared/interfaces/IPrice"
import IHashtag from "@shared/interfaces/IHashtag"
import IIntroduce from "@shared/interfaces/IInrtoduce"
import IStockQuantity from "@shared/interfaces/IStockQuantity"

interface data extends IHashtag,IIntroduce,Ititle,IPrice,IStockQuantity {}

interface IDetailPageInterface {
  data : data[]
}


export default IDetailPageInterface