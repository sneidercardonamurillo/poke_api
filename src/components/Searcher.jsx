import React, { useState, useEffect, useCallback } from "react";
import { Input, Card, message } from "antd";

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        if (!response.ok) throw new Error("Error al cargar los Pokémon");
        const data = await response.json();
        setAllPokemons(data.results);
      } catch (error) {
        message.error(error.message);
      }
    };

    loadPokemons();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm.length < 3) {
      setPokemonData([]);
      return;
    }

    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.startsWith(searchTerm.toLowerCase())
    );

    if (filteredPokemons.length > 0) {
      fetchPokemonDetails(filteredPokemons);
    } else {
      setPokemonData([]);
      message.error("Pokémon no encontrado");
    }
  }, [searchTerm, allPokemons]);

  const fetchPokemonDetails = useCallback(async (filteredPokemons) => {
    try {
      const detailsPromises = filteredPokemons.map((pokemon) =>
        fetch(pokemon.url).then((response) => {
          if (!response.ok)
            throw new Error("Error al cargar los detalles del Pokémon");
          return response.json();
        })
      );

      const details = await Promise.all(detailsPromises);
      setPokemonData(details);
    } catch (error) {
      message.error(error.message);
    }
  }, []);

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <Input.Search
        placeholder="Buscar Pokémon por nombre (mínimo 3 caracteres)..."
        style={{ marginBottom: 20 }}
        enterButton
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {pokemonData.map(({ id, name, sprites, types }) => (
        <Card
          key={id}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
          cover={
            <img
              alt={name}
              src={sprites.front_default}
              style={{ height: 120, objectFit: "contain" }}
            />
          }
          style={{
            borderRadius: 10,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginBottom: 20,
          }}
        >
          <Card.Meta
            description={`ID: ${id}`}
            style={{ textAlign: "center" }}
          />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <strong>Tipos:</strong>
            {types.map(({ type }) => (
              <span key={type.name} style={{ margin: "0 5px" }}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Searcher;
