
// Load all environment variables 
require('dotenv').config()

//setting up express
const express=require ('express');
const app= express();

// read all JSON data that gets sent to the server

app.use(express.json())

// for client side
app.use(express.static("public"))

// Key Value pair of the items in the store
const storeItems = new Map([
    [1,{priceInPaise:10000,name:"Binod"}],
    [2,{priceInPaise:20000,name:"Father of Binod"}],
])

// Setting up Stripe
const stripe=require('stripe')(process.env.STRIPE_KEY)

app.listen(3000)    