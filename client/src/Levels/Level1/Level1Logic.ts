import { Vector2 } from "../../Classes/Vector";
import { Sprite } from "../../Classes/SpriteControl";
import { level1Generator } from "./Level1Generator";
import { LevelImages } from "../../Classes/LevelImages";
import { GameLoop } from "../../Classes/GameLoop";
import { Input, UP, DOWN, LEFT, RIGHT } from "../../Classes/Input";

const level1Images = new LevelImages({
  sky: "../public/sprites/sky.jpg",
  ground: "../public/sprites/ground.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
});

const skySprite = new Sprite(level1Images.images.sky, new Vector2(1920, 1080));

const groundSprite = new Sprite(
  level1Images.images.ground,
  new Vector2(1920, 1080)
);

const hero = new Sprite(level1Images.images.hero, new Vector2(32, 32), 3, 8, 1);
const heroPos = new Vector2(16 * 1, 16 * 2);

const input = new Input();

const update = () => {
  if (input.direction === UP) {
    heroPos.y -= 1;
    hero.frame = 6;
  }
  if (input.direction === DOWN) {
    heroPos.y += 1;
    hero.frame = 0;
  }
  if (input.direction === LEFT) {
    heroPos.x -= 1;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    heroPos.x += 1;
    hero.frame = 3;
  }
};

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

    skySprite.drawImage(canvasContext, 0, 0);
    groundSprite.drawImage(canvasContext, 0, 0);
    hero.drawImage(canvasContext, heroPos.x, heroPos.y);
  }
}

const waitForCanvasToLoad = () => {
  let canvas: HTMLElement | null = null;
  const checkForCanvas = setInterval(() => {
    canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;
    if (canvas) {
      clearInterval(checkForCanvas);
    }
  }, 1);
};
