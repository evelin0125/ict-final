const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

require('./connection'); // Make sure this file connects to MongoDB

app.use(express.json());
app.use(cors());

const Blog = require("./model");

// ✅ POST API to add a blog
app.post("/add", async (req, res) => {
  try {
    const newBlog = new Blog(req.body); // Correct instantiation
    await newBlog.save(); // Await saving
    res.status(201).send("Blog added successfully!");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ GET API to fetch all blogs
app.get("/get", async (req, res) => {
  try {
    const data = await Blog.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ DELETE API to delete a blog by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send("Blog deleted successfully!");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ PUT API to update a blog by ID
app.put("/update/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send("Blog updated successfully!");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
