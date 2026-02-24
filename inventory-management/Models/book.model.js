const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    bookName: {
      type: String,
      required: [true, "Book Name is Required."],
      minlength: [3, "Book Name must be at least 3 characters long."],
    },
    countInStock: {
      type: Number,
      required: [true, "Count in Stock is Required."],
      min: [0, "Count in Stock cannot be 0."],
      max: [255, "Count in Stock cannot exceed 255."],
    },
    price: {
        type: Number,
        required: true,
        required: [true, "Price in Stock is Required."],
      min: [1, "Price in Stock cannot be Rupees 1."],
      max: [5000, "Price in Stock cannot exceed Rupees 5000."],
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default: "",
      validate: {
        validator: function(value) {
          if(!value) return true; // Allow empty string as valid
          return /^https?:\/\/.+/.test(value);
        },
        message: "Invalid URL format for image.",
      },
    }
  });

  bookSchema.virtual("id").get(function() {   //_id is converted into id and added to the response object
    return this._id.toHexString();
  });

  bookSchema.set("toJSON", {  //by default virtual is false hence set to true
    virtuals: true,
  });

  module.exports = mongoose.model("Book", bookSchema);