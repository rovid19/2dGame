import { Vector2 } from "./Sprite/Vector.ts";
import { Sprite } from "./Sprite/Sprite.ts";
import { backgroundGenerator, levelGenerator } from "../levelGenerator.ts";
import { LevelImages } from "./Sprite/LevelImages.ts";
import { animationLoop } from "./Other/AnimationLoop.ts";
import {
  drawImageToFillCanvasSize,
  height,
  waitForCanvasToLoad,
  width,
} from "./Other/canvasLogic.ts";
import { Projectile } from "./Player/Projectile.ts";

import { EnemyObject } from "../../../Utils/TsTypes.ts";
import { Hud } from "./Game UI/Hud.ts";
import { Player } from "./Player/Player.ts";
import { EnemySpawner } from "./Enemy/EnemySpawner.ts";
import { Menu } from "./Game UI/InGameMenu.ts";
import { PowerUp } from "./Game UI/PowerUp.ts";
import { Asteroid } from "./Enemy/Asteroid.ts";
import { Sounds } from "./Other/Sounds.ts";
import { keydown } from "../../MainMenu/MainMenuLogic.ts";

export let canvasContext: CanvasRenderingContext2D;
export let canvasContext2: CanvasRenderingContext2D;

export const levelImages = new LevelImages({
  // PLAYER SHIPS
  playerShip1: "../public/sprites/spaceship/spaceship1.png",
  playerShip2: "../public/sprites/spaceship/spaceship2.png",
  playerShip3: "../public/sprites/spaceship/spaceship3.png",

  // BACKGROUNDS
  background1: "../public/sprites/background/primary.png",
  background2: "../public/sprites/background/primary2.png",
  background3: "../public/sprites/background/primary3.png",
  background4: "../public/sprites/background/primary4.png",
  background5: "../public/sprites/background/primary5.png",

  // SPELLS
  spellShield: "../public/sprites/spells/spellShield.png",
  spellWalls: "../public/sprites/spells/spellWalls.png",
  spellExplosion: "../public/sprites/spells/spellExplosion.png",

  // PROJECTILES
  projectile1: "../public/sprites/projectiles/projectile1.png",
  projectile2: "../public/sprites/projectiles/projectile2.png",
  projectile3: "../public/sprites/projectiles/projectile3.png",

  // ENEMIES
  enemy1: "../public/sprites/enemies/enemy1.png",
  enemy2: "../public/sprites/enemies/enemy2.png",
  enemy3: "../public/sprites/enemies/enemy3.png",
  enemy4: "../public/sprites/enemies/enemy4.png",

  // METEORS
  meteor1: "../public/sprites/enemies/meteor1.png",
  meteor2: "../public/sprites/enemies/meteor2.png",
  meteor3: "../public/sprites/enemies/meteor3.png",
  meteor4: "../public/sprites/enemies/meteor4.png",
});

// AUDIO
export const inGameSounds = new Sounds();

//
//
// LOADING SPRITES
const backgroundSprite = new Sprite(
  levelImages.images.background1,
  new Vector2(width, height),
  1
);

export const shield = new Sprite(
  levelImages.images.spellShield,
  new Vector2(61, 61),
  2
);

// Player
export const player = new Player(levelImages.images.playerShip1, 34, 38, 2);
export const shipPosition = new Vector2(height - 100, width / 2 - 38);
export const defaultRenderPosition = {
  x: 0 + Math.random() * (width - 0),
  y: -100,
};

// Enemies
export const enemyArray: EnemyObject[] = [];
export const enemySpawner = new EnemySpawner();
export const asteroid = new Asteroid(
  levelImages.images.meteor1,
  new Vector2(100, 200),
  2,
  defaultRenderPosition
);

//
//
//
export const projectiles = new Projectile(
  shipPosition,
  levelImages.images.projectile1,
  32,
  32,
  1.2
);
projectiles.updateProjectileBaseCoordinates();

// HUD SETUP
export let menu: any;
export let powerUp: any;
export let HUD: any;

export function setHud() {
  menu = new Menu();
  powerUp = new PowerUp();
  HUD = new Hud();
  player.setHpBar(HUD.hpBarFiller);
}

//
//
//
// Main render loop
const renderLevelLoop = new animationLoop(
  player.playerInput.playerInput,
  renderLevel
);
renderLevelLoop.start();

export const generateLevel = (): void => {
  document.body.appendChild(backgroundGenerator());
  document.body.appendChild(levelGenerator());
};

export function renderLevel() {
  const canvas = document.querySelector(
    ".background-canvas"
  ) as HTMLCanvasElement;
  const canvas2 = document.querySelector(".level-canvas") as HTMLCanvasElement;

  if (!canvas && !canvas2) {
    waitForCanvasToLoad();
  } else {
    canvas.height = height;
    canvas.width = width;
    canvas2.height = height;
    canvas2.width = width;

    canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvasContext2 = canvas2.getContext("2d") as CanvasRenderingContext2D;

    drawImageToFillCanvasSize(
      width,
      height,
      canvasContext,
      backgroundSprite.spriteImage.image
    );

    projectiles.renderProjectile();
    player.renderPlayerSpaceship();
    enemySpawner.renderEnemies();
    /*asteroid.asteroidSprite.drawImage(canvasContext2, 200, 300);
    ("vidljivi", asteroid);
    enemySpawner.asteroidArray.forEach((asteroid) => {
      console.log(asteroid);
      asteroid.asteroidSprite.drawImage(canvasContext2, 200, 500);
    });*/

    playerMethods();
  }
}

function playerMethods() {
  projectiles.reloadProjectile();
  player.playerSpells.renderSpells();
  player.checkIfHitByAnEnemy();
  player.checkIfPlayerIsDead();
  player.gainExpForMultipleEnemies();
  powerUp.openPowerUpIfQueueExists();
  //menu.openMenu();
  projectiles.autoFire();
}


