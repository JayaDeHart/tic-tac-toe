import { Stage } from '@inlet/react-pixi';
import { Container } from '@inlet/react-pixi';
import Grid from './Grid';
import GridContainer from './GridContainer';
import Strikethrough from './Strikethrough';
import { useEffect, useState } from 'react';
import { generateGrid, Tile } from '../util/generateGrid';
import findWinner from '../util/findWinner';
import { Results, StatusTypes } from '../util/findWinner';

type Props = {
  size: number;
};

const Game = (props: Props) => {
  const { size } = props;

  //begin here --------------------------------------------
  const [grid, setGrid] = useState<Tile[]>([]);
  const [results, setResults] = useState<Results>(
    new Results(StatusTypes.pending)
  );
  const [turn, setTurn] = useState('o');

  useEffect(() => {
    const newGrid = generateGrid(3, 3);
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    if (grid.length > 0) {
      const turnResults = findWinner(grid);
      setResults(turnResults);
    }
  }, [grid]);

  //the code in this block will be replaced with the server side data implementation
  //end here ----------------------------------------------

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
    <div className="flex justify-center align-middle">
      <Stage
        width={size}
        height={size}
        raf={false}
        renderOnComponentChange={true}
        options={{ backgroundAlpha: 0 }}
      >
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
        {results && results?.status == 'winner' && results.coords && (
          <Strikethrough
            winner={results.winner}
            coords={results.coords}
            size={size}
            dimension={grid[0].xLength}
          />
        )}
      </Stage>
    </div>
  );
};

export default Game;
