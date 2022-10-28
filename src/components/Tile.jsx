import React from "react";
import { Motion, spring } from "react-motion";
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from "./Constants";

import { getMatrixPosition, getVisualPosition } from "./Helper";

const Tile = (props) => {
  // console.log(props);

  const { tile, index, width, height, handleTileClick, imgUrl } = props;
  const { row, col } = getMatrixPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);

  const tileStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${
      (100 / (GRID_SIZE - 1)) * Math.floor(tile / GRID_SIZE)
    }%`,
  };

  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y),
  };

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style=
          {{
            ...tileStyle,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Is last tile?
            opacity: tile === TILE_COUNT - 1 ? 0 : 1,
          }}
          className="tile" onClick={() => handleTileClick(index)}>
          {!imgUrl && `${tile + 1}`}
        </li>
      )}
    </Motion>
  );
};

export default Tile;
