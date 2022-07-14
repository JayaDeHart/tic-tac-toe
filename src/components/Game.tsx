import { Container, Stage } from '@inlet/react-pixi';
import Grid from './Grid';
import GridContainer from './GridContainer';

type Props = {
  size: number;
};

const Game = (props: Props) => {
  const { size } = props;
  return (
    <div className="flex justify-center align-middle">
      <Stage
        width={size}
        height={size}
        raf={false}
        renderOnComponentChange={true}
        options={{ backgroundAlpha: 0 }}
      >
        <Grid size={size} />
      </Stage>
    </div>
  );
};

export default Game;
