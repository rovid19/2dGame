import { enemyArray } from "../Level/LevelLogic/mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../Utils/OftenUsed";
import { Vector } from "../Utils/TsTypes";
import { Vector2 } from "./Vector";

export class Projectile {
  prjDirectionsLeft: Vector = { x: 0, y: 0 };
  prjDirectionsRight: Vector = { x: 0, y: 0 };
  prjSpeed: number = 15;
  prjDamage: number = 10;
  prjAmount: number = 1;
  prjReloadCooldown: number = 30;
  prjReloadSpeed: number = 30;
  isReloading: boolean = false;
  isFiring: boolean = false;
  projectileDistanceTraveled: number = 0;
  isReady: boolean = false;
  isRendered: boolean = false;
  targetHit: boolean = false;
  shipPosition: Vector = new Vector2();
  distanceToEndOfScreen: number = 0;
  prjHitboxX: number = 32;
  prjHitboxY: number = 32;
  prjArrHitboxXleft: number[] = [];
  prjArrHitboxXright: number[] = [];
  prjArrHitboxYleft: number[] = [];
  prjArrHitboxYright: number[] = [];

  constructor(shipPosition: Vector) {
    this.shipPosition = shipPosition;
  }

  setProjectileHitboxArray() {
    this.prjArrHitboxXleft = [];
    this.prjArrHitboxXright = [];
    this.prjArrHitboxYleft = [];
    this.prjArrHitboxYright = [];
    returnArrayOfHitboxNumbers(
      Math.round(this.prjDirectionsLeft.x),
      this.prjHitboxX,
      this.prjArrHitboxXleft,
      Math.round(this.prjDirectionsLeft.x + 1)
    );

    returnArrayOfHitboxNumbers(
      Math.round(this.prjDirectionsRight.x),
      this.prjHitboxX,
      this.prjArrHitboxXright,
      Math.round(this.prjDirectionsRight.x + 1)
    );

    returnArrayOfHitboxNumbers(
      Math.round(this.prjDirectionsLeft.y),
      this.prjHitboxY,
      this.prjArrHitboxYleft,
      Math.round(this.prjDirectionsLeft.y + 1)
    );

    returnArrayOfHitboxNumbers(
      Math.round(this.prjDirectionsRight.y),
      this.prjHitboxY,
      this.prjArrHitboxYright,
      Math.round(this.prjDirectionsRight.y + 1)
    );
  }

  renderProjectile = (
    ctx: CanvasRenderingContext2D,
    projectileImage: HTMLImageElement,
    x: number,
    y: number
  ) => {
    if (!this.isRendered) this.isRendered = true;

    ctx.drawImage(projectileImage, x, y);
  };

  firingAnimation = () => {
    console.log("za dom");
    // return projectiles to ship position
    if (this.targetHit) {
      console.log("spremni");
      this.updateProjectileBaseCoordinates();
    } else {
      console.log("za");
      // fire projectile
      if (!this.isFiring) this.isFiring = true;

      this.prjDirectionsLeft.y -= this.prjSpeed;
      this.prjDirectionsRight.y -= this.prjSpeed;
      this.projectileDistanceTraveled += this.prjSpeed;

      if (this.projectileDistanceTraveled >= this.distanceToEndOfScreen) {
        this.isReloading = true;
        this.projectileDistanceTraveled = 0;
        this.isFiring = false;
        this.updateProjectileBaseCoordinates();
      }
      this.setProjectileHitboxArray();
      this.checkIfProjectileHitEnemy();
    }
  };

  updateProjectileBaseCoordinates() {
    this.prjDirectionsLeft.x = this.shipPosition.x + 7;
    this.prjDirectionsLeft.y = this.shipPosition.y + 10;

    this.prjDirectionsRight.x = this.shipPosition.x + 55;
    this.prjDirectionsRight.y = this.shipPosition.y + 10;

    this.setProjectileHitboxArray();
    if (!this.isReady) {
      this.isReady = true;
    }
  }

  calculateSpeedOfProjectilesBasedOnSpaceshipPosition = () => {
    if (this.shipPosition.y > 750) {
      this.prjSpeed = 20;
    } else if (this.shipPosition.y > 550) {
      this.prjSpeed = 18;
    } else if (this.shipPosition.y > 250) {
      this.prjSpeed = 16;
    } else {
      this.prjSpeed = 14;
    }
  };

  reloadProjectile = () => {
    if (this.isReloading) {
      this.prjReloadCooldown--;

      if (this.prjReloadCooldown === 0) {
        this.isReloading = false;
        this.prjReloadCooldown = this.prjReloadSpeed;
      }
    }
  };

  fireProjectile() {
    if (!this.isReloading) {
      this.targetHit = false;
      this.distanceToEndOfScreen = this.shipPosition.y + 34 * 2;
      this.calculateSpeedOfProjectilesBasedOnSpaceshipPosition();
      this.firingAnimation();
    } else {
      console.log("reloading");
    }
  }

  checkIfProjectileHitEnemy() {
    console.log("ka");
    enemyArray.forEach((enemy) => {
      if (this.prjArrHitboxYleft.includes(Math.round(enemy.position.y))) {
        if (
          this.prjArrHitboxXleft.includes(Math.round(enemy.position.x)) ||
          this.prjArrHitboxXright.includes(Math.round(enemy.position.x))
        ) {
          console.log(
            Math.round(enemy.position.x),
            Math.round(enemy.position.y),
            "X",
            this.prjArrHitboxXleft,
            this.prjArrHitboxXright,
            "Y",
            this.prjArrHitboxYleft,
            this.prjArrHitboxYright
          );

          this.targetHit = true;
        }
      }
    });
  }
}
