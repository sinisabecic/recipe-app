import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let { name } = useParams();

  const [recipe, setRecipe] = useState({});
  const [extendedIngredients, setExtendedIngredients] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");

  //! React ima svoj regex za html
  // const getSummary = (data) => {
  //   if (!data) return;
  //   data = data.replace(/(<([^>]+)>)/gi, "");
  //   return data;
  // };

  useEffect(() => {
    getRecipe(name);
  }, []);

  const getRecipe = async (recipeId) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setRecipe(res.data);
        setExtendedIngredients(res.data.extendedIngredients);
        console.log(res.data);
        console.log(res.data.extendedIngredients);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <DetailWrapper>
        <div>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <Info>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
          {activeTab === "instructions" && (
            <div>
              <h2 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h2>
              <h2
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></h2>
            </div>
          )}

          {activeTab === "ingredients" && (
            <ul>
              {extendedIngredients.map((ingredient) => {
                return (
                  <li key={ingredient.id}>
                    <span>{ingredient.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    </div>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right 2rem;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
