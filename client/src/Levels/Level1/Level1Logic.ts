import { Vector2 } from "three";
import { Sprite } from "../../Canvas/SpriteControl";
import { level1Generator } from "./Level1Generator";
import { LevelImages } from "../../Canvas/Resources";

const level1Images = new LevelImages(
  {
    sky: "../public/sprites/sky.jpg",
    ground: "../public/sprites/ground.png",
    hero: "../public/sprites/hero-sheet.png",
    shadow: "../public/sprites/shadow.png",
  },
  drawLevel1
);

const skySprite = new Sprite(level1Images.images.sky, new Vector2(320, 180));

const groundSprite = new Sprite(
  level1Images.images.ground,
  new Vector2(320, 180)
);

const hero = new Sprite(level1Images.images.hero, new Vector2(32, 32), 3, 8, 1);
const heroPos = new Vector2(16 * 5, 16 * 2);

export const generateLevel1 = (): void => {
  document.body.appendChild(level1Generator());
};

export function drawLevel1() {
  const canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;
  const canvasContext = canvas.getContext("2d");

  skySprite.drawImage(canvasContext, 0, 0);
  groundSprite.drawImage(canvasContext, 0, 0);
  hero.drawImage(canvasContext, heroPos.x, heroPos.y);
}
