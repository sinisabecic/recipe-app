import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const Cuisine = () => {
  let { type } = useParams();

  const [cuisine, setCuisine] = useState([]);

  useEffect(() => {
    getCuisine(type);

    console.log(type + " recipes:");
  }, [type]);

  const getCuisine = async (name) => {
    // if (!veggie) {
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
      )
      .then((res) => {
        setCuisine(res.data.results);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    // }
  };

  return (
    <div>
      <Wrapper>
        <h3>{type} Cuisine</h3>

        <Grid>
          {cuisine &&
            cuisine.map((recipe) => {
              return (
                <Card key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} />
                  <h4>{recipe.title}</h4>
                </Card>
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

export default Cuisine;
