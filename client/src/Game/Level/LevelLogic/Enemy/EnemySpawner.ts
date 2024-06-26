import {
  asteroid,
  canvasContext,
  canvasContext2,
  gameOptimization,
  levelImages,
  player,
} from "../mainLevelLogic";
import { AsteroidType, EnemyInstance, Vector } from "../../../../Utils/TsTypes";
import { Enemy } from "./Enemy";
import { Asteroid } from "./Asteroid";
import { Vector2 } from "../Sprite/Vector";
import { height, width } from "../Other/canvasLogic";
import { tutorial } from "../../../MainMenu/MainMenuLogic";

export class EnemySpawner {
  enemyArray: EnemyInstance[][] = [];

  enemyBasicArray: EnemyInstance[] = [];
  enemyBasic2Array: EnemyInstance[] = [];
  enemyBasic3Array: EnemyInstance[] = [];
  asteroidArray: AsteroidType[] = [];

  enemyBasicSpawnCD: number = 250; // 480
  enemyBasicSpawnMaxCD: number = 350; // 480
  isEnemyBasicReady: boolean = true;

  enemyBasic2SpawnCD: number = 1700; // 1800
  enemyBasic2SpawnMaxCD: number = 1700; // 1800
  isEnemyBasic2Ready: boolean = false;

  enemyBasic3SpawnCD: number = 2100; // 1800
  enemyBasic3SpawnMaxCD: number = 2100; // 1800
  isEnemyBasic3Ready: boolean = false;

  bossArray: EnemyInstance[] = [];
  isEnemyBossReady: boolean = true;

  isSpawnEnemiesFromAllSides: boolean = true;

  asteroidSpawnCD: number = 200;
  asteroidSpawnMaxCD: number = 200;
  isAsteroidReady: boolean = true;

  levelDifficulty: number = 10;

  constructor() {
    this.enemyArray = [
      this.enemyBasicArray,
      this.enemyBasic2Array,
      this.enemyBasic3Array,
      this.bossArray,
    ];
  }

  enemySpawnCooldown(whichEnemy: string) {
    if (player.isPlayerAlive && !tutorial.isReady) {
      if (whichEnemy === "basic") {
        this.enemyBasicSpawnCD--;
        if (this.enemyBasicSpawnCD === 0) {
          this.enemyBasicSpawnCD = this.enemyBasicSpawnMaxCD;
          this.isEnemyBasicReady = true;
        }
      } else if (whichEnemy === "basic2") {
        this.enemyBasic2SpawnCD--;
        if (this.enemyBasic2SpawnCD === 0) {
          this.enemyBasic2SpawnCD = this.enemyBasic2SpawnMaxCD;
          this.isEnemyBasic2Ready = true;
        }
      } else if (whichEnemy === "basic3") {
        this.enemyBasic3SpawnCD--;
        if (this.enemyBasic3SpawnCD === 0) {
          this.enemyBasic3SpawnCD = this.enemyBasic3SpawnMaxCD;
          this.isEnemyBasic3Ready = true;
        }
      } else if (whichEnemy === "asteroid") {
        this.asteroidSpawnCD--;
        if (this.asteroidSpawnCD === 0) {
          this.asteroidSpawnCD = this.asteroidSpawnMaxCD;
          this.isAsteroidReady = true;
        }
      }
    }
  }

