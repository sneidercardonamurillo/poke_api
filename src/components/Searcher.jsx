import React, { useState } from "react";
import { Input, Card, message } from "antd";

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) {
      setPokemonData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      const data = await response.json();
      setPokemonData(data); // Solo se guarda el nuevo Pokémon buscado
    } catch (error) {
      if (error.message === "Pokémon no encontrado") {
        message.error(error.message);
      }
      setPokemonData(null); // Limpia los datos si hay un error
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <Input.Search
        placeholder="Buscar Pokémon..."
        style={{ marginBottom: 20 }}
        onSearch={handleSearch}
        enterButton
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {pokemonData && (
        <Card
          title={
            pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
          }
          cover={
            <img
              alt={pokemonData.name}
              src={pokemonData.sprites.front_default}
              style={{ height: 120, objectFit: "contain" }}
            />
          }
          style={{
            borderRadius: 10,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Card.Meta
            description={`ID: ${pokemonData.id}`}
            style={{ textAlign: "center" }}
          />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <strong>Tipos:</strong>
            {pokemonData.types.map((typeInfo) => (
              <span key={typeInfo.type.name} style={{ margin: "0 5px" }}>
                {typeInfo.type.name.charAt(0).toUpperCase() +
                  typeInfo.type.name.slice(1)}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Searcher;
