
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Contact from "./Contact";
import FoodZone from "./FoodZone";
import Header  from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SingleFoodData from "./SingleFoodData";
import Cart from "./Cart";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";
import SignUp from "./Components/SignUp"
import "./App.css";
const App = () => {


  return (


    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/foodZone" element={<FoodZone/>} />
        <Route path="/SingleFoodData/:id" element={<SingleFoodData/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/Profile" element={<Profile/>} />

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </Router>

  )
}

export default App;
