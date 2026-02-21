

// console.log("Hello World!")

const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res)=>{
    res.send("Hello Dey!")
})

app.get("/about", (req, res)=>{
    res.send("My First Project")
})

app.listen(port, () => {
console.log(`App is listening on port ${port}`)
})