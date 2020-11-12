import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import BigTweetDetails from "./BigTweetDetails";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import GlobalStyle from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <BigTweetDetails />
          </Route>
          <Route path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default App;
