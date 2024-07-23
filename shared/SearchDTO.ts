export interface SearchDTO {
  query : string
}


export interface BookDTO {
    id : number;
    title : string;
    author : string;
    price: number;
    genre : string;
    publisher : string;
    explanation : string;
    stock : number;
}

export interface SearchResponse {
  incomeData: BookDTO[]
}


