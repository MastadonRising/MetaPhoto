import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";

function PhotoRatings() {
  const [newRatings, setNewRatings] = useState([]);
  const [newUpdate, setNewUpdate] = useState({});

  useEffect(() => {
    API.getPhotoInformation().then((response, err) => {
      if (err) throw err;
      setNewRatings(response.data);
    });
  }, [newUpdate]);

  function handleVoting(evt, type) {
    if (type === "up") {
      console.log(`♥‿♥`);
      API.updatePhoto(evt.target.id, {
        upLikes: Number(evt.target.dataset.uplikes) + 1,
      }).then(() => {
        setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
      });
    } else {
      console.log(`(ಥ⌣ಥ)`);
      API.updatePhoto(evt.target.id, {
        downLikes: Number(evt.target.dataset.downlikes) + 1,
      });
      setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
    }
  }

  return (
    <div>
      {newRatings.length ? (
        newRatings.map((photo) => (
          <div>
            <img
              style={{ display: "block", maxWidth: "175px" }}
              src={photo.url}
              alt={photo.url}
            ></img>
            <button
              id={photo._id}
              data-uplikes={photo.upLikes}
              data-downlikes={photo.downLikes}
              onClick={(evt) => {
                handleVoting(evt, `up`);
              }}
            >
              <span
                id={photo._id}
                data-uplikes={photo.upLikes}
                data-downlikes={photo.downLikes}
                role="img"
                aria-label="Call Me Emoji"
                style={{ fontSize: "1.5rem" }}
              >
                {photo.upLikes} 🤙
              </span>
            </button>
            <button
              id={photo._id}
              data-uplikes={photo.upLikes}
              data-downlikes={photo.downLikes}
              onClick={(evt) => {
                handleVoting(evt, `down`);
              }}
            >
              <span
                id={photo._id}
                data-uplikes={photo.upLikes}
                data-downlikes={photo.downLikes}
                role="img"
                aria-label="Poo Emoji"
                style={{ fontSize: "1.5rem" }}
              >
                {photo.downLikes} 💩
              </span>
            </button>
          </div>
        ))
      ) : (
        <p>NO PHOTOS FOUND IN DATABASE</p>
      )}
    </div>
  );
}

export default PhotoRatings;
