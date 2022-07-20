import { Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useCallback } from 'react';

type Props = {
  size: number;
  dimension: number;
};

const Grid = (props: Props) => {
  const { size, dimension } = props;
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.lineStyle({ width: 10, color: 0x000000, alpha: 1 });
      // vertical lines
      for (let x = 1; x < dimension; x++) {
        g.moveTo((size / dimension) * x, 0);
        g.lineTo((size / dimension) * x, size);
      }

      //horizonal lines
      for (let x = 1; x < dimension; x++) {
        g.moveTo(0, (size / dimension) * x);
        g.lineTo(size, (size / dimension) * x);
      }
    },
    [size]
  );
  return <Graphics draw={draw} />;
};

export default Grid;