  createInstanceOfEnemy(whichEnemy: string) {
    if (whichEnemy === "basic") {
      const enemyPosition = this.spawnEnemiesFromAllSides();
      const randomSpeed =
        (0.5 + Math.random() * (2 - 0.5)) * gameOptimization.scaleY;

      const enemy = new Enemy(
        randomSpeed,
        levelImages.images.enemy1,
        24,
        27,
        gameOptimization.enemyBasicScale,
        whichEnemy,
        enemyPosition
      );

      for (let i = 0; i < player.playerLevel; i++) {
        enemy.increaseEnemyStats();
      }

      this.enemyBasicArray.push(enemy);
      this.isEnemyBasicReady = false;
    } else if (whichEnemy === "basic2") {
      const enemyPosition = this.spawnEnemiesFromAllSides();
      const randomSpeed =
        (1.5 + Math.random() * (3 - 1.5)) * gameOptimization.scaleY;

      const enemy = new Enemy(
        randomSpeed,
        levelImages.images.enemy2,
        51,
        56,
        gameOptimization.scale,
        whichEnemy,
        enemyPosition
      );

      for (let i = 0; i < player.playerLevel; i++) {
        enemy.increaseEnemyStats();
      }

      this.enemyBasic2Array.push(enemy);
      this.isEnemyBasic2Ready = false;
    } else if (whichEnemy === "basic3") {
      const enemyPosition = this.spawnEnemiesFromAllSides();
      const randomSpeed =
        (2 + Math.random() * (3.5 - 2)) * gameOptimization.scaleY;
      const enemyImage = levelImages.images.enemy3;
      const enemy = new Enemy(
        randomSpeed,
        enemyImage,
        enemyImage.image.height,
        enemyImage.image.width,
        gameOptimization.scale,
        whichEnemy,
        enemyPosition
      );

      for (let i = 0; i < player.playerLevel; i++) {
        enemy.increaseEnemyStats();
      }

      this.enemyBasic3Array.push(enemy);
      this.isEnemyBasic3Ready = false;
    } else {
      const asteroidImage = asteroid.selectRandomAsteroidImage();

      const asteroidSpawn = new Asteroid(
        asteroidImage,
        new Vector2(asteroidImage.image.height, asteroidImage.image.width),
        gameOptimization.scale,
        new Vector2(-100, 0 + Math.random() * (width - 0))
      );

      for (let i = 0; i < player.playerLevel; i++) {
        asteroidSpawn.increaseAsteroidStats();
      }

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

      if (this.isEnemyBasic3Ready) {
        this.createInstanceOfEnemy("basic3");
      } else {
        this.enemySpawnCooldown("basic3");
      }

      /*if (this.isEnemyBossReady) {
        this.createInstanceOfEnemy("boss");
      }*/

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

      this.enemyBasic3Array.forEach((enemy) => {
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
          this.asteroidArray.splice(i, 1);
        }
      });
    }
  }

  resetEnemies() {
    this.enemyBasicArray = [];
    this.enemyBasic2Array = [];
    this.enemyBasic3Array = [];
    this.asteroidArray = [];
    this.bossArray = [];
    this.enemyArray = [
      this.enemyBasicArray,
      this.enemyBasic2Array,
      this.enemyBasic3Array,
      this.bossArray,
    ];

    this.enemyBasicSpawnMaxCD = 350;
    this.enemyBasicSpawnCD = this.enemyBasicSpawnMaxCD;

    this.enemyBasic2SpawnMaxCD = 1700;
    this.enemyBasic2SpawnCD = this.enemyBasic2SpawnMaxCD;

    this.enemyBasic3SpawnMaxCD = 2100;
    this.enemyBasic3SpawnCD = this.enemyBasic3SpawnMaxCD;

    this.asteroidSpawnMaxCD = 200;
    this.asteroidSpawnCD = this.asteroidSpawnMaxCD;
  }

  decreaseEnemySpawnCooldown() {
    const decreaseBasicBy = Math.floor(this.enemyBasicSpawnMaxCD * 0.1);
    const decreaseBasic2By = Math.floor(this.enemyBasic2SpawnMaxCD * 0.1);
    const decreaseBasic3By = Math.floor(this.enemyBasic3SpawnMaxCD * 0.1);

    this.enemyBasicSpawnMaxCD -= decreaseBasicBy;

    this.enemyBasic2SpawnMaxCD -= decreaseBasic2By;

    this.enemyBasic3SpawnMaxCD -= decreaseBasic3By;
  }

  decreaseAsteroidSpawnCooldown() {
    const decreaseAsteroidSpawnCdBy = Math.floor(
      this.asteroidSpawnMaxCD * 0.15
    );

    this.asteroidSpawnMaxCD -= decreaseAsteroidSpawnCdBy;
  }

  spawnEnemiesFromAllSides(): Vector {
    let vector = {
      x: 0,
      y: 0,
    };
    if (this.isSpawnEnemiesFromAllSides) {
      const randomArray = ["top", "left", "right"];
      const randomNumber = Math.floor(Math.random() * 3);

      if (randomArray[randomNumber] === "top") {
        vector.x = 0 + Math.random() * (width - 0);
        vector.y = -70;
      } else if (randomArray[randomNumber] === "left") {
        vector.x = -70;
        vector.y = 0 + Math.random() * height;
      } else {
        vector.x = width + 100;
        vector.y = 0 + Math.random() * height;
      }

      return vector;
    } else {
      vector.x = 0 + Math.random() * (width - 0);
      vector.y = -70;

      return vector;
    }
  }
}
