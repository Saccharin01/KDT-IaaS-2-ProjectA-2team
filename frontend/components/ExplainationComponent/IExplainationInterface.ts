// import ITextNode from "@shared/interfaces/Woosik/ITextNode";
// import IClassName from "@shared/interfaces/Woosik/IClassName";
// import IAuthor from "@shared/interfaces/Woosik/IAuthor";
// import IPrice from "@shared/interfaces/Woosik/IPrice";
// import ITitle from "@shared/interfaces/Woosik/ITitle";
// import SearchResponse from "@shared/SearchDTO";

// interface IExplaination extends ITextNode, IClassName, IAuthor, IPrice, ITitle {}

interface baseDTO {
  _id: number;
  title: string;
  author?: string;
  price: number;
  genre?: string;
  publisher?: string;
  explanation?: string;
  stock: number;
}

interface response {
  test: baseDTO[];
}

export default response;
