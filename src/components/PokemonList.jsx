import React from "react";
import PokemonCard from "./PokemonCard";
import PropTypes from "prop-types";

const PokemonList = ({ pokemons }) => {
  return (
    <div className="PokemonList">
      {pokemons.map(({ name, sprites, types, id, favorite }) => (
        <PokemonCard
          name={name}
          key={id} // Usar 'id' como clave única
          image={sprites.front_default}
          types={types}
          id={id}
          favorite={favorite}
        />
      ))}
    </div>
  );
};

// Definición de tipos de propiedades
PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sprites: PropTypes.shape({
        front_default: PropTypes.string,
      }).isRequired,
      types: PropTypes.arrayOf(PropTypes.object).isRequired,
      id: PropTypes.number.isRequired,
      favorite: PropTypes.bool.isRequired,
    })
  ),
};

PokemonList.defaultProps = {
  pokemons: [], // Cambiar a un array vacío como valor por defecto
};

export default PokemonList;
