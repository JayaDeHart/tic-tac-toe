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

  //take every 'xLength' tiles from the array
  //put them in their own array
  //push that array to 2d

  const { xLength } = grid[0];

  const twoD = [];
  grid.forEach((tile: Tile) => {});
}
