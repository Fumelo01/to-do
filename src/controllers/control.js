const Post = require("../models/mondb.js");
const express = require("express");
const { json } = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose")
const book = mongoose.model('To do list', exports.postSchema);
app.use(json());


exports.example = (req, res) => {
  console.log("Sucessfully reached the Home-page")
  res.sendFile(path.join(__dirname, '../models', '/home.html'));
  //__dirname : It will resolve to your project folder.
};




//fetching all available tasks with paginatiom
exports.list = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await Post.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
};



//creating a task
exports.postTask = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  try {
    let savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(404).json({message: err});
  }
};



//fetching a single task
exports.fetchTask = async(req, res) => {
  book.findOne({_id: req.params.id}, async (err, post)=> {
    if (!post){
      console.log({Error: `Oops! _id: ${req.params.id} does not exist `})
      res.status(400).json({Error: `Oops! _id: ${req.params.id} does not exist `})
    } else if (post) {
     // let books =await book.find()
     // console.log(books)
      console.log({Success: `The task with id: ${req.params.id} has been found`})
      return res.status(200).json({Task: post})
    } else if(err){
      console.log({msg: err})
      return res.status(500).json({Error : err})
    }

  })
}



//updating a task
exports.editTask = async (req, res) => {
  try {
    const id = {_id : req.params.id}
    let edit = await req.body
    let update = await book.findOneAndUpdate(id, edit, {new: true})
    if(!update) {
      console.log({Error: `Oops! _id: ${req.params.id} does not exist `})
      res.status(400).json({Error: `Oops! _id: ${req.params.id} does not exist `})
    } else if (update){
      console.log({success: `Task with _id: ${req.params.id} has been successfully updated`})
      res.send({success:`Task has been successfully updated`, Update: update})
    }
  } catch {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}



//deleting a task
exports.delTask = async (req, res) => {
  try {
    let id = {_id : req.params.id}
    let deleted = await book.findOneAndDelete(id)
    if (!deleted) {
      console.log({Error: `Oops! _id: ${req.params.id} does not exist `})
      res.status(400).json({Error: `Oops! _id: ${req.params.id} does not exist `})
    } else if (deleted) {
      console.log({success: `Task with _id: ${req.params.id} has been successfully deleted`})
      res.json({success: `Task with _id: ${req.params.id} has been successfully deleted`})
    }
  } catch (err) {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}
