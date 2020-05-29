import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import UserRatingsContext from "../../utils/UserRatingsContext";
import API from "../../utils/API";

function UserRatings() {
  const { userRatings } = useContext(UserRatingsContext);
  const [newRatings, setNewRatings] = useState(userRatings);
  useEffect(() => {
    // do something here, perhaps
    console.log(userRatings);
    API.createUser({
      firstName: "Gus",
      lastName: "Valenzuela",
      email: "fake@fakemail.com",
      hardestClimb: "Life",
    });
  }, []);

  function handleVoting(type) {
    if (type === "up") {
      setNewRatings({ ...userRatings, likes: userRatings.likes++ });
      console.log(`♥‿♥`, userRatings);
    } else {
      setNewRatings({ ...userRatings, dislikes: userRatings.dislikes++ });
      console.log(`(ಥ⌣ಥ)`, userRatings);
    }
  }

  return (
    <UserRatingsContext.Provider value={newRatings}>
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
    </UserRatingsContext.Provider>
  );
}

export default UserRatings;
