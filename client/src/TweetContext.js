import React, { useContext, useEffect } from "react";

export const TweetContext = React.createContext(null);

export const useTweet = () => useContext(TweetContext);

export const TweetProvider = ({ children }) => {
  return <></>;
};
