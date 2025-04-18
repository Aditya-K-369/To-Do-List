import "./App.css";
import Main from "./components/main.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;
