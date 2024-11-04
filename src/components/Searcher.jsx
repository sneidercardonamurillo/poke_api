import React, { useState } from "react";
import { Input, List, message } from "antd";

const Searcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        message.error(error.message);
        setPokemonData(null);
      }
    }
  };

  return (
    <div>
      <Input.Search
        placeholder="Buscar Pokémon..."
        style={{ marginBottom: 10 }}
        onSearch={handleSearch}
        enterButton
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {pokemonData && (
        <List
          header={<div>Resultado de búsqueda:</div>}
          bordered
          dataSource={[pokemonData]}
          renderItem={(item) => (
            <List.Item>
              <div>
                <strong>{item.name}</strong>
                <img
                  src={item.sprites.front_default}
                  alt={item.name}
                  style={{ marginLeft: 10 }}
                />
              </div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Searcher;
