
// Load all environment variables 
require('dotenv').config()

//setting up express
const express=require ('express');
const app= express();

// read all JSON data that gets sent to the server

app.use(express.json())

// Setting up Stripe
const stripe=require('stripe')(process.env.STRIPE_KEY)

// for client
app.use(express.static("public"))

// Key Value pair of the items in the store
const storeItems = new Map([
    [1,{priceInPaise:10000,name:"Binod"}],
    [2,{priceInPaise:20000,name:"Father of Binod"}],
])

app.post('/create-checkout-session', async (req,res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
            const storeItem = storeItems.get(item.id)
            return {
                price_data: {
                currency: "usd",
                product_data: {
                    name: storeItem.name,
                },
                unit_amount: storeItem.priceInCents,
                },
                quantity: item.quantity,
            }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch(e){
    res.status(500).json({error: e.message})
}
})

app.listen(3000)    