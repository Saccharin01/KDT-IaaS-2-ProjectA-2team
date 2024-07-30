import React from "react"
import ExplainAssembly from "../ExplainationComponent/ExplainationAssembly"
import ImageAssembly from "./ImageAssembly"
import baseDTO from "@shared/SearchDTO"
import data from "../testData"


interface ParsedData {
  data : baseDTO[]

}


const PageAssembly = () => {
  const parsedData = data.parsedData

  return(
      <div>
      <ExplainAssembly parsedData={parsedData}/>
      <ImageAssembly parsedData={parsedData}/>
      </div>
  )
}

export default PageAssembly