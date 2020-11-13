import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import styled from "styled-components";
import { COLORS } from "./Constants";
import { useCurrentUser } from "./CurrentUserContext";
import { IconContext } from "react-icons";

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  return (
    <Container>
      <IconContext.Provider value={{ size: "1.5em" }}>
        <CatLogo />
        <NavigationLink exact to="/">
          <FiHome />
          <Span>Home</Span>
        </NavigationLink>
        <NavigationLink to={`/${currentUser?.handle}`}>
          <FiUser />
          <Span>Profile</Span>
        </NavigationLink>
        <NavigationLink to="/notifications">
          <FiBell />
          <Span>Notifications</Span>
        </NavigationLink>
        <NavigationLink to="/bookmarks">
          <FiBookmark />
          <Span>Bookmarks</Span>
        </NavigationLink>
        <Meow>Meow</Meow>
      </IconContext.Provider>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  border-top: 2px solid ${COLORS.secondary};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const NavigationLink = styled(NavLink)`
  align-items: center;
  color: black;
  display: flex;
  font-size: 1.2em;
  font-weight: bold;
  padding-right: 40px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-top: 10px;
  text-decoration: none;

  &.active {
    color: ${COLORS.primary};
  }

  &:hover {
    background-color: ${COLORS.secondary};
    color: ${COLORS.primary};
  }
`;

const CatLogo = styled(Logo)`
  padding-left: 20px;
`;

const Span = styled.span`
  margin-left: 20px;
`;

const Meow = styled.button`
  background: ${COLORS.primary};
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  height: 40px;
  margin-left: 20px;
  margin-top: 10px;
  padding-bottom: 5px;
  width: 85%;

  &:hover {
    cursor: pointer;
  }
`;
