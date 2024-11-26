import axios from "axios";
import { useState } from "react";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState(""); // to display success or error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Send the POST request to the backend API
      console.log(title, content, author);
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title,
          content,
          author,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setMessage("Post created successfully!");
        setTitle(""); // Clear the form fields
        setContent("");
        setAuthor("");
      } else {
        setMessage("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("An error occurred while creating the post");
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePostPage;
