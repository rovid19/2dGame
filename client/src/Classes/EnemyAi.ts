import {
  enemyPositionArray,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { Vector } from "../Utils/TsTypes";

export class Enemy {
  health: number = 100;
  speed: number = 0;
  damage: number = 1;
  position: Vector = { x: 0, y: 0 };
  hpBarDiv: HTMLElement = {} as HTMLElement;
  hitboxX: number = 0;
  hitboxY: number = 0;

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
    this.moveHealthBarWithEnemy();
    this.checkIfHitByProjectile();

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

  renderHealthBar = () => {
    const div = document.createElement("div");
    this.hpBarDiv = div;
    document.body.appendChild(div);
    div.className = "enemyHpBar";
    div.style.top = `${this.position.y}px`;
    div.style.left = `${this.position.x}px`;
  };

  moveHealthBarWithEnemy = () => {
    this.hpBarDiv.style.top = `${this.position.y}px`;
    this.hpBarDiv.style.left = `${this.position.x}px`;
  };

  createHitboxForEnemy = (enemy: string) => {
    switch (enemy) {
      case "basic":
        break;
      case "basic2":
        this.hitboxX = 56 * 2;
        this.hitboxY = 51 * 2;
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

  checkIfHitByProjectile = () => {
    const hitboxArrayX = [] as number[];
    const hitboxArrayY = [] as number[];
    const halfOfHitboxX = this.hitboxX / 2;
    const halfOfHitboxY = this.hitboxY / 2;
    let currentX = this.position.x;
    let currentY = this.position.y;

    for (let i = 0; i < halfOfHitboxX; i++) {
      hitboxArrayX.push(currentX);
      currentX--;
    }

    currentX = this.position.x + 1;

    for (let i = 0; i < halfOfHitboxX; i++) {
      hitboxArrayX.push(currentX);
      currentX++;
    }

    for (let i = 0; i < halfOfHitboxY; i++) {
      hitboxArrayX.push(currentY);
      currentY--;
    }

    currentY = this.position.y + 1;

    for (let i = 0; i < halfOfHitboxY; i++) {
      hitboxArrayY.push(currentY);
      currentY++;
    }

    if (
      hitboxArrayX.includes(
        projectiles.prjDirections["prjL"][0].x ||
          projectiles.prjDirections["prjR"][0].x
      )
    ) {
      if (
        hitboxArrayY.includes(
          projectiles.prjDirections["prjL"][0].y ||
            projectiles.prjDirections["prjR"][0].y
        )
      )
        projectiles.targetHit = true;
      console.log("kabooom");
    }
  };
}
