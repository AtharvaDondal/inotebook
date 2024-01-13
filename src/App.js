import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/noteState";

import "./App.css";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message = "This is just a trial message"/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route 
            exact path="/about"
            element = {<About />}
          />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
