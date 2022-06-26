import { Link } from "react-router-dom";
import styled from "styled-components";
import Category from "./components/Category";
import Search from "./components/Search";
import { RecipeContextProvider } from "./contexts/RecipeContext";
import Pages from "./pages/Pages";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>Food Recipes</Logo>
      </Nav>

      <RecipeContextProvider>
        <Search />
        <Category />
        <Pages />
      </RecipeContextProvider>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;

export default App;
