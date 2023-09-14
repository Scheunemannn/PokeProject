/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeletons } from "../components/Skeletons";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {

    var endPoints = []
    
    for ( var i = 1;  i < 500; i++){
        endPoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }
    
    axios.all(endPoints.map((endPoint) =>  axios.get(endPoint))).then((res) => setPokemons(res))

  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if(name==="") {
      getPokemons()
    }
    for(var i in pokemons) {
      if(pokemons[i].data.name.includes(name)){
        filteredPokemons.push(pokemons[i])
      }
    }
    setPokemons(filteredPokemons)
  }

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter}/>
      <Container maxWidth="false">
      <Grid container spacing={3}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                  <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                </Box>
              </Grid>
            ))
          )}
        </Grid>

      </Container>
    </div>
  );
};
