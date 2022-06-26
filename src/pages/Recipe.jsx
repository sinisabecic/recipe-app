import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let { name } = useParams();

  const [recipe, setRecipe] = useState({});

  //   const regex = /(<([^>]+)>)/gi;
  //   const result = recipe.summary.replace(regex, "");

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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Wrapper>
        <h3>{recipe.title}</h3>

        <Grid>
          <Card key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.summary}</p>
          </Card>
        </Grid>
      </Wrapper>
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  img {
    border-radius: 2rem;
    width: 100%;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Recipe;
