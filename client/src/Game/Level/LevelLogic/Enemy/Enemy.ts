import { HUD, player, shipPosition } from "../mainLevelLogic";
import {
  EnemyInstance,
  ImageType,
  SpriteMethods,
  Vector,
} from "../../../../Utils/TsTypes";
import { Sprite } from "../Sprite/Sprite";
import { Vector2 } from "../Sprite/Vector";

export class Enemy {
  enemySprite: SpriteMethods;
  enemyDamage: number = 10;
  enemyAttackCooldown: number = 60;
  isEnemyAttackOnCooldown: boolean = false;
  enemyExp: number = 0;
  enemyHp: number = 100;
  enemySpawnCD: number = 0;
  enemyMaxSpawnCD: number = 0;
  enemyMaxHp: number = 100;
  enemySpeed: number = 0;
  enemyHpBarContainer: HTMLElement = document.createElement("div");
  enemyHpBarFillerContainer: HTMLElement = document.createElement("div");
  enemyHpBarFiller: HTMLElement = document.createElement("div");
  enemyHpBarWidth: number = 0;
  enemyHpBarPercentage: number = 100;
  enemyHitboxX: number = 0;
  enemyHitboxY: number = 0;
  enemyScore: number = 0;
  whichEnemy: string = "";
  isEnemyAlive: boolean = true;

  constructor(
    speed: number,
    enemyImage: ImageType,
    frameHeight: number,
    frameWidth: number,
    scale: number,
    enemy: string,
    position?: Vector
  ) {
    this.enemySprite = new Sprite(
      enemyImage,
      new Vector2(frameHeight, frameWidth),
      scale,
      position
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
        player.takeDamage(this.enemyDamage);
        this.isEnemyAttackOnCooldown = true;
      }
    }
  }

  renderHealthBar = () => {
    // container
    document.body.insertBefore(
      this.enemyHpBarContainer,
      document.querySelector(".background-canvas")
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
        this.enemyHitboxY = 24 * scale;
        this.enemyHitboxX = 27 * scale;
        this.enemyHpBarWidth = 27 * scale;
        this.whichEnemy = "basic";
        this.enemyExp = 250;
        this.enemyAttackCooldown = 100;
        this.enemyDamage = 10;
        this.enemyScore = 50;
        break;
      case "basic2":
        this.enemyHitboxY = 51 * scale;
        this.enemyHitboxX = 59 * scale;
        this.enemyHpBarWidth = 56 * scale;
        this.whichEnemy = "basic2";
        this.enemyExp = 250;
        this.enemyAttackCooldown = 70;
        this.enemyDamage = 20;
        this.enemyScore = 100;
        break;
      case "basic3":
        this.enemyHitboxY = this.enemySprite.frameSize.y * scale;
        this.enemyHitboxX = this.enemySprite.frameSize.x * scale;
        this.enemyHpBarWidth = this.enemyHitboxX;
        this.whichEnemy = "basic3";
        this.enemyExp = 450;
        this.enemyAttackCooldown = 40;
        this.enemyDamage = 30;
        this.enemyScore = 500;
        break;
      case "boss":
        this.enemyHitboxY = this.enemySprite.frameSize.y * scale;
        this.enemyHitboxX = this.enemySprite.frameSize.x * scale;
        this.enemyHpBarWidth = this.enemyHitboxX;
        this.whichEnemy = "boss";
        this.enemyExp = 2000;
        this.enemyAttackCooldown = 20;
        this.enemyDamage = 70;
        this.enemyScore = 5000;
        break;
    }
  };

  takeDamage = (item: EnemyInstance[], i: number, dmg: number) => {
    this.enemyHp -= dmg;
    // calculate missing hp in percentages
    const damageTaken = (dmg / this.enemyMaxHp) * 100;

    this.enemyHpBarFiller.style.width = `${
      this.enemyHpBarPercentage - damageTaken
    }%`;
    this.enemyHpBarPercentage = this.enemyHpBarPercentage - damageTaken;

    if (player.isAoeDamage && this.enemyHp <= 0) {
      this.removeEnemy(item, i);
      this.giveScorePointsToPlayer();
      player.aoeGainedExp += this.enemyExp;
    } else {
      if (this.enemyHp <= 0) {
        this.removeEnemy(item, i);
        player.gainExpIfEnemyIsKilled(this.enemyExp);
        this.giveScorePointsToPlayer();
      }
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

  giveScorePointsToPlayer() {
    HUD.scoreChangeAnimation(this.enemyScore);
  }

  increaseEnemyStats() {
    const increaseDamageBy = this.enemyDamage * 0.1;
    const increaseExpBy = this.enemyExp * 0.2;
    const increaseScoreBy = this.enemyScore * 0.1;
    const increasesHpBy = this.enemyHp * 0.1;

    this.enemyDamage += Math.floor(increaseDamageBy);
    this.enemyExp += Math.floor(increaseExpBy);
    this.enemyScore += Math.floor(increaseScoreBy);
    this.enemyHp += Math.floor(increasesHpBy);
    this.enemyMaxHp += Math.floor(increasesHpBy);
  }
}
