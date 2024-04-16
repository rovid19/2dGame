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

import { EnemyObject } from "../../Utils/TsTypes.ts";
import { Hud } from "../../Classes/Hud.ts";
import { Player } from "../../Classes/Player.ts";
import { EnemySpawner } from "../../Classes/EnemySpawner.ts";
import { Menu } from "../../Classes/InGameMenu.ts";

export let canvasContext: CanvasRenderingContext2D;

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

export const projectile = new Sprite(
  levelImages.images.projectile1,
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

export const player = new Player(levelImages.images.playerShip1, 34, 38, 2);

export const shipPosition = new Vector2(height - 100, width / 2 - 38);

export const enemyArray: EnemyObject[] = [];
export const enemySpawner = new EnemySpawner();
//
//
//
export const projectiles = new Projectile(shipPosition);
projectiles.updateProjectileBaseCoordinates();

//enemy1.createDetailsAboutEnemy("basic", enemy1.enemySprite.scale);
//enemy1.renderHealthBar();
/*
export let enemy2 = new Enemy(2, levelImages.images.enemy2, 51, 56, 2);
enemy2.updateEnemyCoordinates(enemy2.enemySprite.position);
enemy2.createDetailsAboutEnemy("basic2", enemy2.enemySprite.scale);

enemy2.renderHealthBar();

export let enemy3 = new Enemy(1.2, levelImages.images.enemy1, 24, 27, 2.5);
enemy3.updateEnemyCoordinates(enemy3.enemySprite.position);
enemy3.createDetailsAboutEnemy("basic", enemy3.enemySprite.scale);
enemy3.renderHealthBar();
*/
export const menu = new Menu();
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
      backgroundSprite.spriteImage.image
    );
    enemySpawner.renderEnemies();
    renderProjectiles();
    renderPlayerSpaceship();
    playerMethods();
  }
}

function playerMethods() {
  projectiles.reloadProjectile();
  player.activateSpell();
  player.playerSpells.activateSpellCooldown();
  player.checkIfHitByAnEnemy();
  player.checkIfPlayerIsDead();
  menu.openMenu();
}
