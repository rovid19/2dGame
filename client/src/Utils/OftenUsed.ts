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

export function generateArrayWithUniqueNumbers(
  amountOfNumbers: number,
  upTo: number
): number[] {
  const unqiueNumberArray = [] as number[];

  while (unqiueNumberArray.length < amountOfNumbers) {
    const randomNumber = Math.floor(Math.random() * (upTo + 1));
    if (!unqiueNumberArray.includes(randomNumber)) {
      unqiueNumberArray.push(randomNumber);
    }
  }

  return unqiueNumberArray;
}
