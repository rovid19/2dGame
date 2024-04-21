import { Vector2 } from "../../Classes/Vector.ts";
import { Sprite } from "../../Classes/Sprite.ts";
import { backgroundGenerator, levelGenerator } from "../levelGenerator.ts";
import { LevelImages } from "../../Classes/LevelImages.ts";
import { animationLoop } from "../../Classes/AnimationLoop.ts";
import { Input } from "../../Classes/PlayerInput.ts";
import {
  drawImageToFillCanvasSize,
  height,
  waitForCanvasToLoad,
  width,
} from "./canvasLogic.ts";
import { Projectile } from "../../Classes/Projectile.ts";

import { EnemyObject } from "../../Utils/TsTypes.ts";
import { Hud } from "../../Classes/Hud.ts";
import { Player } from "../../Classes/Player.ts";
import { EnemySpawner } from "../../Classes/EnemySpawner.ts";
import { Menu } from "../../Classes/InGameMenu.ts";
import { PowerUp } from "../../Classes/PowerUp.ts";

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

export const player = new Player(levelImages.images.playerShip1, 34, 38, 2);

export const shipPosition = new Vector2(height - 100, width / 2 - 38);

export const enemyArray: EnemyObject[] = [];
export const enemySpawner = new EnemySpawner();
enemySpawner.decreaseEnemySpawnCooldown();

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

export const menu = new Menu();
export const powerUp = new PowerUp();
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
    enemySpawner.renderEnemies();

    playerMethods();
    projectiles.renderProjectile();

    player.renderPlayerSpaceship();
  }
}

function playerMethods() {
  projectiles.reloadProjectile();
  player.playerSpells.renderSpells();
  player.checkIfHitByAnEnemy();
  player.checkIfPlayerIsDead();
  menu.openMenu();
}
