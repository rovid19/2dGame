export function returnArrayOfHitboxNumbers(
  currentPosition: number,
  hitbox: number,
  hitboxArray: number[],
  newCurrentPosition: number
) {
  for (let i = 0; i < hitbox; i++) {
    hitboxArray.push(currentPosition);
    currentPosition--;
  }

  for (let i = 0; i < hitbox; i++) {
    hitboxArray.push(newCurrentPosition);
    newCurrentPosition++;
  }
}
