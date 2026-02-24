const express = require("express");
const router = express.Router();
const bookModel = require("../Models/Book.model");

// To post data into database i.e., post request -START
router.post("/", async (req, res) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// To post data into database i.e., post request -END

// To fetch data from database i.e., get request -START
router.get("/", async (req, res) => {
  try {
    const bookList = await bookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// To fetch data from database i.e., get request -END

// To get data by params (id) -START
router.get("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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

  module.exports = router;
