import { useMemo } from 'react';
import { Tile } from '../util/generateGrid';
import { Container, Sprite } from '@inlet/react-pixi';

type Props = { tile: Tile; turn: string; size: number };

const GridContainer = (props: Props) => {
  const { turn, tile, size } = props;
  const { coords, value, xLength, yLength } = tile;

  //calculate x and y position based on coords and size
  //memoize them
  //assign them to x and y

  const x = useMemo(() => {
    return (1 / xLength) * coords[0] * size;
  }, [coords]);

  const y = useMemo(() => {
    return (1 / yLength) * coords[1] * size;
  }, [coords]);

  return (
    <Container
      x={x}
      y={y}
      interactive={true}
      mousedown={() => {
        console.log(tile);
      }}
    />
  );
};

export default GridContainer;
