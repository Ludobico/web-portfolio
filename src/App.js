import "./App.css";
import { Routes, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Main from "./Components/Main.jsx";
import Test from "./Components/Test";
function App() {
  return (
    <div className="App">
      <TransitionGroup className="transition-group">
        <CSSTransition timeout={1000} classNames="fade">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
