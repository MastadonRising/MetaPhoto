import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../../utils/API";

function PhotoRatings() {
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [newUpdate, setNewUpdate] = useState({});

  useEffect(() => {
    API.getPhotoInformation().then((response, err) => {
      if (err) {console.log(err)};
      setSavedPhotos(response.data);
    });
  }, [newUpdate]);

  function handleVoting(evt, type) {
    if (type === "up") {
      console.log(`♥‿♥`);
      API.updatePhotoLikes(evt.target.id, {
        typeOf: "like",
        userID: evt.target.id, // needs real userID
      }).then(() => {
        setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
      });
    } else {
      console.log(`(ಥ⌣ಥ)`);
      API.updatePhotoLikes(evt.target.id, {
        typeOf: "dislike",
        userID: evt.target.id, // needs real userID
      });
      setNewUpdate({ ...newUpdate }); // "tricking" it to refresh photoratings
    }
  }
  return (
    <div>
      {savedPhotos.length ? (
        savedPhotos.map((photo, index) => (
          <div key={index}>
            <img
              style={{ display: "block", maxWidth: "175px" }}
              src={photo.url}
              alt={photo.url}
            ></img>
            <button
              id={photo._id}
              onClick={(evt) => {
                handleVoting(evt, `up`);
              }}
            >
              <span
                id={photo._id}
                role="img"
                aria-label="Call Me Emoji"
                style={{ fontSize: "1.5rem" }}
              >
                {photo.likes.filter((i) => i.typeOf === "like").length} 🤙
              </span>
            </button>
            <button
              id={photo._id}
              onClick={(evt) => {
                handleVoting(evt, `down`);
              }}
            >
              <span
                id={photo._id}
                role="img"
                aria-label="Poo Emoji"
                style={{ fontSize: "1.5rem" }}
              >
                {photo.likes.filter((i) => i.typeOf === "dislike").length} 💩
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
