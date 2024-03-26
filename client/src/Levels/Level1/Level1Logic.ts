import { Vector2 } from "../../Classes/Vector";
import { Sprite } from "../../Classes/SpriteControl";
import { level1Generator } from "./Level1Generator";
import { LevelImages } from "../../Classes/LevelImages";
import { GameLoop } from "../../Classes/GameLoop";
import { Input, UP, DOWN, LEFT, RIGHT } from "../../Classes/Input";
import { isOutside } from "../../Utils/TsTypes";
let canvasContext: any;
const height = window.innerHeight;
const width = window.innerWidth;

const level1Images = new LevelImages({
  sky: "../public/sprites/5.png",
  ground: "../public/sprites/groundLevel1.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
  playerShip: "../public/sprites/2.png",
  speed: "../public/sprites/speed.png",
});

const skySprite = new Sprite(
  level1Images.images.sky,
  new Vector2(width, height)
);

const shipSteeringEffect = new Sprite(
  level1Images.images.speed,
  new Vector2(
    level1Images.images.speed.image.width,
    level1Images.images.speed.image.height
  )
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
    heroPos.y -= 10;
    playerShip.drawEffectOnSprite(
      groundSprite.resource.image,
      canvasContext,
      heroPos.x,
      heroPos.y
    );
  }
  if (input.direction === DOWN) {
    heroPos.y += 10;
    playerShip.drawEffectOnSprite(
      groundSprite.resource.image,
      canvasContext,
      heroPos.x,
      heroPos.y
    );
  }
  if (input.direction === LEFT) {
    heroPos.x -= 10;
    playerShip.drawEffectOnSprite(
      groundSprite.resource.image,
      canvasContext,
      heroPos.x,
      heroPos.y
    );
  }
  if (input.direction === RIGHT) {
    heroPos.x += 10;
    playerShip.drawEffectOnSprite(
      groundSprite.resource.image,
      canvasContext,
      heroPos.x,
      heroPos.y
    );
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
    canvasContext = canvas.getContext("2d");

    drawImageToFillCanvasSize(
      width,
      height,
      canvasContext,
      skySprite.resource.image
    );
    //skySprite.drawImage(canvasContext, 0, 0);
    //groundSprite.drawImage(canvasContext, 0, 0);
    //hero.drawImage(canvasContext, heroPos.x, heroPos.y);
    renderPlayerSpaceship();
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

function drawImageToFillCanvasSize(
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

function renderPlayerSpaceship() {
  stopSpaceshipFromGoingOutsideOfScreen();
  //isSpaceshipOutsideOfTheScreen()
}

function stopSpaceshipFromGoingOutsideOfScreen() {
  // prva 4 ifa proveravaju gornji lijevi, donji lijevi, gornji desni i donji desni kut jer za ta 4 kuta trebam 2 conditiona ispunjavat
  if (heroPos.x < 0 && heroPos.y < 0) {
    if (input.direction === "LEFT" || input.direction === "UP") {
      input.direction = "";
    }
    playerShip.drawImage(canvasContext, 0, 0);
  } else if (heroPos.y >= height - 34 * 2 && heroPos.x < 0) {
    if (input.direction === "LEFT" || input.direction === "DOWN") {
      input.direction = "";
    }
    playerShip.drawImage(canvasContext, 0, height - 34 * 2);
  } else if (heroPos.y < 0 && heroPos.x >= width - 38 * 2) {
    if (input.direction === "RIGHT" || input.direction === "UP") {
      input.direction = "";
    }
    playerShip.drawImage(canvasContext, width - 38 * 2, 0);
  } else if (heroPos.y >= height - 34 * 2 && heroPos.x >= width - 38 * 2) {
    if (input.direction === "RIGHT" || input.direction === "DOWN") {
      input.direction = "";
    }
    playerShip.drawImage(canvasContext, width - 38 * 2, height - 34 * 2);
  } else if (heroPos.x < 0) {
    if (input.direction === "LEFT") input.direction = "";
    playerShip.drawImage(canvasContext, 0, heroPos.y);
  } else if (heroPos.x >= width - 38 * 2) {
    if (input.direction === "RIGHT") input.direction = "";
    playerShip.drawImage(canvasContext, width - 38 * 2, heroPos.y);
  } else if (heroPos.y < 0) {
    if (input.direction === "UP") input.direction = "";
    playerShip.drawImage(canvasContext, heroPos.x, 0);
  } else if (heroPos.y >= height - 34 * 2) {
    if (input.direction === "DOWN") input.direction = "";
    playerShip.drawImage(canvasContext, heroPos.x, height - 34 * 2);
  } else {
    playerShip.drawImage(canvasContext, heroPos.x, heroPos.y);
  }
}

const ifSpaceshipIsOutsideOfTheScreenReturnAnObject = (): isOutside => {
  let isOutside = {
    isOutside: false,
    onWhichSide: "",
    position: "",
  };

  if (heroPos.x + 38 * 2 < 0) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "left";
    isOutside.position = "x";
    return isOutside;
  } else if (heroPos.x > width) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "right";
    isOutside.position = "x";
    return isOutside;
  } else if (heroPos.y + 34 * 2 < 0) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "up";
    isOutside.position = "y";
    return isOutside;
  } else if (heroPos.y > height) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "down";
    isOutside.position = "y";
    return isOutside;
  }

  return isOutside;
};
function isSpaceshipOutsideOfTheScreen() {
  /*const isOutside = ifSpaceshipIsOutsideOfTheScreenReturnAnObject();
  //console.log("width", heroPos.x, width, "height", heroPos.y, height);
  //console.log(isOutside);
  if (isOutside.isOutside) {
    if (isOutside.position === "x") {
      if (isOutside.onWhichSide === "left") {
        console.log("left", isOutside);
        playerShip.drawImage(canvasContext, heroPos.x + width + 38, heroPos.y);
      } else {
        console.log("right", isOutside);
        playerShip.drawImage(canvasContext, heroPos.x - width - 38, heroPos.y);
      }
    } else {
      if (isOutside.onWhichSide === "up") {
        console.log("up", isOutside);
        playerShip.drawImage(canvasContext, heroPos.x, heroPos.y + height + 34);
      } else {
        ("down", isOutside);
        playerShip.drawImage(canvasContext, heroPos.x, heroPos.y - height - 34);
      }
    }
  } */
}
