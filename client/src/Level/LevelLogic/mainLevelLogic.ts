import { Vector2 } from "../../Classes/Vector.ts";
import { Sprite } from "../../Classes/SpriteControl.ts";
import { levelGenerator } from "../levelGenerator.ts";
import { LevelImages } from "../../Classes/LevelImages.ts";
import { animationLoop } from "../../Classes/AnimationLoop.ts";
import {
  Input,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  PlayerSpells,
} from "../../Classes/PlayerInput.ts";
import {
  drawImageToFillCanvasSize,
  height,
  waitForCanvasToLoad,
  width,
} from "./canvasLogic.ts";
import { renderPlayerSpaceship } from "./spaceshipLogic.ts";

import { Projectile } from "../../Classes/Projectile.ts";

export let canvasContext: CanvasRenderingContext2D;

const level1Images = new LevelImages({
  sky: "../public/sprites/5.png",
  ground: "../public/sprites/groundLevel1.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
  playerShip: "../public/sprites/2.png",
  speed: "../public/sprites/speed.png",
  projectile: "../public/sprites/1.png",
});

//
//
// LOADING SPRITES
const skySprite = new Sprite(
  level1Images.images.sky,
  new Vector2(width, height)
);

export const projectile = new Sprite(
  level1Images.images.projectile,
  new Vector2(32, 32)
);
projectile.scale = 2;

const shipSteeringEffect = new Sprite(
  level1Images.images.speed,
  new Vector2(
    level1Images.images.speed.image.width,
    level1Images.images.speed.image.height
  )
);

export const groundSprite = new Sprite(
  level1Images.images.ground,
  new Vector2(width, height)
);

export const playerShip = new Sprite(
  level1Images.images.playerShip,
  new Vector2(34, 38)
);
playerShip.scale = 2;

export const shipPosition = new Vector2(height - 100, width / 2 - 38);

export let projectiles = new Projectile();
projectiles.updateProjectileBaseCoordinates();

//
//
//
// Player movement + spells
export const playerMovementInput = new Input();
const playerSpellInput = new PlayerSpells();

export const playerMovement = () => {
  if (playerSpellInput.spell === "P") {
    if (shipPosition.y > 40) {
      projectiles.fireProjectile();
    }
  }
  if (playerMovementInput.direction === UP) {
    shipPosition.y -= 10;
  }
  if (playerMovementInput.direction === DOWN) {
    shipPosition.y += 10;
  }
  if (playerMovementInput.direction === LEFT) {
    shipPosition.x -= 10;
  }
  if (playerMovementInput.direction === RIGHT) {
    shipPosition.x += 10;
  }
};

//
//
//
// Main render loop
const renderLevelLoop = new animationLoop(playerMovement, renderLevel);
renderLevelLoop.start();

export const generateLevel = (): void => {
  document.body.appendChild(levelGenerator());
};

export function renderLevel() {
  const canvas = document.querySelector(".level1Canvas") as HTMLCanvasElement;

  if (!canvas) {
    waitForCanvasToLoad();
  } else {
    canvas.height = height;
    canvas.width = width;
    canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

    drawImageToFillCanvasSize(
      width,
      height,
      canvasContext,
      skySprite.resource.image
    );

    renderPlayerSpaceship();
  }
}
