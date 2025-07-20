//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )
//Write your code here
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (blog) => {
    navigate(`/add/${blog._id}`, { state: blog });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Blog List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              borderRadius: "8px",
              width: "300px",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={blog.img_url}
              alt="Blog"
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(blog._id)}
              style={{ marginRight: "10px" }}
            >
              Delete
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleUpdate(blog)}>
              Update
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
