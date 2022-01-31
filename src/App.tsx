import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import QuestionView from './pages/QuestionView';
import ResultView from './pages/ResultView';

function App() {
   return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/question" element={<QuestionView />}></Route>
          <Route path="/result/:key" element={<ResultView />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
