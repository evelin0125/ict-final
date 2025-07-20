import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state; 

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (blog) {
      setInputs(blog); 
    }
  }, [blog]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (blog) {
      // === Update Mode ===
      axios
        .put(`http://localhost:3001/update/${blog._id}`, inputs)
        .then((res) => {
          alert("Updated successfully");
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      // === Add Mode ===
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert("Added successfully");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Title"
            name="title"
            value={inputs.title}
            onChange={inputHandler}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            name="content"
            value={inputs.content}
            onChange={inputHandler}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Image URL"
            name="img_url"
            value={inputs.img_url}
            onChange={inputHandler}
            fullWidth
          />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {blog ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
