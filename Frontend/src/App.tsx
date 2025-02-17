import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { DockerComposePage } from "./pages/DockerComposePage";
import Home from "./pages/Home";
import { ContentProvider } from "./context/contentContext";
import DockerForm from "./createdComp/DockerForm";
import DockerFilePage from "./pages/DockerFilePage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/DockerCompose" element={<DockerComposePage />} />
        <Route path="/DockerFile" element={<ContentProvider> <DockerFilePage /> </ContentProvider>} />
      </Routes>
    </Router>
  )
}

export default App
