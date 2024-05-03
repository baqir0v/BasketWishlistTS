import { Route, Routes } from "react-router-dom"
import Data from "./components/Data" 

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Data/>}/>
      </Routes>
    </>

  )
}

export default App
