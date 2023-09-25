
import Profile from './Components/Profile';
import LinkPage from './Components/LinkPage';
import Editor from './Components/Editor';
import Home from './Components/pages/Home';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from './Components/Login';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './Context/RequireAuth';
import { AuthProvider } from './Context/Auth';
import PersistLogin from './Components/PersistLogin';
import { AppProvider } from "./Context/foodContext";
import { FilterContextProvider } from "./Context/filterContext";
import { CartProvider } from './Context/cartContext';
import './App.css';
import FoodZone from './Components/pages/FoodZone';
import SingleFoodData from "./Components/pages/SingleFoodData";
import Cart from "./Components/pages/Cart";
import LogOut from './Components/pages/LogOut';
import SignUp from './Components/pages/Signup';
import Contact from "./Components/pages/Contact";
import PaymentSuccess from './Components/pages/PaymentSuccess';
function App() {
  return (


    <AuthProvider>
      <AppProvider>
        <FilterContextProvider>
          <CartProvider>
            <Header />
            <Routes>


              <Route path="/login" element={<Login />} />
              <Route path="/linkpage" element={<LinkPage />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
              <Route element={<PersistLogin />}>

                <Route path="/" element={<Home />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/foodZone" element={<FoodZone />} />
                <Route path="/SingleFoodData/:id" element={<SingleFoodData />} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />

                <Route path="/editor" element={<RequireAuth><Editor /></RequireAuth>} />
              </Route>
            </Routes>
            <Footer />
          </CartProvider>
        </FilterContextProvider>
      </AppProvider>
    </AuthProvider>


  );
}

export default App;
