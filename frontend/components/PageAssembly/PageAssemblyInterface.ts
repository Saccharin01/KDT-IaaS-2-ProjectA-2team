import { BookDTO } from "@shared/SearchDTO";

interface basePlate extends BookDTO {}

interface IPageAssembly{
  data : basePlate[]
}


export default IPageAssembly