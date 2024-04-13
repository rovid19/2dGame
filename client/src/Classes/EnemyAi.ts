import {
  enemyArray,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { EnemyAttack, SpriteMethods, Vector } from "../Utils/TsTypes";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Enemy {
  enemySprite: SpriteMethods;
  enemyHp: number = 100;
  enemyMaxHp: number = 100;
  enemySpeed: number = 0;
  //enemyPosition: Vector = { x: 0, y: 0 };
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
    scale: number,
    enemy: string
  ) {
    this.enemySprite = new Sprite(
      enemyImage,
      new Vector2(frameHeight, frameWidth),
      scale
    );
    this.enemySpeed = speed;
    this.setEnemyDetailsIntoAnEnemyArray();
    //this.updateEnemyCoordinates()
    this.createDetailsAboutEnemy(enemy, scale);
    this.renderHealthBar();
  }

  followPlayer() {
    if (shipPosition.y > this.enemySprite.position.y) {
      this.enemySprite.position.y += this.enemySpeed;
    }

    if (shipPosition.y < this.enemySprite.position.y) {
      this.enemySprite.position.y -= this.enemySpeed;
    }

    if (shipPosition.x > this.enemySprite.position.x) {
      this.enemySprite.position.x += this.enemySpeed;
    }

    if (shipPosition.x < this.enemySprite.position.x) {
      this.enemySprite.position.x -= this.enemySpeed;
    }
    this.moveHealthBarWithEnemy();
    //this.checkIfHitByProjectile();
  }

  setEnemyDetailsIntoAnEnemyArray() {
    const enemyObject = {
      position: this.enemySprite.position,
      enemyAttack: this.enemyAttack,
      takeDamage: this.takeDamage,
      isAlive: true,
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
    this.enemySprite.position = enemyPosition;
  }

  renderHealthBar = () => {
    // container
    document.body.appendChild(this.enemyHpBarContainer);
    this.enemyHpBarContainer.className = "enemy-hp-bar-container";
    this.enemyHpBarContainer.style.top = `${this.enemySprite.position.y}px`;
    this.enemyHpBarContainer.style.left = `${this.enemySprite.position.x}px`;
    this.enemyHpBarContainer.style.width = `${this.enemyHpBarWidth}px`;

    // hpbar
    this.enemyHpBarContainer.appendChild(this.enemyHpBarFillerContainer);
    this.enemyHpBarFillerContainer.appendChild(this.enemyHpBarFiller);
    this.enemyHpBarFillerContainer.className = "enemy-hp-bar-filler-container";
    this.enemyHpBarFiller.className = "enemy-hp-bar-filler";
  };

  moveHealthBarWithEnemy = () => {
    this.enemyHpBarContainer.style.top = `${this.enemySprite.position.y - 5}px`;
    this.enemyHpBarContainer.style.left = `${this.enemySprite.position.x}px`;
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
