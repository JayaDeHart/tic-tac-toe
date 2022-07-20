import { Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useCallback, useMemo } from 'react';

type Props = {
  winner: string | null;
  coords: any[];
  size: number;
  dimension: number;
};

const Strikethrough = (props: Props) => {
  const { winner, coords, size, dimension } = props;

  console.log(coords);

  const offset = useMemo(() => {
    return ((1 / dimension) * size) / 2;
  }, [coords, size, dimension]);

  const x1 = useMemo(() => {
    return (1 / dimension) * coords[0][1] * size;
  }, [coords, size, dimension]);

  const y1 = useMemo(() => {
    return (1 / dimension) * coords[0][0] * size;
  }, [coords, dimension, size]);

  const x2 = useMemo(() => {
    return (1 / dimension) * coords[1][1] * size;
  }, [coords, size, dimension]);

  const y2 = useMemo(() => {
    return (1 / dimension) * coords[1][0] * size;
  }, [coords, dimension, size]);

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      let color = 0;
      if (winner === 'x') {
        color = 0xff615f;
      } else {
        color = 0x3ec5f3;
      }
      g.lineStyle({ width: 10, color: color, alpha: 1 });
      g.moveTo(x1 + offset, y1 + offset);
      g.lineTo(x2 + offset, y2 + offset);
    },
    [coords, winner, size, dimension]
  );
  return <Graphics draw={draw} />;
};

export default Strikethrough;
