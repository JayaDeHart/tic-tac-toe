import { Tile } from './generateGrid';
import _ from 'lodash';

export enum StatusTypes {
  'pending' = 'pending',
  'winner' = 'winner',
  'draw' = 'draw,',
}

enum WinnerTypes {
  'x' = 'x',
  'y' = 'y',
}

export class Results {
  status: StatusTypes;
  coords: Array<number> | null;
  winner: WinnerTypes | null;

  constructor(
    status: StatusTypes,
    coords: any[] | null = null,
    winner: WinnerTypes | null = null
  ) {
    this.status = status;
    this.coords = coords;
    this.winner = winner;
  }
}

export default function findWinner(grid: Tile[]) {
  let moves = 0;
  grid.forEach((tile: Tile) => {
    if (tile.value !== 'blank') {
      moves++;
    }
  });

  if (moves > grid[0].xLength * grid[0].xLength) {
    return new Results(StatusTypes.draw);
  }

  const copy = _.cloneDeep(grid);

  const { xLength, yLength } = copy[0];

  const twoD: any[] = [];

  for (let x = 0; x < copy.length / xLength; x++) {
    twoD.push([]);
  }
  let row = 0;
  while (copy.length > 0) {
    for (let x = 0; x < xLength; x++) {
      twoD[row].push(copy.shift()?.value);
    }
    row++;
  }
  //twoD is now a correct representation of the 2d board state

  //now we check for horizontal winners
  for (let i = 0; i < twoD.length; i++) {
    const winner = [];
    for (let j = 0; j < twoD[i].length; j++) {
      winner.push(twoD[i][j]);
      if (winner.length > 3) {
        winner.shift();
      }
      if (winner.join('') === 'xxx' || winner.join('') === 'ooo') {
        return new Results(
          StatusTypes.winner,
          [
            [i, j - 2],
            [i, j],
          ],
          winner[0]
        );
      }
    }
  }
  //now we check for vertical winners
  for (let i = 0; i < twoD[0].length; i++) {
    const winner = [];
    for (let j = 0; j < twoD.length; j++) {
      winner.push(twoD[j][i]);
      if (winner.length > 3) {
        winner.shift();
      }
      if (winner.join('') === 'xxx' || winner.join('') === 'ooo') {
        return new Results(
          StatusTypes.winner,
          [
            [j - 2, i],
            [j, i],
          ],
          winner[0]
        );
      }
    }
  }

  //top left bottom right

  for (let i = 0; i <= 2 * (xLength - 1); i++) {
    const winner = [];
    const coords = [];
    for (let j = yLength - 1; j >= 0; j--) {
      let x = i - (yLength - j);
      if (x >= 0 && x < yLength) {
        winner.push(twoD[j][x]);
        coords.push([j, x]);
        if (winner.length > 3) {
          winner.shift();
        }
        if (coords.length > 3) {
          coords.shift();
        }
        if (winner.join('') === 'xxx' || winner.join('') === 'ooo') {
          return new Results(
            StatusTypes.winner,
            [coords[0], coords[2]],
            winner[0]
          );
        }
      }
    }
  }

  //top right bottom left

  for (let i = 0; i <= 2 * (xLength - 1); i++) {
    const winner = [];
    const coords = [];
    for (let j = xLength - 1; j >= 0; --j) {
      let x = i - j;
      if (x >= 0 && x < xLength) {
        winner.push(twoD[j][x]);
        coords.push([j, x]);
        if (winner.length > 3) {
          winner.shift();
        }
        if (coords.length > 3) {
          coords.shift();
        }
        if (winner.join('') === 'xxx' || winner.join('') === 'ooo') {
          return new Results(
            StatusTypes.winner,
            [coords[0], coords[2]],
            winner[0]
          );
        }
      }
    }
  }
  return new Results(StatusTypes.pending);
}
