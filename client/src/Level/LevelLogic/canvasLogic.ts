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
