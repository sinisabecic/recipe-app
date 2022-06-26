import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Searched = () => {
  let { search } = useParams();

  const [searched, setSearched] = useState([]);

  useEffect(() => {
    if (search) {
      const timeoutId = setTimeout(() => !!search && getReceipt(search), 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [search]);

  const getReceipt = async (name) => {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
      )
      .then((res) => {
        setSearched(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Wrapper>
        <Grid>
          {searched &&
            searched.map((recipe) => {
              return (
                <Link to={`/recipe/${recipe.id}`}>
                  <Card key={recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                    <h4>{recipe.title}</h4>
                  </Card>
                </Link>
              );
            })}
        </Grid>
      </Wrapper>
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  a {
    text-decoration: none;
  }
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

export default Searched;
