
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000
require("dotenv").config()

app.use(express.json())

const bookSchema = mongoose.Schema({})
bookModel = mongoose.model("Book", bookSchema)

// const { add, substract } = require("./helpers/math")
// const result  = require("./helpers/loggers/result")
// console.log(result())
// console.log(add(90, 11))
// console.log(substract(100, 11))


// app.get("/", (req, res)=>{
//     res.send("Hello Dey!")
// })

// app.get("/about", (req, res)=>{
//     res.send("About Page")
// })

// app.get("/contact", (req, res)=>{
//     res.send("Contact Page")
// })

// //Home Page Task
// app.get("/home", (req, res)=>{
//     res.send("Home Page")
// })

app.listen(port, () => {
console.log(`App is listening on port ${port}`)
})

app.post("/books", async(req, res)=>{
    const newBook = await bookModel.create(req.body)
    res.status(201).json(newBook) 
})

const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString)
.then(() => console.log("Connected to mongo DB ^_^"))
.catch((error) => console.log(error))