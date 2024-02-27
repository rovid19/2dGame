import { levelResources } from "../../Utils/Resources";
import { level1Generator } from "./Level1Generator";

export const generateLevel1 = (): void => {
  document.body.appendChild(level1Generator());

  setInterval(() => {
    drawLevel1();
  }, 300);
};

const drawLevel1 = (): void => {
  const canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;
  const canvasContext = canvas.getContext("2d");
  console.log(levelResources);
  const sky = levelResources.images.sky;

  if (sky.isLoaded) {
    canvasContext?.drawImage(sky.image, 0, 0);
  }
};
