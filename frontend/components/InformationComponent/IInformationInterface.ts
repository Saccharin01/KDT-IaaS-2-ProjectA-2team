import ITitle from"@shared/interfaces/ITitle"
import IAuthor from"@shared/interfaces/IAuthor"
import IPrice from"@shared/interfaces/IPrice"
import IIntroduce from "@shared/interfaces/IInrtoduce"

interface IDetailInterface extends ITitle, IAuthor, IPrice, IIntroduce{
  className? : string
}


export default IDetailInterface