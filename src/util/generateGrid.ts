export class Tile {
  coords: Array<number>;
  value: string;
  xLength: number;
  yLength: number;

  constructor(
    coords: Array<number>,
    xLength: number,
    yLength: number,
    value: string = 'blank'
  ) {
    this.coords = coords;
    this.value = value;
    this.xLength = xLength;
    this.yLength = yLength;
  }
}

export function generateGrid(xDim: number, yDim: number) {
  const output: Tile[] = [];
  for (let x = 0; x < xDim; x++) {
    for (let y = 0; y < yDim; y++) {
      output.push(new Tile([y, x], xDim, yDim));
    }
  }

  return output;
}
