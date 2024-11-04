import React from "react";
import { Card, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import Meta from "antd/lib/card/Meta";
import StarButton from "./StarButton";
import { setFavorite } from "../slices/dataSlice";
import PropTypes from "prop-types";
import "./PokemonList.css";

const PokemonCard = React.memo(({ name, image, types, id, favorite }) => {
  const dispatch = useDispatch();
  const typesString = types.map((elem) => elem.type.name).join(", ");

  const handleOnFavorite = () => {
    dispatch(setFavorite({ pokemonId: id }));
  };

  return (
    <div className="card-container">
      <Card
        className="rounded-card"
        title={<Tooltip title={typesString}>{name}</Tooltip>}
        cover={image ? <img src={image} alt={name} /> : <div>No Image</div>}
        extra={<StarButton isFavorite={favorite} onClick={handleOnFavorite} />}
      >
        <Meta description={typesString} />
      </Card>
    </div>
  );
});

// Definición de tipos de propiedades
PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default PokemonCard;
