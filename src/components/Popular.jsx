import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { RecipeContext } from "../contexts/RecipeContext";
import { Link } from "react-router-dom";

const Popular = () => {
  //? Ovo je sve moj nacin, da se radi po Reduceru i Context API-ju
  const { recipesRandom } = useContext(RecipeContext);

  const [popular, setPopular] = useState(recipesRandom);

  useEffect(() => {
    getPopular();

    console.log("Random popular recipes:");
    console.log(popular);
  }, []);

  const getPopular = async () => {
    // const check = localStorage.getItem("recipesRandom");

    //moze i if(!recipesRandom). Svejedno je
    if (!popular) {
      await axios
        .get(
          `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setPopular(
            localStorage.setItem(
              "recipesRandom",
              JSON.stringify(res.data.recipes)
            )
          );

          //   console.log(localStorage.getItem("recipesRandom"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {popular &&
            popular.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <Card>
                    <Link to={`/recipe/${recipe.id}`}>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title} />
                      <Gradient />
                    </Link>
                  </Card>
                </SplideSlide>
              );
            })}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: #fff;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
