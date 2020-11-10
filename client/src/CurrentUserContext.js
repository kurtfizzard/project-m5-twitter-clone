import React, { useContext, useEffect } from "react";

export const CurrentUserContext = React.createContext(null);

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  // Fetch the user data from the API (/me/profile)
  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((res) => {
        // When the data is received, update currentUser.
        setCurrentUser(res.profile);
        // Also, set `status` to `idle`
        setStatus("idle");
      })
      .catch((error) => console.log(error));
  }, []);

  // const handleFetch = async () => {
  //   let response = await fetch("/api/me/profile", {
  //     headers: { accepts: "application/json" },
  //   });
  //   response = await response.json();
  //   setCurrentUser(res);
  //   setStatus("idle");
  // };

  // handleFetch();

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
