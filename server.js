
// Load all environment variables 
require('dotenv').config()

//setting up express
const express=require ('express');
const app= express();

// read all JSON data that gets sent to the server

app.use(express.json())

// Setting up Stripe
const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// for client
app.use(express.static("public"))

// Key Value pair of the items in the store
const storeItems = new Map([
    [1,{priceInCents:10000,name:"Binod"}],
    [2,{priceInCents:20000,name:"Father of Binod"}],
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
            // For DEVELOPMENT 
            // success_url: `http://localhost:3000/success.html`,
            // cancel_url: `http://localhost:3000/cancel.html`

            // FOR PRODUCTION
            success_url: `${process.env.SERVER_URL}/success.html`, // SERVER_URL=http://localhost:3000
            cancel_url: ` ${process.env.SERVER_URL}/cancel.html`,
        })
        res.json({ url: session.url })
    } catch(e){
    res.status(500).json({error: e.message})
}
})

app.listen(3000)    