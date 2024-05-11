import {BrowserRouter,Routes,Route} from "react-router-dom";

import Conversion from "./Conversion";
import About from "./About";
import LandingPage from "./LandingPage";
import StarsCanvas from "./components/StarBg";
import DocumentationReader from "./DocumentationReader";
import DocumentationEditor from "./DocumentationEditor";
import DocumentationLegacy from "./DocumentationLegacy";
import Documentation from "./Documentation";
import LoginPage from "./login/pages/Login";
import SignupPage from "./login/pages/Signup";
import LoginRedirect from "./LoginRedirect";
import SigunupRedirect from "./SigunupRedirect";


function App() {

  return (
    <div>
      <StarsCanvas />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Conversion />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/doc" element={<Documentation />} />
          <Route path="/documentationeditor" element={<DocumentationEditor />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route path="/signup" element={<SigunupRedirect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
