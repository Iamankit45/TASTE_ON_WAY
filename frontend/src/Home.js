import "./home.css"


const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <div className="image-section">
                    <img src="./images/burger.jpeg" alt="burger"></img>
                    <img src="./images/mommos.jpeg" alt="mommos"></img>

                    <img src="./images/pizza.jpeg" alt="pizza"></img>
                    <img src="./images/coldcoffee.jpeg " alt="coldcoffee"></img>
                </div>

                <div className="content">
                    <div className="content1">
                        <h3>It's all here. All in one app.</h3>
                        <p1>Discover local, on-demand delivery or Pickup from restaurants, nearby grocery and convenience stores, and more.</p1>
                        <button >SignIn</button>
                    </div>
                    <div className="content2">
                    <img src="./images/delivery.webp" alt="Delivery"></img>
                    </div>
                    
                </div>
            </div>



        </div>)
}

export default Home;