import { Stage } from '@inlet/react-pixi';
import { Container } from '@inlet/react-pixi';
import Grid from './Grid';
import GridContainer from './GridContainer';
import { useEffect, useState } from 'react';
import { generateGrid, Tile } from '../util/generateGrid';

type Props = {
  size: number;
};

const Game = (props: Props) => {
  const { size } = props;

  //begin here --------------------------------------------
  const [grid, setGrid] = useState<Tile[]>([]);
  const [turn, setTurn] = useState('X');

  useEffect(() => {
    const newGrid = generateGrid(3, 3);
    setGrid(newGrid);
  }, []);

  //the code in this block will be replaced with the server side data implementation
  //end here ----------------------------------------------

  console.log(grid);

  return (
    <div className="flex justify-center align-middle">
      <Stage
        width={size}
        height={size}
        raf={false}
        renderOnComponentChange={true}
        options={{ backgroundAlpha: 0 }}
      >
        <Container>
          <Grid size={size} />
          {grid.map((tile) => (
            <GridContainer
              tile={tile}
              turn={turn}
              size={size}
              key={JSON.stringify(tile.coords)}
            />
          ))}
        </Container>
      </Stage>
    </div>
  );
};

export default Game;
