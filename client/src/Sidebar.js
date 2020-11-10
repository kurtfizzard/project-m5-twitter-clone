import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import styled from "styled-components";
import { COLORS } from "./Constants";
import { useCurrentUser } from "./CurrentUserContext";

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  return (
    <Container>
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
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 30%;
`;

const NavigationLink = styled(NavLink)`
  color: black;
  font-weight: bold;
  padding: 15px;
  text-decoration: none;

  &.active {
    color: ${COLORS.primary};
  }

  // DOESN'T WORK
  &:hover {
    background-color: whitesmoke;
    color: ${COLORS.primary};
  }
`;

const CatLogo = styled(Logo)`
  width: 50px;
`;

const Span = styled.span`
  margin-left: 10px;
`;

const Meow = styled.button`
  background: ${COLORS.primary};
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  height: 30px;
  width: 75%;
`;
