const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

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

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
});
bookModel = mongoose.model("Book", bookSchema);

// To post data into database i.e., post request -START
app.post("/books", async (req, res) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// To post data into database i.e., post request -END

// To fetch data from database i.e., get request -START
app.get("/books", async (req, res) => {
  try {
    const bookList = await bookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// To fetch data from database i.e., get request -END

// To get data by params (id) -START
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    if(!book) {
        return res.status(404).json({ message: "Book Not Found." });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// To get data by params (id) -END

// To delete data by params (id) -START
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await bookModel.findByIdAndDelete(id);
    if(!deleteBook) {
        return res.status(404).json({ message: "Book Not Found." });
    }
    res.status(200).json({ message: "Books Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// To delete data by params (id) -END

// To update data by params (id) -START
app.put("/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateBook = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
      if(!updateBook) {
          return res.status(404).json({ message: "Book Not Found." });
      }
      res.status(200).json({ message: "Books Updated Successfully.", updateBook });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  // To update data by params (id) -END

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

const connectionString = process.env.CONNECTION_STRING;

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to mongo DB ^_^"))
  .catch((error) => console.log(error));
