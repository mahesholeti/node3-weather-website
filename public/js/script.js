console.log("Client Side Javascript file has been loaded!")

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(search.value);
    message1.textContent = "loading!";
    message2.textContent = "";
    fetch(`/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            if(data.err){
                console.log(data.err);
                message1.textContent = data.err;
            } else{
                console.log(data.address)
                console.log(data.forecast)
                console.log(data.location)
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    })
})

