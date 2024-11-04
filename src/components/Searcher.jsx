import React, { useState, useEffect } from "react";
import { Input, Card, message } from "antd";

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    // Cargar todos los Pokémon al inicio
    const loadPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      ); // Carga los primeros 1000 Pokémon
      const data = await response.json();
      setAllPokemons(data.results);
    };

    loadPokemons();
  }, []);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setPokemonData([]); // Limpia los datos si hay menos de 3 caracteres
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

  const fetchPokemonDetails = async (filteredPokemons) => {
    const detailsPromises = filteredPokemons.map((pokemon) =>
      fetch(pokemon.url).then((response) => response.json())
    );

    const details = await Promise.all(detailsPromises);
    setPokemonData(details);
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <Input.Search
        placeholder="Buscar Pokémon..."
        style={{ marginBottom: 20 }}
        enterButton
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.id}
          title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          cover={
            <img
              alt={pokemon.name}
              src={pokemon.sprites.front_default}
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
            description={`ID: ${pokemon.id}`}
            style={{ textAlign: "center" }}
          />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <strong>Tipos:</strong>
            {pokemon.types.map((typeInfo) => (
              <span key={typeInfo.type.name} style={{ margin: "0 5px" }}>
                {typeInfo.type.name.charAt(0).toUpperCase() +
                  typeInfo.type.name.slice(1)}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Searcher;
