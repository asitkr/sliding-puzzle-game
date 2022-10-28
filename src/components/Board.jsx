import React from 'react';
import { useState } from 'react';
import { BOARD_SIZE, GRID_SIZE, TILE_COUNT } from './Constants';
import { canSwap, isSolved, shuffle, swap } from './Helper';
import Tile from './Tile';

const Board = ({ imgUrl }) => {

    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState(false);

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);

    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
    }

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles);
        setTiles(shuffledTiles);
    }

    const swapTiles = (tileIndex) => {
        if(canSwap(tileIndex, tiles.indexOf(tiles.length - 1))){
            const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1));
            setTiles(swappedTiles);
        }
    }

    const handleTileClick = (index) => {
        swapTiles(index);
    }

    const handleShuffleClick = () => {
        shuffleTiles();
    }

    const handleStartClick = () => {
        shuffleTiles()
        setIsStarted(true);
    }

    const hasWon = isSolved(tiles)

    return (
        <>
            <ul style={style} className='board'>
                {
                    tiles.map((tile, index) => (
                        <Tile
                        key={tile}
                        index={index}
                        imgUrl={imgUrl}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleTileClick={handleTileClick} />
                    ))
                }
            </ul>
            { hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
            {
                !isStarted ?
                    (<button onClick={() => handleStartClick()}>Start Game</button>) :
                    (<button onClick={() => handleShuffleClick()}>Restart Game</button>)
            }
        </>
    )
}

export default Board;