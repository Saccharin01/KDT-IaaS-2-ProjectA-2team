import axios, {AxiosInstance, AxiosHeaders}  from "axios"

export class DataController {
  private axiosInstance : AxiosInstance
  private post: string
  private put: string
  
  /**
   * * 황재민
   * TODO 삭제에 대한 엔드포인트가 존재하지 않는다.
   * @param baseURL 서비스 주소
   * @param post 엔드 포인트(post)
   * @param put 엔드 포인트(put)
   */
  constructor(baseURL: string, post: string, put: string){

    //* axiosInstance를 만든다
    this.axiosInstance = axios.create({
      baseURL,
      headers : {
        'Content-Type': 'application/json',
      },
    })

    this.post = post
    this.put = put
  }

  PostMethod(data: unknown){
    return this.axiosInstance.post(this.post, data)
  }

  PutMethod(data: unknown){
    return this.axiosInstance.put(this.put, data)
  }
}