import {
  generateUniqueNumbers,
  shuffleArray,
} from "../Level/LevelLogic/canvasLogic";
import { enemy1Sprite, shipPosition } from "../Level/LevelLogic/mainLevelLogic";
import { Vector } from "../Utils/TsTypes";

export class Enemy {
  health: number = 100;
  speed: number = 0;
  damage: number = 1;
  position: Vector = { x: 0, y: 0 };

  constructor(speed: number) {
    this.speed = speed;
  }

  // follow player logic
  followPlayer() {
    if (shipPosition.y > this.position.y) {
      this.position.y += this.speed;
    }

    if (shipPosition.y < this.position.y) {
      this.position.y -= this.speed;
    }

    if (shipPosition.x > this.position.x) {
      this.position.x += this.speed;
    }

    if (shipPosition.x < this.position.x) {
      this.position.x -= this.speed;
    }
    /*const biggerY = this.followBiggerOnY;
    const smallerY = this.followSmallerOnY;
    const biggerX = this.followBiggerOnX;
    const smallerX = this.followSmallerOnX;

    const enemyPath = [biggerY, smallerY, biggerX, smallerX];

    const uniqueNumberArray = generateUniqueNumbers(4);

    uniqueNumberArray.forEach((number) => {
      enemyPath[number]();
    });*/
  }
  // ova 4 if statementa stavljeni unutar funckija da bi mogao
  // randomizirati walking trajectory svakog enemya posebno
  /*followBiggerOnY = () => {
    console.log("1");
    if (shipPosition.y > this.position.y) {
      this.position.y += this.speed;
    }
  };
  followSmallerOnY = () => {
    console.log("2");
    if (shipPosition.y < this.position.y) {
      this.position.y -= this.speed;
    }
  };
  followBiggerOnX = () => {
    console.log("3");
    if (shipPosition.x > this.position.x) {
      this.position.x += this.speed;
    }
  };
  followSmallerOnX = () => {
    console.log("4");
    if (shipPosition.x < this.position.x) {
      this.position.x -= this.speed;
    }
  };*/

  //
  //
  //

  collisionDetection() {}
  updateEnemyCoordinates(enemyPosition: Vector) {
    this.position = enemyPosition;
  }
}
