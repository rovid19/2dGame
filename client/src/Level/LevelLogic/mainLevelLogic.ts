import { Vector2 } from "../../Classes/Vector.ts";
import { Sprite } from "../../Classes/Sprite.ts";
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
import { renderProjectiles } from "./projectileLogic.ts";
import { Enemy } from "../../Classes/EnemyAi.ts";
import { renderEnemy } from "./enemyLogic.ts";
import { EnemyObject } from "../../Utils/TsTypes.ts";

export let canvasContext: CanvasRenderingContext2D;

const levelImages = new LevelImages({
  sky: "../public/sprites/5.png",
  ground: "../public/sprites/groundLevel1.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
  playerShip: "../public/sprites/2.png",
  speed: "../public/sprites/speed.png",
  projectile: "../public/sprites/1.png",
  enemy1: "../public/sprites/enemy1.png",
  enemy2: "../public/sprites/enemy2.png",
});

//
//
// LOADING SPRITES
const skySprite = new Sprite(
  levelImages.images.sky,
  new Vector2(width, height)
);

export const projectile = new Sprite(
  levelImages.images.projectile,
  new Vector2(32, 32)
);
projectile.scale = 2;

const shipSteeringEffect = new Sprite(
  levelImages.images.speed,
  new Vector2(
    levelImages.images.speed.image.width,
    levelImages.images.speed.image.height
  )
);

export const groundSprite = new Sprite(
  levelImages.images.ground,
  new Vector2(width, height)
);

export const playerShip = new Sprite(
  levelImages.images.playerShip,
  new Vector2(34, 38)
);
playerShip.scale = 2;

export const enemyArray: EnemyObject[] = [];
/*
export const enemy1Sprite = new Sprite(
  level1Images.images.enemy1,
  new Vector2(24, 27)
);
enemy1Sprite.scale = 2.5;
enemyArray.push({ ...enemy1Sprite.position, isAlive: false });

export const enemy3Sprite = new Sprite(
  level1Images.images.enemy1,
  new Vector2(24, 27)
);
enemy3Sprite.scale = 2;
enemyArray.push(enemy3Sprite.position);

export const enemy2Sprite = new Sprite(
  level1Images.images.enemy2,
  new Vector2(51, 56)
);
enemy2Sprite.scale = 2;
console.log(enemy2Sprite.spriteImage.image.width * 2);
enemyArray.push(enemy2Sprite.position);
*/
export const shipPosition = new Vector2(height - 100, width / 2 - 38);

//
//
//
export let projectiles = new Projectile();
projectiles.updateProjectileBaseCoordinates();

export let enemy1 = new Enemy(1.5, levelImages.images.enemy1, 24, 27);
enemy1.updateEnemyCoordinates(enemy1.sprite.position);
enemy1.createHitboxForEnemy("basic", enemy1.sprite.scale);
enemy1.renderHealthBar();

export let enemy2 = new Enemy(2, levelImages.images.enemy2, 51, 56);
enemy2.updateEnemyCoordinates(enemy2.sprite.position);
enemy2.createHitboxForEnemy("basic2", enemy2.sprite.scale);

enemy2.renderHealthBar();

export let enemy3 = new Enemy(1.2, levelImages.images.enemy1, 24, 27);
enemy3.updateEnemyCoordinates(enemy3.sprite.position);

//
//
//
// Player movement + spells
export const playerMovementInput = new Input();
export const playerSpellInput = new PlayerSpells();

export const playerMovement = () => {
  if (playerSpellInput.spell === "P") {
    if (shipPosition.y > 40) {
      projectiles.targetHit = false;
      projectiles.fireProjectile();
    }
  }
  if (playerMovementInput.direction === UP) {
    shipPosition.y -= 10;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
  }
  if (playerMovementInput.direction === DOWN) {
    shipPosition.y += 10;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
  }
  if (playerMovementInput.direction === LEFT) {
    shipPosition.x -= 10;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
  }
  if (playerMovementInput.direction === RIGHT) {
    shipPosition.x += 10;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
  }
};

//
//
//
// Main render loop
const renderLevelLoop = new animationLoop(
  playerMovementInput.playerMovement,
  renderLevel
);
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
      skySprite.spriteImage.image
    );

    renderProjectiles();
    renderPlayerSpaceship();
    renderEnemy();
  }
}
