import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
