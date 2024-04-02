import { projectiles, shipPosition } from "../Level/LevelLogic/mainLevelLogic";
import { SpriteMethods, SpriteType, Vector } from "../Utils/TsTypes";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Enemy {
  sprite: SpriteMethods;
  health: number = 100;
  maxHealth: number = 100;
  speed: number = 0;
  damage: number = 10;
  position: Vector = { x: 0, y: 0 };
  hpBarDiv: HTMLElement = {} as HTMLElement;
  hpBar: HTMLElement = {} as HTMLElement;
  hpBarWidth: number = 0;
  hpBarPercentage: number = 100;
  hitboxX: number = 0;
  hitboxY: number = 0;

  constructor(
    speed: number,
    enemyImage: string,
    frameHeight: number,
    frameWidth: number
  ) {
    this.sprite = new Sprite(enemyImage, new Vector2(frameHeight, frameWidth));
    this.speed = speed;
  }

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
  }

  collisionDetection() {}
  updateEnemyCoordinates(enemyPosition: Vector) {
    this.position = enemyPosition;
  }

  renderHealthBar = () => {
    // container
    const hpBarContainer = document.createElement("div");
    this.hpBarDiv = hpBarContainer;
    document.body.appendChild(hpBarContainer);
    hpBarContainer.className = "hpBarContainer";
    hpBarContainer.style.top = `${this.position.y}px`;
    hpBarContainer.style.left = `${this.position.x}px`;
    hpBarContainer.style.width = `${this.hpBarWidth}px`;

    // hpbar
    const hpBar = document.createElement("div");
    this.hpBar = hpBar;
    hpBar.className = "hpBar";
    hpBarContainer.appendChild(this.hpBar);
  };

  moveHealthBarWithEnemy = () => {
    this.hpBarDiv.style.top = `${this.position.y - 5}px`;
    this.hpBarDiv.style.left = `${this.position.x}px`;
  };

  createHitboxForEnemy = (enemy: string, scale: number) => {
    switch (enemy) {
      case "basic":
        this.hitboxY = 35 * scale;
        this.hitboxX = 30 * scale;
        this.hpBarWidth = 27 * scale;
        break;
      case "basic2":
        this.hitboxY = 51 * scale;
        this.hitboxX = 59 * scale;
        this.hpBarWidth = 56 * scale;
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
    const halfOfHitboxX = this.hitboxX / 2;
    const halfOfHitboxY = this.hitboxY / 2;
    let currentX = this.position.x;
    let currentY = this.position.y;
    const hitboxArrayX = [] as number[];
    const hitboxArrayY = [] as number[];

    this.returnArrayOfHitboxNumbers(currentX, halfOfHitboxX, hitboxArrayX);
    this.returnArrayOfHitboxNumbers(currentY, halfOfHitboxY, hitboxArrayY);

    if (
      hitboxArrayX.includes(
        projectiles.prjDirections["prjL"][0].x ||
          projectiles.prjDirections["prjR"][0].x
      )
    ) {
      console.log("da");
      if (
        hitboxArrayY.includes(
          projectiles.prjDirections["prjL"][0].y ||
            projectiles.prjDirections["prjR"][0].y
        )
      ) {
        projectiles.targetHit = true;
        this.takeDamage();
      }
    }

    if (this.health <= 0) {
      this.removeEnemy();
    }
  };

  returnArrayOfHitboxNumbers(
    currentPosition: number,
    hitbox: number,
    hitboxArray: number[]
  ) {
    for (let i = 0; i < hitbox; i++) {
      hitboxArray.push(currentPosition);
      currentPosition--;
    }

    currentPosition = this.position.x + 1;

    for (let i = 0; i < hitbox; i++) {
      hitboxArray.push(currentPosition);
      currentPosition++;
    }
  }

  takeDamage = () => {
    this.health -= projectiles.prjDamage;

    console.log(this.health);

    // calculate missing hp in percentages
    const damageTaken = (projectiles.prjDamage / this.maxHealth) * 100;

    this.hpBar.style.width = `${this.hpBarPercentage - damageTaken}%`;
    this.hpBarPercentage = this.hpBarPercentage - damageTaken;
  };

  removeEnemy = () => {};
}
