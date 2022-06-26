import { useNavigate } from "react-router-dom";
import Category from "./components/Category";
import Search from "./components/Search";
import { RecipeContextProvider } from "./contexts/RecipeContext";
import Pages from "./pages/Pages";

function App() {
  let navigate = useNavigate("");
  return (
    <div>
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Food Recipes App
      </h1>

      <RecipeContextProvider>
        <Search />
        <Category />
        <Pages />
      </RecipeContextProvider>
    </div>
  );
}

export default App;
