import { height, width } from "../Level/LevelLogic/canvasLogic";
import {
  HUD,
  canvasContext,
  enemyArray,
  enemySpawner,
  shield,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../Utils/OftenUsed";
import {
  PlayerMovementMethods,
  SpriteMethods,
  PlayerSpellMethods,
} from "../Utils/TsTypes";
import { Input } from "./PlayerInput";
import { PlayerSpells } from "./PlayerSpells";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Player {
  playerSprite: SpriteMethods;
  playerHp: number = 20;
  playerMaxHP: number = 100;
  playerLevel: number = 1;
  playerHpBarPercentage: number = 100;
  playerHpBar: HTMLElement = document.createElement("div");
  playerEnergy: number = 100;
  playerSpeed: number = 1;
  playerMovement: PlayerMovementMethods = new Input();
  playerSpells: PlayerSpellMethods = new PlayerSpells();
  playerSpellActivated: boolean = false;
  playerHitboxY: number;
  playerHitboxX: number;
  playerExp: number = 0;
  playerExpNeeded: number = 100;
  isPlayerAlive: boolean = true;

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

  checkIfHitByAnEnemy = () => {
    console.log("da");
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

  activateSpell() {
    if (
      this.playerSpellActivated ||
      this.playerSpells.playerShieldDuration > 0
    ) {
      if (this.playerSpells.spell === "Shield") {
        this.playerSpells.playerShieldDuration--;

        //render shield in the middle of spaceship sprite
        const shieldMinusShipHeight = 122 - 68;
        const centerShield = shieldMinusShipHeight / 2;
        const shieldMinusShipWidth = 122 - 76;
        const centerShieldX = shieldMinusShipWidth / 2;

        shield.drawImage(
          canvasContext,
          shipPosition.x - centerShieldX,
          shipPosition.y - centerShield
        );

        if (this.playerSpells.playerShieldDuration === 0) {
          this.playerSpells.spellsOnCooldown.push("Shield");
          HUD.playerSpell1Cooldown.style.height = "100%";
          this.playerSpells.playerShieldCooldown = 600;
          this.playerSpells.activateSpellCooldown();
        }
      }
    }
  }

  gainExpIfEnemyIsKilled(expAmountGained: number) {
    this.playerExp += expAmountGained;
    HUD.renderGainedExp();
    if (this.playerExp >= this.playerExpNeeded) {
      this.playerExp = 0;
      this.playerLevel++;
      this.playerExpNeeded = this.playerExpNeeded * 2;

      HUD.resetExpBarAfterLevelUp();
    }
  }

  checkIfPlayerIsDead() {
    if (this.playerHp <= 0) {
      if (this.isPlayerAlive) HUD.playerDied();
      this.isPlayerAlive = false;
    }
  }

  resetPlayer() {
    this.playerHp = 100;
    this.playerMaxHP = 100;
    this.playerLevel = 1;
    this.playerHpBarPercentage = 100;
    this.playerEnergy = 100;
    this.playerSpeed = 1;
    this.playerSpellActivated = false;
    this.playerHitboxY = 34 * this.playerSprite.scale;
    this.playerHitboxX = 38 * this.playerSprite.scale;
    this.playerExp = 0;
    this.playerExpNeeded = 100;
    this.isPlayerAlive = true;
    console.log(height, width);
    shipPosition.x = width / 2 - 38;
    shipPosition.y = height - 100;
  }
}
