import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Weather";
import Login from "./pages/Login";
import Map from "./pages/Map";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
