import {
  enemyArray,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../Utils/OftenUsed";
import { EnemyAttack, SpriteMethods, Vector } from "../Utils/TsTypes";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Enemy {
  enemySprite: SpriteMethods;
  enemyHp: number = 100;
  enemyMaxHp: number = 100;
  enemySpeed: number = 0;
  enemyDamage: number = 10;
  enemyPosition: Vector = { x: 0, y: 0 };
  enemyHpBarContainer: HTMLElement = document.createElement("div");
  enemyHpBarFillerContainer: HTMLElement = document.createElement("div");
  enemyHpBarFiller: HTMLElement = document.createElement("div");
  enemyHpBarWidth: number = 0;
  enemyHpBarPercentage: number = 100;
  enemyHitboxX: number = 0;
  enemyHitboxY: number = 0;
  enemyAttack: EnemyAttack = {
    enemyDamage: 10,
    enemyAttackCooldown: 60,
    isEnemyAttackOnCooldown: false,
  };

  constructor(
    speed: number,
    enemyImage: HTMLImageElement,
    frameHeight: number,
    frameWidth: number,
    scale: number
  ) {
    this.enemySprite = new Sprite(
      enemyImage,
      new Vector2(frameHeight, frameWidth),
      scale
    );
    this.enemySpeed = speed;
    this.setEnemyDetailsIntoAnEnemyArray();
  }

  followPlayer() {
    if (shipPosition.y > this.enemyPosition.y) {
      this.enemyPosition.y += this.enemySpeed;
    }

    if (shipPosition.y < this.enemyPosition.y) {
      this.enemyPosition.y -= this.enemySpeed;
    }

    if (shipPosition.x > this.enemyPosition.x) {
      this.enemyPosition.x += this.enemySpeed;
    }

    if (shipPosition.x < this.enemyPosition.x) {
      this.enemyPosition.x -= this.enemySpeed;
    }
    this.moveHealthBarWithEnemy();
    //this.checkIfHitByProjectile();
  }

  setEnemyDetailsIntoAnEnemyArray() {
    const enemyObject = {
      position: this.enemySprite.position,
      enemyAttack: this.enemyAttack,
    };
    enemyArray.push(enemyObject);
  }

  setEnemyAttackOnCooldown() {
    if (this.enemyAttack.isEnemyAttackOnCooldown) {
      this.enemyAttack.enemyAttackCooldown--;

      if (this.enemyAttack.enemyAttackCooldown === 0) {
        this.enemyAttack.enemyAttackCooldown = 60;
        this.enemyAttack.isEnemyAttackOnCooldown = false;
      }
    }
  }

  updateEnemyCoordinates(enemyPosition: Vector) {
    this.enemyPosition = enemyPosition;
  }

  renderHealthBar = () => {
    // container
    document.body.appendChild(this.enemyHpBarContainer);
    this.enemyHpBarContainer.className = "enemy-hp-bar-container";
    this.enemyHpBarContainer.style.top = `${this.enemyPosition.y}px`;
    this.enemyHpBarContainer.style.left = `${this.enemyPosition.x}px`;
    this.enemyHpBarContainer.style.width = `${this.enemyHpBarWidth}px`;

    // hpbar
    this.enemyHpBarContainer.appendChild(this.enemyHpBarFillerContainer);
    this.enemyHpBarFillerContainer.appendChild(this.enemyHpBarFiller);
    this.enemyHpBarFillerContainer.className = "enemy-hp-bar-filler-container";
    this.enemyHpBarFiller.className = "enemy-hp-bar-filler";
  };

  moveHealthBarWithEnemy = () => {
    this.enemyHpBarContainer.style.top = `${this.enemyPosition.y - 5}px`;
    this.enemyHpBarContainer.style.left = `${this.enemyPosition.x}px`;
  };

  createDetailsAboutEnemy = (enemy: string, scale: number) => {
    switch (enemy) {
      case "basic":
        this.enemyHitboxY = 35 * scale;
        this.enemyHitboxX = 30 * scale;
        this.enemyHpBarWidth = 27 * scale;
        this.enemyAttack.enemyDamage = 10;
        break;
      case "basic2":
        this.enemyHitboxY = 51 * scale;
        this.enemyHitboxX = 59 * scale;
        this.enemyHpBarWidth = 56 * scale;
        this.enemyAttack.enemyDamage = 20;
        break;
      case "special":
        break;
      case "special2":
        break;
      case "asteroid":
        break;
      case "asteroid2":
        break;
      case "asteroid3":
        break;
      case "asteroid4":
        break;
    }
  };

  /*checkIfHitByProjectile = () => {
    const halfOfHitboxX = this.enemyHitboxX / 2;
    const halfOfHitboxY = this.enemyHitboxY / 2;
    let currentX = this.enemyPosition.x;
    let currentY = this.enemyPosition.y;
    const hitboxArrayX = [] as number[];
    const hitboxArrayY = [] as number[];

    returnArrayOfHitboxNumbers(
      currentX,
      halfOfHitboxX,
      hitboxArrayX,
      currentX + 1
    );
    returnArrayOfHitboxNumbers(
      currentY,
      halfOfHitboxY,
      hitboxArrayY,
      currentY + 1
    );

    if (
      hitboxArrayX.includes(
        projectiles.prjDirectionsLeft.x || projectiles.prjDirectionsRight.x
      )
    ) {
      if (
        hitboxArrayY.includes(
          projectiles.prjDirectionsLeft.y || projectiles.prjDirectionsRight.y
        )
      ) {
        projectiles.targetHit = true;
        this.takeDamage();
      }
    }

    if (this.enemyHp <= 0) {
      this.removeEnemy();
    }
  };*/

  takeDamage = () => {
    this.enemyHp -= projectiles.prjDamage;

    // calculate missing hp in percentages
    const damageTaken = (projectiles.prjDamage / this.enemyMaxHp) * 100;

    this.enemyHpBarFiller.style.width = `${
      this.enemyHpBarPercentage - damageTaken
    }%`;
    this.enemyHpBarPercentage = this.enemyHpBarPercentage - damageTaken;
  };

  removeEnemy = () => {};
}
