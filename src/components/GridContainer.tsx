import { useMemo, useState } from 'react';
import { Tile } from '../util/generateGrid';
import { Container, Sprite, useTick } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

type Props = {
  tile: Tile;
  turn: string;
  size: number;
  updateGrid: (tile: Tile, value: string) => void;
};

const GridContainer = (props: Props) => {
  const [child, setChild] = useState(false);
  const { turn, tile, size, updateGrid } = props;
  const { coords, value, xLength, yLength } = tile;
  const [rotation, setRotation] = useState(0);

  useTick((delta) => delta && setRotation(rotation + 0.025 * delta));

  //calculate x and y position based on coords and size
  //memoize them
  //assign them to x and y
  const offset = useMemo(() => {
    return (1 / xLength) * size * 0.5;
  }, [xLength, size]);

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
  }, [xLength, size]);

  const isDefault = useMemo(() => {
    return value === 'blank';
  }, [value]);

  const hArea = new PIXI.Rectangle(x, y, width, height);

  if (isDefault) {
    return (
      <Container
        hitArea={hArea}
        interactive={true}
        pointerover={() => {
          if (tile.value === 'blank') {
            setChild(true);
          }
        }}
        pointerout={() => {
          if (tile.value === 'blank') {
            setChild(false);
          }
        }}
        mousedown={() => {
          updateGrid(tile, turn);
        }}
      >
        {child && (
          <Sprite
            anchor={0.5}
            x={x + offset}
            y={y + offset}
            height={height}
            width={width}
            image={`./${turn}transparent.png`}
            rotation={rotation}
          />
        )}
      </Container>
    );
  } else {
    return (
      <Sprite
        x={x}
        y={y}
        height={height}
        width={width}
        image={`./${value}.png`}
      />
    );
  }
};

export default GridContainer;
