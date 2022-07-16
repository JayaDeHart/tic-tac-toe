import { Tile } from './generateGrid';

export default function findWinner(grid: Tile[]) {
  //given an array of objects with
  //{
  //coords: [x,y]
  //value: x | o
  //}
  //determine if there are any three tiles of the same value in a straight line
  //if so, return an array with the coordinates of the start and end of the winning line
  //if not, but a winner is still possible, return 'pending'
  //if not and a winner is not possible, return 'draw'

  enum StatusTypes {
    'pending' = 'pending',
    'winner' = 'winner',
    'draw' = 'draw,',
  }

  enum WinnerTypes {
    'x' = 'x',
    'y' = 'y',
  }

  class Results {
    status: StatusTypes;
    coords: Array<number>;
    winner: WinnerTypes;

    constructor(status: StatusTypes, coords: any[], winner: WinnerTypes) {
      this.status = status;
      this.coords = coords;
      this.winner = winner;
    }
  }

  const { xLength, yLength } = grid[0];

  const twoD: any[] = [];

  for (let x = 0; x < grid.length / xLength; x++) {
    twoD.push([]);
  }
  let row = 0;
  while (grid.length > 0) {
    for (let x = 0; x < xLength; x++) {
      twoD[row].push(grid.shift()?.value);
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

  //now we check for diagonal winners
}
