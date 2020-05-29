import { createContext } from "react";

const UserRatingsContext = createContext({
  userID: "",
  userRatings: {
    likes: 0,
    dislikes: 0,
  },
  updateLikeSystem: () => undefined,
});

export default UserRatingsContext;
