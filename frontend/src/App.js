
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import FoodZone from "./FoodZone";
import Header  from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ErrorPage from "./ErrorPage";
import "./App.css";
const App = () => {


  return (


    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/foodZone" element={<FoodZone/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </Router>

  )
}

export default App;
