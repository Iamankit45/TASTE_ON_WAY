
## Taste-On-Way

This is a MERN stack project application. This web application consists on a Food Ordering platform where the user can sign up,add dishes to the cart according to their wishes.





### Functionalities

* Sign Up as a user  with email ,password and phone number
* Sign In
* Search for dishes in a restaurant
* Filter according to your taste
* Filter by name,restaurant,nonveg,veg,starter and so on
* Add dishes to your cart by selecting a quantity
* Modify quantity of dishes on cart
* Price and quantity shown in cart updates automatically





## Run Locally

Clone the project

```bash
  git clone https://github.com/Iamankit45/TASTE_ON_WAY
```

Go to the project directory

```bash
  cd TASTE_ON_WAY
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
backened: npm run dev
frontened: npm start
```


Before running npm run dev, you will need the following environment variables:

```bash

just make a config.env file in config folder with these environment variables:-

MONGODB_URL= <This is your MongoDb URI>
JWT_KEY =<This is your access token secret>
CLOUDINARY_CLOUD_NAME 
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET_KEY
```