import { useMemo } from 'react';
import { Tile } from '../util/generateGrid';
import { Container, Sprite } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

type Props = { tile: Tile; turn: string; size: number };

const GridContainer = (props: Props) => {
  const { turn, tile, size } = props;
  const { coords, value, xLength, yLength } = tile;

  //calculate x and y position based on coords and size
  //memoize them
  //assign them to x and y

  const x = useMemo(() => {
    return (1 / xLength) * coords[0] * size;
  }, [coords, size, xLength]);

  const y = useMemo(() => {
    return (1 / yLength) * coords[1] * size;
  }, [coords, yLength, size]);

  const height = useMemo(() => {
    return (1 / yLength) * size - 5;
  }, [yLength, size]);

  const width = useMemo(() => {
    return (1 / xLength) * size - 5;
  }, [yLength, size]);

  console.log(height);

  return (
    <Sprite
      x={x}
      y={y}
      image={'./xtransparent.png'}
      height={height}
      width={width}
      // texture={PIXI.Texture.EMPTY}
      interactive={true}
      mouseover={() => {}}
      mousedown={() => {
        console.log(tile);
      }}
      zIndex={-1}
    />
  );
};

export default GridContainer;
