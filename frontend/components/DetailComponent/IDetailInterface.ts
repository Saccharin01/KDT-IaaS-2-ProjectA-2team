import Title from"@shared/interfaces/ITitle"
import Author from"@shared/interfaces/IAuthor"
import Price from"@shared/interfaces/IPrice"
import Explanation from"@shared/interfaces/IExplanation"


interface IDetailInterface extends Title, Author, Price, Explanation{}


export default IDetailInterface