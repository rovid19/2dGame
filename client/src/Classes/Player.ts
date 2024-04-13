import {
  HUD,
  canvasContext,
  enemyArray,
  shield,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
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
  playerHp: number = 100;
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
    const halfOfHitboxX = this.playerHitboxX / 2;
    const halfOfHitboxY = this.playerHitboxY / 2;
    let currentX = shipPosition.x;
    let currentY = shipPosition.y;
    const hitboxArrayX = [] as number[];
    const hitboxArrayY = [] as number[];

    this.returnArrayOfHitboxNumbers(
      currentX,
      halfOfHitboxX,
      hitboxArrayX,
      currentX + 1
    );
    this.returnArrayOfHitboxNumbers(
      currentY,
      halfOfHitboxY,
      hitboxArrayY,
      currentY + 1
    );

    enemyArray.forEach((enemyPosition) => {
      if (hitboxArrayX.includes(enemyPosition.position.x)) {
        if (hitboxArrayY.includes(enemyPosition.position.y)) {
          if (enemyPosition.enemyAttack.enemyAttackCooldown === 60) {
            this.takeDamage(enemyPosition.enemyAttack.enemyDamage);
            enemyPosition.enemyAttack.isEnemyAttackOnCooldown = true;

            console.log(this.playerHp);
          }
        }
      }
    });
  };

  takeDamage(enemyDamage: number) {
    this.playerHp = this.playerHp - enemyDamage;
    this.renderTakenDamageInHpBar(enemyDamage);
  }

  setHpBar(htmlElement: HTMLElement) {
    this.playerHpBar = htmlElement;
  }

  renderTakenDamageInHpBar(enemyDamage: number) {
    const damageTaken = (enemyDamage / this.playerMaxHP) * 100;
    this.playerHpBar.style.width = `${
      this.playerHpBarPercentage - damageTaken
    }%`;
    this.playerHpBarPercentage = this.playerHpBarPercentage - damageTaken;
  }

  returnArrayOfHitboxNumbers(
    currentPosition: number,
    hitbox: number,
    hitboxArray: number[],
    newCurrentPosition: number
  ) {
    for (let i = 0; i < hitbox; i++) {
      hitboxArray.push(currentPosition);
      currentPosition--;
    }

    for (let i = 0; i < hitbox; i++) {
      hitboxArray.push(newCurrentPosition);
      newCurrentPosition++;
    }
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
}
