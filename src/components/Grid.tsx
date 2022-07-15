import { Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useCallback } from 'react';

type Props = {
  size: number;
};

const Grid = (props: Props) => {
  const { size } = props;
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.lineStyle({ width: 10, color: 0x000000, alpha: 1 });
      // vertical lines
      g.moveTo(size / 3, 0);
      g.lineTo(size / 3, size);
      g.moveTo((size / 3) * 2, 0);
      g.lineTo((size / 3) * 2, size);

      //horizonal lines
      g.moveTo(0, size / 3);
      g.lineTo(size, size / 3);
      g.moveTo(0, (size / 3) * 2);
      g.lineTo(size, (size / 3) * 2);
    },
    [size]
  );
  return <Graphics draw={draw} zIndex={2} />;
};

export default Grid;
