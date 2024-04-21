import { levelStore } from "../../Stores/LevelStore";

export const height = window.innerHeight;
export const width = window.innerWidth;

export const waitForCanvasToLoad = () => {
  let canvas: HTMLElement | null = null;
  let canvas2: HTMLElement | null = null;
  const checkForCanvas = setInterval(() => {
    canvas = document.querySelector(".background-canvas") as HTMLCanvasElement;
    canvas2 = document.querySelector(".level-canvas") as HTMLCanvasElement;
    if (canvas && canvas2) {
      clearInterval(checkForCanvas);
      levelStore.set("isCanvasReady", true);
    }
  }, 1);
};

export function drawImageToFillCanvasSize(
  canvasWidth: number,
  canvasHeight: number,
  canvasContext: any,
  image: HTMLImageElement
) {
  const imageWidth = image.width;
  const imageHeight = image.height;

  const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);

  const width = imageWidth * scale;
  const height = imageHeight * scale;

  const x = canvasWidth / 2 - width / 2;
  const y = canvasHeight / 2 - height / 2;

  canvasContext.drawImage(image, x, y, width, height);
}

//fisher yates shuffle alogirthm
/*export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    console.log(j);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateUniqueNumbers(arrayLength: number): number[] {
  const array = [] as number[];

  while (array.length < arrayLength) {
    const randomNumber = Math.floor(Math.random() * arrayLength);
    if (!array.includes(randomNumber)) array.push(randomNumber);
  }
  return array;
}

export function generateId(idLength: number): string {
  const randomLettersAndNumbers = "qweidnvs21njdn1298dnasp1sijdi";
  const randomLetterAndNumberArray = randomLettersAndNumbers.split("");
  let newIdArray = [];

  for (let i = 0; i < idLength; i++) {
    const randomNumber = Math.floor(Math.random() * 26);
    newIdArray.push(randomLetterAndNumberArray[randomNumber]);
  }

  return newIdArray.join("");
}
*/
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
