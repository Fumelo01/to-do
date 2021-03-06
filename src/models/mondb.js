const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required:true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true}
);

module.exports = mongoose.model('To do list', postSchema);
