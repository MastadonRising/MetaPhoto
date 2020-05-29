import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";

function PhotoRatings() {
  const [newRatings, setNewRatings] = useState({ likes: 0, dislikes: 1 });
  // removes loader when image ready to render
  useEffect(() => {
    API.getPhotoInformation().then((response, err) => {
      if (err) throw err;
      setNewRatings(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(newRatings);
  }, [newRatings]);

  function handleVoting(type) {
    if (type === "up") {
      // setNewRatings({ ...userRatings, likes: userRatings.likes++ });
      console.log(`♥‿♥`);
    } else {
      // setNewRatings({ ...userRatings, dislikes: userRatings.dislikes++ });
      console.log(`(ಥ⌣ಥ)`);
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          handleVoting(`up`);
        }}
      >
        <span
          role="img"
          aria-label="Call Me Emoji"
          style={{ fontSize: "3rem" }}
        >
          🤙
        </span>
      </button>
      <button
        onClick={() => {
          handleVoting(`down`);
        }}
      >
        <span role="img" aria-label="Poo Emoji" style={{ fontSize: "3rem" }}>
          💩
        </span>
      </button>
    </div>
  );
}

export default PhotoRatings;
