import axios, {AxiosInstance, AxiosHeaders}  from "axios"

export class DataController {
  private axiosInstance : AxiosInstance
  private post: string
  private put: string
  
  constructor(baseURL: string, post: string, put: string){

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