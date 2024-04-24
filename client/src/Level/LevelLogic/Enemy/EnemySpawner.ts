import {
  asteroid,
  canvasContext,
  canvasContext2,
  levelImages,
  player,
} from "../mainLevelLogic";
import { AsteroidType, EnemyInstance, EnemyType } from "../../../Utils/TsTypes";
import { Enemy } from "./Enemy";
import { Asteroid } from "./Asteroid";
import { Vector2 } from "../Sprite/Vector";

export class EnemySpawner {
  enemyArray: EnemyInstance[][] = [];
  enemyBasic: EnemyType = {
    image: new Image(),
    title: "basic",
  };

  enemyBasic2: EnemyType = {
    image: new Image(),
    title: "basic2",
  };

  enemyBasicArray: EnemyInstance[] = [];
  enemyBasic2Array: EnemyInstance[] = [];
  asteroidArray: AsteroidType[] = [];

  enemyBasicSpawnCD: number = 200; // 480
  enemyBasicSpawnMaxCD: number = 200; // 480
  isEnemyBasicReady: boolean = true;

  enemyBasic2SpawnCD: number = 1800; // 1800
  enemyBasic2SpawnMaxCD: number = 1800; // 1800
  isEnemyBasic2Ready: boolean = false;

  asteroidSpawnCD: number = 200;
  asteroidSpawnMaxCD: number = 200;
  isAsteroidReady: boolean = true;

  levelDifficulty: number = 10;

  constructor() {
    this.setEnemy();
    this.enemyArray = [this.enemyBasicArray, this.enemyBasic2Array];
  }

  setEnemy() {
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        this.enemyBasic.image = levelImages.images.enemy1;
      }
      if (i === 1) {
        this.enemyBasic2.image = levelImages.images.enemy2;
      }
    }
  }

  enemySpawnCooldown(whichEnemy: string) {
    if (whichEnemy === "basic") {
      this.enemyBasicSpawnCD--;
      if (this.enemyBasicSpawnCD === 0) {
        this.enemyBasicSpawnCD = this.enemyBasicSpawnMaxCD;
        this.isEnemyBasicReady = true;
      }
    }
    if (whichEnemy === "basic2") {
      this.enemyBasic2SpawnCD--;
      if (this.enemyBasic2SpawnCD === 0) {
        this.enemyBasic2SpawnCD = this.enemyBasic2SpawnMaxCD;
        this.isEnemyBasic2Ready = true;
      }
    }

    if (whichEnemy === "asteroid") {
      this.asteroidSpawnCD--;
      if (this.asteroidSpawnCD === 0) {
        this.asteroidSpawnCD = this.asteroidSpawnMaxCD;
        this.isAsteroidReady = true;
      }
    }
  }

  createInstanceOfEnemy(whichEnemy: string) {
    if (whichEnemy === "basic") {
      const randomSpeed = 0.5 + Math.random() * (2 - 0.5);

      const enemy = new Enemy(
        randomSpeed,
        this.enemyBasic.image,
        24,
        27,
        2.5,
        whichEnemy
      );

      this.enemyBasicArray.push(enemy);

      this.isEnemyBasicReady = false;
      enemy.renderHealthBar();
    } else if (whichEnemy === "basic2") {
      const randomSpeed = 1.5 + Math.random() * (3 - 1.5);

      const enemy = new Enemy(
        randomSpeed,
        this.enemyBasic2.image,
        51,
        56,
        2,
        whichEnemy
      );
      this.enemyBasic2Array.push(enemy);
      this.isEnemyBasic2Ready = false;
    } else if (whichEnemy === "asteroid") {
      const asteroidImage = asteroid.selectRandomAsteroidImage();

      const asteroidSpawn = new Asteroid(
        asteroidImage,
        new Vector2(asteroidImage.image.height, asteroidImage.image.width),
        2
      );

      this.asteroidArray.push(asteroidSpawn);
      this.isAsteroidReady = false;
    }
  }

  spawnEnemies() {
    if (player.isPlayerAlive) {
      if (this.isEnemyBasicReady) {
        this.createInstanceOfEnemy("basic");
      } else {
        this.enemySpawnCooldown("basic");
      }
      if (this.isEnemyBasic2Ready) {
        this.createInstanceOfEnemy("basic2");
      } else {
        this.enemySpawnCooldown("basic2");
      }

      if (this.isAsteroidReady) {
        this.createInstanceOfEnemy("asteroid");
      } else {
        this.enemySpawnCooldown("asteroid");
      }
    }
  }

  renderEnemies() {
    this.spawnEnemies();

    if (canvasContext) {
      this.enemyBasicArray.forEach((enemy) => {
        if (enemy.isEnemyAlive) {
          enemy.enemySprite.drawImage(
            canvasContext2,
            enemy.enemySprite.position.x,
            enemy.enemySprite.position.y
          );
          if (player.isPlayerAlive) enemy.followPlayer();
          enemy.setEnemyAttackOnCooldown();
        }
      });

      this.enemyBasic2Array.forEach((enemy) => {
        enemy.enemySprite.drawImage(
          canvasContext2,
          enemy.enemySprite.position.x,
          enemy.enemySprite.position.y
        );

        if (player.isPlayerAlive) enemy.followPlayer();
        enemy.setEnemyAttackOnCooldown();
      });

      this.asteroidArray.forEach((asteroid, i) => {
        asteroid.asteroidSprite.drawImage(
          canvasContext2,
          asteroid.asteroidSprite.position.x,
          asteroid.asteroidSprite.position.y
        );

        asteroid.renderAsteroidFromTopToBottom();
        if (asteroid.asteroidOffScreen || asteroid.asteroidHitTarget) {
          console.log("offscreen", i);
          console.log(this.asteroidArray);
          this.asteroidArray.splice(i, 1);
        }
      });
    }
  }

  resetEnemies() {
    this.enemyBasicArray = [];
    this.enemyBasic2Array = [];
    this.enemyArray = [this.enemyBasicArray, this.enemyBasic2Array];
  }

  increaseLevelDifficulty() {
    this.levelDifficulty = (this.levelDifficulty + 10) / 100;
  }

  decreaseEnemySpawnCooldown() {}
}
