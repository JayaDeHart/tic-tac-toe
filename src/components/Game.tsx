import { Stage } from '@inlet/react-pixi';
import Grid from './Grid';
import GridContainer from './GridContainer';
import Strikethrough from './Strikethrough';
import { useEffect, useState } from 'react';
import { generateGrid, Tile } from '../util/generateGrid';
import findWinner from '../util/findWinner';
import { Results, StatusTypes } from '../util/findWinner';
import React from 'react';

type Props = {
  size: number;
};

const Game = (props: Props) => {
  const { size } = props;

  const [grid, setGrid] = useState<Tile[]>([]);
  const [results, setResults] = useState<Results>(
    new Results(StatusTypes.pending)
  );
  const [turn, setTurn] = useState('o');
  const [sizeSelector, setSizeSelector] = useState(3);
  const [inGame, setIngame] = useState(false);

  useEffect(() => {
    if (grid.length > 0) {
      const turnResults = findWinner(grid);
      if (turnResults.status === StatusTypes.draw) {
        setGrid([]);
        setIngame(false);
      } else {
        setResults(turnResults);
      }
    }
  }, [grid]);

  function bindInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSizeSelector(parseInt(event.currentTarget.value));
  }

  function createGame() {
    const newGrid = generateGrid(sizeSelector, sizeSelector);
    setGrid(newGrid);
    setIngame(true);
  }

  function updateGrid(tile: Tile, value: string) {
    const newGrid = grid.map((old: Tile) => {
      if (JSON.stringify(tile.coords) === JSON.stringify(old.coords)) {
        return new Tile(old.coords, old.xLength, old.yLength, value);
      } else {
        return old;
      }
    });
    setGrid(newGrid);
    if (turn === 'o') {
      setTurn('x');
    }
    if (turn === 'x') {
      setTurn('o');
    }
  }

  return (
    <div className="p-4">
      {!inGame && <h1 className="text-3xl text-gray-800">Tic Tac Toe</h1>}
      {!inGame && (
        <h4 className="text-gray-800">Select a size and start playing!</h4>
      )}
      <div className="flex justify-center align-middle">
        <Stage width={size} height={size} options={{ backgroundAlpha: 0 }}>
          {grid.length > 0 && <Grid size={size} dimension={grid[0].xLength} />}

          {grid.map((tile) => (
            <GridContainer
              tile={tile}
              turn={turn}
              size={size}
              key={JSON.stringify(tile.coords)}
              updateGrid={updateGrid}
            />
          ))}
          {inGame &&
            results &&
            results?.status === 'winner' &&
            results.coords && (
              <Strikethrough
                winner={results.winner}
                coords={results.coords}
                size={size}
                dimension={grid[0].xLength}
              />
            )}
        </Stage>
        {inGame && results.status === StatusTypes.winner && (
          <div className="flex-col align-middle justify-center">
            <h1 className="text-2xl text-gray-800">{results.winner} wins!</h1>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                setIngame(false);
                setGrid([]);
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
      {!inGame && (
        <div className="flex-col align-middle justify-center">
          <span className="text-gray-800 font-semibold py-2 px-4">Size: </span>
          <input
            className="text-gray-800 font-semibold py-2 px-4"
            name="size"
            type="number"
            min={3}
            max={10}
            value={sizeSelector}
            onChange={bindInput}
          />
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={createGame}
          >
            Create game!
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
