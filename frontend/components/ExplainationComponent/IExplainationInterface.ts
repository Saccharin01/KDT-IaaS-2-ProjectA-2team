import base from "@shared/SearchDTO"
import { HTMLAttributes } from "react"

interface IExplainationInterface extends HTMLAttributes<base>  {
  parsedData : base[]
}
// interface IExplainationInterface extends HTMLAttributes<base>  {}

export default IExplainationInterface