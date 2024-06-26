import { height, width } from "../Other/canvasLogic";
import {
  HUD,
  enemySpawner,
  gameOptimization,
  player,
  powerUp,
  projectiles,
  shipPosition,
} from "../mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../../../../Utils/OftenUsed";
import {
  PlayerMovementMethods,
  SpriteMethods,
  InputSpellType,
  Projectile,
  InputType,
  ImageType,
} from "../../../../Utils/TsTypes";
import { Input } from "./PlayerInput";
import { PlayerSpells } from "./PlayerSpells";
import { Sprite } from "../Sprite/Sprite";
import { Vector2 } from "../Sprite/Vector";

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
  playerInput: InputType = new Input();
  playerSpellActivated: boolean = false;
  playerHitboxY: number;
  playerHitboxX: number;
  playerExp: number = 0;
  playerExpNeeded: number = 100;
  playerScore: number = 1;
  isPlayerAlive: boolean = true;
  isPlayerOutside: boolean = false;
  onWhichSide: string = "";
  isAoeDamage: boolean = false;
  aoeGainedExp: number = 0;
  levelUpArray: number[] = [];

  constructor(
    spaceshipImage: ImageType,
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

  renderPlayerSpaceship() {
    player.playerInput.stopSpaceshipFromGoingOutsideOfScreen();
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
    //console.log(this.playerSpells.playerExplosionDamage);
    if (this.playerExp >= this.playerExpNeeded) {
      this.playerLevelUp(false);
    }
  }

  gainExpForMultipleEnemies() {
    if (this.aoeGainedExp > 0) {
      if (this.playerExpNeeded < this.aoeGainedExp) {
        this.levelUpMultipleLevels();
      } else {
        this.levelUpArray.forEach(() => {
          this.playerLevelUp(true);
        });
        this.playerExp += this.aoeGainedExp;
        this.aoeGainedExp -= this.aoeGainedExp;
        // if player cant level multiple levels but still is able to level up
        if (this.playerExp > this.playerExpNeeded) {
          this.playerLevelUp(false);
        }
        HUD.renderGainedExp();
        this.levelUpArray = [];
      }
    }
  }

  levelUpMultipleLevels() {
    this.aoeGainedExp -= this.playerExpNeeded;
    this.playerExp += this.playerExpNeeded;
    this.playerExpNeeded = this.playerExpNeeded * 2;
    this.levelUpArray.push(0);
  }

  playerLevelUp(aoe: boolean) {
    this.playerExp = 0;
    this.playerMaxHP += 35;
    this.playerHp = this.playerMaxHP;
    this.playerLevel++;
    if (!aoe) this.playerExpNeeded = this.playerExpNeeded * 2;
    powerUp.isPowerUpActive = true;
    powerUp.powerUpQueueArray.push(0);
    powerUp.openPowerUp();
    HUD.resetExpBarAfterLevelUp();
    HUD.renderPlayerGainedHp();
    enemySpawner.decreaseEnemySpawnCooldown();
    enemySpawner.decreaseAsteroidSpawnCooldown();
    powerUp.increaseRarityOfPowerUps();
    this.increasePlayerStatsAfterPowerUp("Damage increase", 5);
    this.increasePlayerStatsAfterPowerUp("Movement speed increase", 1);
    // this.increasePlayerStatsAfterPowerUp("Projectile size increase", 5);
    this.increasePlayerStatsAfterPowerUp("Cooldown reduction", 2);
    this.playerSpells.increaseSpellStats("Explosion damage increase", 5);
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
    this.playerSpeed = 5 * gameOptimization.scaleY;
    this.playerSpellActivated = false;
    this.playerHitboxY = 34 * this.playerSprite.scale;
    this.playerHitboxX = 38 * this.playerSprite.scale;
    this.playerExp = 0;
    this.playerExpNeeded = 100;
    this.isPlayerAlive = true;

    shipPosition.x = width / 2 - 38;
    shipPosition.y = height - 100;
  }

  takeDamage(takenDamage: number) {
    if (this.playerShield > 0) {
      const moreThanShieldAmount = this.playerShield - takenDamage;
      if (moreThanShieldAmount < 0) {
        this.playerShield = 0;
        HUD.renderPlayerTakenDamageInHpBar(takenDamage);
        HUD.renderShieldAmount(takenDamage);
        this.playerHp -= Math.abs(moreThanShieldAmount);
      } else {
        HUD.renderShieldAmount(takenDamage);
        this.playerShield -= takenDamage;
      }
    } else {
      HUD.renderPlayerTakenDamageInHpBar(takenDamage);
      this.playerHp -= takenDamage;

      this.checkIfPlayerIsDead();
    }
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
        this.decreaseStatByPercentage(projectiles, value);
        break;
      case "Projectile size increase":
        projectiles.increaseProjectileSizeAndHitbox(value);
        break;
      case "Cooldown reduction":
        player.playerSpells.decreaseStatByPercentage(value);
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

    if (stat.prjReloadCooldown <= 2) {
      stat.prjReloadCooldown = 2;
      stat.prjReloadSpeed = 2;
      stat.prjSpeed = 60;
    }
  }
  setPlayerScore(value: number) {
    player.playerScore += value;
  }
}
