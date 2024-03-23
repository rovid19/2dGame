import { Vector2 } from "three";
import { Sprite } from "../../Canvas/SpriteControl";
import { level1Generator } from "./Level1Generator";
import { LevelImages } from "../../Canvas/Resources";
import { GameLoop } from "../../Canvas/GameLoop";

const level1Images = new LevelImages({
  sky: "../public/sprites/sky.jpg",
  ground: "../public/sprites/ground.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
});

const skySprite = new Sprite(level1Images.images.sky, new Vector2(320, 180));

const groundSprite = new Sprite(
  level1Images.images.ground,
  new Vector2(320, 180)
);

const hero = new Sprite(level1Images.images.hero, new Vector2(32, 32), 3, 8, 1);
const heroPos = new Vector2(16 * 5, 16 * 2);

const update = () => {};

const gameLoop = new GameLoop(update, drawLevel1);
gameLoop.start();

export const generateLevel1 = (): void => {
  document.body.appendChild(level1Generator());
};

export function drawLevel1() {
  const canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;
  if (!canvas) {
    waitForCanvasToLoad();
  } else {
    const canvasContext = canvas.getContext("2d");

    console.log(level1Images);
    skySprite.drawImage(canvasContext, 0, 0);
    groundSprite.drawImage(canvasContext, 0, 0);
    hero.drawImage(canvasContext, heroPos.x, heroPos.y);
  }
}

const waitForCanvasToLoad = () => {
  let canvas: HTMLElement | null = null;
  const checkForCanvas = setInterval(() => {
    console.log("1");
    canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;
    if (canvas) {
      clearInterval(checkForCanvas);
    }
  }, 1);
};
