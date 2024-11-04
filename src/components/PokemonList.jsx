import React from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

const PokemonList = ({ pokemons }) => {
  return (
    <div className="PokemonList">
      {pokemons.map((pokemon) => (
        <div className="PokemonCard" key={pokemon.name}>
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            types={pokemon.types}
            id={pokemon.id}
            favorite={pokemon.favorite}
          />
        </div>
      ))}
    </div>
  );
};

PokemonList.defaultProps = {
  pokemons: Array(10).fill(""),
};

export default PokemonList;
