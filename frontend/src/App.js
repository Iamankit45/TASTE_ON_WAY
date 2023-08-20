
import Profile from './components/Profile';
import LinkPage from './components/LinkPage';
import Editor from './components/Editor';
import Home from './components/pages/Home';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './context/RequireAuth';
import { AuthProvider } from './context/Auth';
import PersistLogin from './components/PersistLogin';
import { AppProvider } from "./context/foodContext";
import { FilterContextProvider } from "./context/filterContext";
import { CartProvider } from './context/cartContext';
import './App.css';
import FoodZone from './components/pages/FoodZone';
import SingleFoodData from "./components/pages/SingleFoodData";
import Cart from "./components/pages/Cart";
import LogOut from './components/pages/LogOut';
import SignUp from './components/pages/Signup';
import PaymentSuccess from './components/pages/PaymentSuccess';
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
            <Route path="/logout" element={<LogOut/>} />
           <Route path ="/signup" element={<SignUp/>}/>
           <Route path ="/PaymentSuccess" element={<PaymentSuccess/>}/>
            <Route element={<PersistLogin />}>
           
            <Route path="/" element={<Home />} />
              <Route path="/foodZone" element={<FoodZone />} />
              <Route path="/SingleFoodData/:id" element={<SingleFoodData/>} />
              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/cart" element={<RequireAuth><Cart/></RequireAuth>} />
             
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
