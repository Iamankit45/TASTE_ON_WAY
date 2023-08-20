import { NavLink } from "react-router-dom";
// import SignUp from "./Components/SignUp"
import "./home.css"
import pic1 from "../img/burger.jpeg"
import pic2 from "../img/mommos.jpeg"
import pic3 from "../img/pizza.jpeg"
import pic4 from  "../img/coldcoffee.jpeg"
import pic5 from "../img/delivery.webp"

const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <div className="image-section">
                    <img src={pic1} alt="burger"></img>
                    <img src= {pic2}alt="mommos"></img>

                    <img src={pic3} alt="pizza"></img>
                    <img src= {pic4}alt="coldcoffee"></img>
                </div>

                <div className="content">
                    <div className="content1">
                        <h3>It's all here. All in one app.</h3>
                        <p1>Discover local, on-demand delivery or Pickup from restaurants, nearby grocery and convenience stores, and more.</p1>
                       
                       <NavLink to ="./Signup"><button >SignUp</button></NavLink> 
                    </div>
                    <div className="content2">
                    <img src={pic5} alt="Delivery"></img>
                    </div>
                    
                </div>
            </div>



        </div>)
}

export default Home;