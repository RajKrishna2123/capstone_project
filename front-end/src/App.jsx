import {BrowserRouter,Routes,Route} from "react-router-dom";

import Conversion from "./Conversion";
import About from "./About";
import LandingPage from "./LandingPage";
import StarsCanvas from "./components/StarBg";






function App() {

  return (
      <div>
      <StarsCanvas />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Conversion />} />

         </Routes>
       </BrowserRouter>
     </div>

  )
}

export default App
