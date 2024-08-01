import Ititle from "@shared/interfaces/ITitle"
import IPrice from "@shared/interfaces/IPrice"
import IHashtag from "@shared/interfaces/IHashtag"
import IIntroduce from "@shared/interfaces/IInrtoduce"
import IStockQuantity from "@shared/interfaces/IStockQuantity"
import IAuthor from "@shared/interfaces/IAuthor"
import IId from "@shared/interfaces/IId"

interface data extends IHashtag,IIntroduce,Ititle,IPrice,IStockQuantity,IAuthor,IId{}

interface ISearchBooksInterface{
  data : data[]
}


export default ISearchBooksInterface