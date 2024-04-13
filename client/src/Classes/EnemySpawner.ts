import { canvasContext, levelImages } from "../Level/LevelLogic/mainLevelLogic";
import { EnemyInstance, EnemyObject, EnemyType } from "../Utils/TsTypes";
import { Enemy } from "./EnemyAi";

export class EnemySpawner {
  enemyArray: EnemyObject[] = [];
  enemyBasic: EnemyType = {
    image: new Image(),
    title: "basic",
  };
  enemyBasicArray: EnemyInstance[] = [];
  enemyBasic2: EnemyType = {
    image: new Image(),
    title: "basic2",
  };
  enemyBasic2Array: EnemyInstance[] = [];
  enemyBasicSpawnCD: number = 340;
  enemyBasicSpawn: number = 340;
  isEnemyBasicReady: boolean = true;
  enemyBasic2Spawn: number = 540;
  isEnemyBasic2Ready: boolean = false;

  constructor(enemyArray: EnemyObject[]) {
    this.setEnemy();
    this.enemyArray = enemyArray;
  }

  setEnemy() {
    for (let i = 0; i < 1; i++) {
      if (i === 0) {
        this.enemyBasic.image = levelImages.images.enemy1;
      }
      if (i === 1) {
        this.enemyBasic.image = levelImages.images.enemy2;
      }
    }
  }

  enemySpawnCooldown(whichEnemy: string) {
    if (whichEnemy === "basic") {
      console.log(this.enemyBasicSpawn);
      this.enemyBasicSpawn--;
      if (this.enemyBasicSpawn === 0) {
        this.enemyBasicSpawn = this.enemyBasicSpawnCD;
        this.isEnemyBasicReady = true;
      }
    }
    if (whichEnemy === "basic2") {
      this.enemyBasic2Spawn--;
      if (this.enemyBasic2Spawn === 0) {
        this.enemyBasic2Spawn = 60;
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
      console.log(enemy);
    }
    if (whichEnemy === "basic2") {
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
    }
  }

  spawnEnemies() {
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
  }

  renderEnemies() {
    if (canvasContext) {
      this.enemyBasicArray.forEach((enemy) => {
        enemy.enemySprite.drawImage(
          canvasContext,
          enemy.enemySprite.position.x,
          enemy.enemySprite.position.y
        );

        enemy.followPlayer();
      });
    }
  }
}
