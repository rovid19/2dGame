import { levelStore } from "../../Stores/LevelStore";

export const height = window.innerHeight;
export const width = window.innerWidth;

export const waitForCanvasToLoad = () => {
  let canvas: HTMLElement | null = null;
  const checkForCanvas = setInterval(() => {
    canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;
    if (canvas) {
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
}*/
