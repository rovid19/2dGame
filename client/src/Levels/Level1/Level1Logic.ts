import { Vector2 } from "../../Classes/Vector";
import { Sprite } from "../../Classes/SpriteControl";
import { level1Generator } from "./Level1Generator";
import { LevelImages } from "../../Classes/LevelImages";
import { GameLoop } from "../../Classes/GameLoop";
import { Input, UP, DOWN, LEFT, RIGHT } from "../../Classes/Input";

const height = window.innerHeight;
const width = window.innerWidth;

const level1Images = new LevelImages({
  sky: "../public/sprites/5.png",
  ground: "../public/sprites/groundLevel1.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
  playerShip: "../public/sprites/2.png",
});

const skySprite = new Sprite(
  level1Images.images.sky,
  new Vector2(width, height)
);

const groundSprite = new Sprite(
  level1Images.images.ground,
  new Vector2(width, height)
);

const playerShip = new Sprite(
  level1Images.images.playerShip,
  new Vector2(34, 38)
);
playerShip.scale = 2;

const hero = new Sprite(level1Images.images.hero, new Vector2(32, 32), 3, 8, 1);
const heroPos = new Vector2(height - 100, width / 2 - 38);

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
    canvas.height = height;
    canvas.width = width;
    const canvasContext = canvas.getContext("2d");
    drawImageToCanvasSize(
      width,
      height,
      canvasContext,
      skySprite.resource.image
    );
    //skySprite.drawImage(canvasContext, 0, 0);
    //groundSprite.drawImage(canvasContext, 0, 0);
    //hero.drawImage(canvasContext, heroPos.x, heroPos.y);
    playerShip.drawImage(canvasContext, heroPos.x, heroPos.y);
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

function drawImageToCanvasSize(
  canvasWidth: number,
  canvasHeight: number,
  canvasContext: any,
  image: HTMLImageElement
) {
  const imageWidth = image.width;
  const imageHeight = image.height;

  const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
  console.log(scale);
  const width = imageWidth * scale;
  const height = imageHeight * scale;

  const x = canvasWidth / 2 - width / 2;
  const y = canvasHeight / 2 - height / 2;

  canvasContext.drawImage(image, x, y, width, height);
}
