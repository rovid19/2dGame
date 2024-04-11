import { Vector2 } from "../../Classes/Vector.ts";
import { Sprite } from "../../Classes/Sprite.ts";
import { levelGenerator } from "../levelGenerator.ts";
import { LevelImages } from "../../Classes/LevelImages.ts";
import { animationLoop } from "../../Classes/AnimationLoop.ts";
import { Input } from "../../Classes/PlayerInput.ts";
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
import { Hud } from "../../Classes/Hud.ts";
import { Player } from "../../Classes/Player.ts";

export let canvasContext: CanvasRenderingContext2D;

const levelImages = new LevelImages({
  sky: "../public/sprites/5.png",
  ground: "../public/sprites/groundLevel1.png",
  hero: "../public/sprites/hero-sheet.png",
  shadow: "../public/sprites/shadow.png",
  playerShip: "../public/sprites/2.png",
  speed: "../public/sprites/speed.png",
  shield: "../public/sprites/shield-1.png",
  projectile: "../public/sprites/1.png",
  enemy1: "../public/sprites/enemy1.png",
  enemy2: "../public/sprites/enemy2.png",
});

//
//
// LOADING SPRITES
const skySprite = new Sprite(
  levelImages.images.sky,
  new Vector2(width, height),
  1
);

export const shield = new Sprite(
  levelImages.images.shield,
  new Vector2(61, 61),
  2
);

export const projectile = new Sprite(
  levelImages.images.projectile,
  new Vector2(32, 32),
  2
);

/*const shipSteeringEffect = new Sprite(
  levelImages.images.speed,
  new Vector2(
    levelImages.images.speed.image.width,
    levelImages.images.speed.image.height
  ),
  1
);*/

export const player = new Player(levelImages.images.playerShip, 34, 38, 2);

export const shipPosition = new Vector2(height - 100, width / 2 - 38);

export const enemyArray: EnemyObject[] = [];

//
//
//
export const projectiles = new Projectile(shipPosition);
projectiles.updateProjectileBaseCoordinates();

export let enemy1 = new Enemy(1.5, levelImages.images.enemy1, 24, 27, 2.5);
enemy1.updateEnemyCoordinates(enemy1.enemySprite.position);
enemy1.createDetailsAboutEnemy("basic", enemy1.enemySprite.scale);
enemy1.renderHealthBar();

export let enemy2 = new Enemy(2, levelImages.images.enemy2, 51, 56, 2);
enemy2.updateEnemyCoordinates(enemy2.enemySprite.position);
enemy2.createDetailsAboutEnemy("basic2", enemy2.enemySprite.scale);

enemy2.renderHealthBar();

export let enemy3 = new Enemy(1.2, levelImages.images.enemy1, 24, 27, 2.5);
enemy3.updateEnemyCoordinates(enemy3.enemySprite.position);
enemy3.createDetailsAboutEnemy("basic", enemy3.enemySprite.scale);
enemy3.renderHealthBar();

export const HUD = new Hud();
player.setHpBar(HUD.hpBarFiller);
//
//
//
// Player movement + spells
export const playerMovementInput = new Input();

//
//
//
// Main render loop
const renderLevelLoop = new animationLoop(
  playerMovementInput.playerInput,
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

    playerMethods();
    renderProjectiles();
    renderPlayerSpaceship();
    renderEnemy();
  }
}

function playerMethods() {
  projectiles.reloadProjectile();
  player.activateSpell();
  player.playerSpells.activateSpellCooldown();
  player.checkIfHitByAnEnemy();
}
