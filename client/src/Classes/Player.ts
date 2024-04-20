import { height, width } from "../Level/LevelLogic/canvasLogic";
import {
  HUD,
  canvasContext,
  enemySpawner,
  player,
  playerMovementInput,
  powerUp,
  projectiles,
  shield,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../Utils/OftenUsed";
import {
  PlayerMovementMethods,
  SpriteMethods,
  InputSpellType,
  Projectile,
} from "../Utils/TsTypes";
import { Input } from "./PlayerInput";
import { PlayerSpells } from "./PlayerSpells";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Player {
  playerSprite: SpriteMethods;
  playerHp: number = 100;
  playerMaxHP: number = 100;
  playerShield: number = 0;
  playerLevel: number = 1;
  playerHpBarPercentage: number = 100;
  playerHpBar: HTMLElement = document.createElement("div");
  playerEnergy: number = 100;
  playerSpeed: number = 5;
  playerMovement: PlayerMovementMethods = new Input();
  playerSpells: InputSpellType = new PlayerSpells();
  playerSpellActivated: boolean = false;
  playerHitboxY: number;
  playerHitboxX: number;
  playerExp: number = 0;
  playerExpNeeded: number = 100;
  isPlayerAlive: boolean = true;
  isPlayerOutside: boolean = false;
  onWhichSide: string = "";

  constructor(
    spaceshipImage: HTMLImageElement,
    frameHeight: number,
    frameWidth: number,
    scale: number
  ) {
    this.playerSprite = new Sprite(
      spaceshipImage,
      new Vector2(frameHeight, frameWidth),
      scale
    );
    this.playerHitboxY = 34 * this.playerSprite.scale;
    this.playerHitboxX = 38 * this.playerSprite.scale;
  }

  stopSpaceshipFromGoingOutsideOfScreen() {
    // prva 4 ifa proveravaju gornji lijevi gornji, donji lijevi, gornji desni i donji desni kut jer za ta 4 kuta trebam 2 conditiona ispunjavat
    if (shipPosition.x < 0 && shipPosition.y < 0) {
      if (
        playerMovementInput.direction === "LEFT" ||
        playerMovementInput.direction === "UP"
      ) {
        playerMovementInput.direction = "";
      }
      player.playerSprite.drawImage(canvasContext, 0, 0);
    } else if (shipPosition.y >= height - 34 * 2 && shipPosition.x < 0) {
      if (
        playerMovementInput.direction === "LEFT" ||
        playerMovementInput.direction === "DOWN"
      ) {
        playerMovementInput.direction = "";
      }
      shipPosition.x = 0;
      shipPosition.y = height - 34 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(canvasContext, 0, height - 34 * 2);
    } else if (shipPosition.y < 0 && shipPosition.x >= width - 38 * 2) {
      if (
        playerMovementInput.direction === "RIGHT" ||
        playerMovementInput.direction === "UP"
      ) {
        playerMovementInput.direction = "";
      }
      player.playerSprite.drawImage(canvasContext, width - 38 * 2, 0);
    } else if (
      shipPosition.y >= height - 34 * 2 &&
      shipPosition.x >= width - 38 * 2
    ) {
      if (
        playerMovementInput.direction === "RIGHT" ||
        playerMovementInput.direction === "DOWN"
      ) {
        playerMovementInput.direction = "";
      }
      shipPosition.x = width - 38 * 2;
      shipPosition.y = height - 34 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(
        canvasContext,
        width - 38 * 2,
        height - 34 * 2
      );
    }
    // lijeva strana
    else if (shipPosition.x < 0) {
      if (playerMovementInput.direction === "LEFT")
        playerMovementInput.direction = "";

      shipPosition.x = 0;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      if (player.isPlayerOutside && player.onWhichSide === "left") {
        player.playerSprite.drawImage(
          canvasContext,
          width - 38 * 2,
          shipPosition.y
        );
        shipPosition.x = width - 38 * 2;
        //projectiles.updateProjectileBaseCoordinates();
        projectiles.stopRendering = false;
        playerMovementInput.direction = "LEFT";
      } else {
        player.playerSprite.drawImage(canvasContext, 0, shipPosition.y);
      }
    }
    // desna strana
    else if (shipPosition.x >= width - 38 * 2) {
      if (playerMovementInput.direction === "RIGHT")
        playerMovementInput.direction = "";

      shipPosition.x = width - 38 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      if (player.isPlayerOutside && player.onWhichSide === "right") {
        player.playerSprite.drawImage(canvasContext, 0, shipPosition.y);
        shipPosition.x = 0;
        //projectiles.updateProjectileBaseCoordinates();
        projectiles.stopRendering = false;
        playerMovementInput.direction = "RIGHT";
      } else {
        player.playerSprite.drawImage(
          canvasContext,
          width - 38 * 2,
          shipPosition.y
        );
      }
    }
    // gornja strana
    else if (shipPosition.y < 0) {
      if (playerMovementInput.direction === "UP")
        playerMovementInput.direction = "";

      shipPosition.y = 0;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(canvasContext, shipPosition.x, 0);
    }
    // donja strana
    else if (shipPosition.y >= height - 34 * 2) {
      if (playerMovementInput.direction === "DOWN")
        playerMovementInput.direction = "";

      shipPosition.y = height - 34 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(
        canvasContext,
        shipPosition.x,
        height - 34 * 2
      );
    } else {
      player.playerSprite.drawImage(
        canvasContext,
        shipPosition.x,
        shipPosition.y
      );
    }
  }

  renderPlayerSpaceship() {
    this.stopSpaceshipFromGoingOutsideOfScreen();
  }

  checkIfHitByAnEnemy = () => {
    const halfOfHitboxX = this.playerHitboxX / 2;
    const halfOfHitboxY = this.playerHitboxY / 2;
    let currentX = shipPosition.x;
    let currentY = shipPosition.y;
    const hitboxArrayX = [] as number[];
    const hitboxArrayY = [] as number[];

    returnArrayOfHitboxNumbers(
      Math.round(currentX),
      halfOfHitboxX,
      hitboxArrayX,
      Math.round(currentX + 1)
    );
    returnArrayOfHitboxNumbers(
      Math.round(currentY),
      halfOfHitboxY,
      hitboxArrayY,
      Math.round(currentY + 1)
    );

    enemySpawner.enemyArray.forEach((array) => {
      array.forEach((enemy) => {
        if (hitboxArrayY.includes(Math.round(enemy.enemySprite.position.y))) {
          if (hitboxArrayX.includes(Math.round(enemy.enemySprite.position.x))) {
            enemy.enemyAttack();
          }
        }
      });
    });
  };

  setHpBar(htmlElement: HTMLElement) {
    this.playerHpBar = htmlElement;
  }

  gainExpIfEnemyIsKilled(expAmountGained: number) {
    this.playerExp += expAmountGained;
    HUD.renderGainedExp();
    if (this.playerExp >= this.playerExpNeeded) {
      this.playerLevelUp();
    }
  }

  playerLevelUp() {
    this.playerExp = 0;
    this.playerLevel++;
    this.playerExpNeeded = this.playerExpNeeded * 2;
    powerUp.isPowerUpActive = true;
    powerUp.openPowerUp();
    HUD.resetExpBarAfterLevelUp();
  }

  checkIfPlayerIsDead() {
    if (this.playerHp <= 0) {
      if (this.isPlayerAlive) HUD.createPlayerDiedPopup();
      this.isPlayerAlive = false;
    }
  }

  resetPlayer() {
    this.playerHp = 100;
    this.playerMaxHP = 100;
    this.playerLevel = 1;
    this.playerHpBarPercentage = 100;
    this.playerEnergy = 100;
    this.playerSpeed = 5;
    this.playerSpellActivated = false;
    this.playerHitboxY = 34 * this.playerSprite.scale;
    this.playerHitboxX = 38 * this.playerSprite.scale;
    this.playerExp = 0;
    this.playerExpNeeded = 100;
    this.isPlayerAlive = true;

    shipPosition.x = width / 2 - 38;
    shipPosition.y = height - 100;
  }

  increasePlayerStatsAfterPowerUp(powerUp: string, value: number) {
    switch (powerUp) {
      case "Damage increase":
        this.increaseStatByPercentage(projectiles, value);
        break;

      case "Movement speed increase":
        this.increaseStatByPercentage(player, value);
        break;
      case "Reload speed increase":
        console.log(projectiles.prjReloadCooldown, projectiles.prjSpeed);
        this.decreaseStatByPercentage(projectiles, value);
        console.log(projectiles.prjReloadCooldown, projectiles.prjSpeed);
        break;
      case "Projectile size increase":
        projectiles.increaseProjectileSizeAndHitbox(value);
        break;
      case "Cooldown reduction":
        player.playerSpells.decreaseStatByPercentage(2, value);
        break;
    }
  }

  increaseStatByPercentage(stat: Player | Projectile, value: number) {
    if (stat instanceof Player) {
      const increaseStatBy = stat.playerSpeed * (value / 100);
      stat.playerSpeed = stat.playerSpeed + increaseStatBy;
    } else {
      const increaseStatBy = stat.prjDamage * (value / 100);
      stat.prjDamage = stat.prjDamage + increaseStatBy;
    }
  }

  decreaseStatByPercentage(stat: Projectile, value: number) {
    const decreaseStatBy = stat.prjReloadCooldown * (value / 100);
    stat.prjReloadCooldown = Math.floor(
      stat.prjReloadCooldown - decreaseStatBy
    );
    stat.prjReloadSpeed = stat.prjReloadCooldown;

    // increase prj speed as well
    const increaseStatBy = stat.prjSpeed * (value / 100);
    stat.prjSpeed = Math.floor(stat.prjSpeed + increaseStatBy);

    if (stat.prjReloadCooldown <= 5) {
      stat.prjReloadCooldown = 5;
      stat.prjReloadSpeed = 5;
      stat.prjSpeed = 45;
    }
  }
}
