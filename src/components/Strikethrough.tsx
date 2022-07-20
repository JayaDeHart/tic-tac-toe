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
  const { coords, size, dimension } = props;

  const offset = useMemo(() => {
    return ((1 / dimension) * size) / 2;
  }, [size, dimension]);

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
      g.lineStyle({ width: 10, color: 0x000000, alpha: 1 });
      g.moveTo(x1 + offset, y1 + offset);
      g.lineTo(x2 + offset, y2 + offset);
    },
    [offset, x1, x2, y1, y2]
  );
  return <Graphics draw={draw} />;
};

export default Strikethrough;
