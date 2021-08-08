const button = document.querySelector("button")
button.addEventListener("click",()=>{

    //  Make A request to the server
    fetch("/create-checkout-session",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

        // ID and QUANTITY of ITEMS i want to bu
        body: JSON.stringify({
            items:[
                {
                    id:1,quantity:3
                },
                {
                    id:2,quantity:1}
            ],
        }),
    })

    // REDIRECT THE USER if this is a successful request

    .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch(e => {
        console.error(e.error)
      })
  })