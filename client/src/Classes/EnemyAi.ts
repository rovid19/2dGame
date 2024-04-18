import {
  HUD,
  enemySpawner,
  player,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { EnemyInstance, SpriteMethods } from "../Utils/TsTypes";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Enemy {
  enemySprite: SpriteMethods;
  enemyDamage: number = 10;
  enemyAttackCooldown: number = 60;
  isEnemyAttackOnCooldown: boolean = false;
  enemyExp: number = 0;
  enemyHp: number = 100;
  enemyMaxHp: number = 100;
  enemySpeed: number = 0;
  enemyHpBarContainer: HTMLElement = document.createElement("div");
  enemyHpBarFillerContainer: HTMLElement = document.createElement("div");
  enemyHpBarFiller: HTMLElement = document.createElement("div");
  enemyHpBarWidth: number = 0;
  enemyHpBarPercentage: number = 100;
  enemyHitboxX: number = 0;
  enemyHitboxY: number = 0;
  whichEnemy: string = "";
  isEnemyAlive: boolean = true;

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
  }

  setEnemyAttackOnCooldown() {
    if (player.isPlayerAlive) {
      if (this.isEnemyAttackOnCooldown) {
        this.enemyAttackCooldown--;

        if (this.enemyAttackCooldown === 0) {
          this.enemyAttackCooldown = 60;
          this.isEnemyAttackOnCooldown = false;
        }
      }
    }
  }

  enemyAttack() {
    if (player.isPlayerAlive) {
      if (!this.isEnemyAttackOnCooldown) {
        player.playerHp = player.playerHp - this.enemyDamage;
        this.isEnemyAttackOnCooldown = true;
        HUD.renderPlayerTakenDamageInHpBar(this.enemyDamage);
      }
    }
  }

  renderHealthBar = () => {
    // container
    document.body.insertBefore(
      this.enemyHpBarContainer,
      document.querySelector(".level1Canvas")
    );
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
        this.whichEnemy = "basic";
        this.enemyExp = 100;
        this.enemyAttackCooldown = 100;
        this.enemyDamage = 10;
        break;
      case "basic2":
        this.enemyHitboxY = 51 * scale;
        this.enemyHitboxX = 59 * scale;
        this.enemyHpBarWidth = 56 * scale;
        this.whichEnemy = "basic2";
        this.enemyExp = 200;
        this.enemyAttackCooldown = 70;
        this.enemyDamage = 20;
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

  takeDamage = (item: EnemyInstance[], i: number) => {
    this.enemyHp -= projectiles.prjDamage;

    // calculate missing hp in percentages
    const damageTaken = (projectiles.prjDamage / this.enemyMaxHp) * 100;

    this.enemyHpBarFiller.style.width = `${
      this.enemyHpBarPercentage - damageTaken
    }%`;
    this.enemyHpBarPercentage = this.enemyHpBarPercentage - damageTaken;

    if (this.enemyHp <= 0) {
      this.removeEnemy(item, i);
      player.gainExpIfEnemyIsKilled(this.enemyExp);
    }
  };

  removeEnemy = (item: EnemyInstance[], i: number) => {
    this.isEnemyAlive = false;
    this.enemyHpBarContainer.remove();
    this.removeEnemyFromEnemyArray(item, i);
  };

  // mutating isnt the best practice, I'm aware.
  // But avoiding mutation in an array inside another array
  // gives me a special kind of headache
  removeEnemyFromEnemyArray(item: EnemyInstance[], i: number) {
    item.splice(i, 1);
  }
}
