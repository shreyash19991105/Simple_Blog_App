import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/HomePage.css";

const HomePage = () => {
  // const navigate = useNavigate();
  const [readList, setReadList] = useState([]);

  useEffect(() => {
    const getUserReadingList = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts`);
        setReadList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserReadingList();
  }, []);
  return (
    <>
      <div className="container">
        {readList.map((entry, index) => {
          return (
            <div key={entry.id || index} className="post-container">
              <div>{entry.title}</div>
              <div>{entry.content}</div>
              <div>{entry.author}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
