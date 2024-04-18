import {
  canvasContext,
  enemySpawner,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../Utils/OftenUsed";
import { SpriteMethods, Vector } from "../Utils/TsTypes";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Projectile {
  prjSprite: SpriteMethods;
  prjDirectionsLeft: Vector = { x: 0, y: 0 };
  prjDirectionsRight: Vector = { x: 0, y: 0 };
  prjSpeed: number = 15;
  prjDamage: number = 16;
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
  prjHitboxX: number = 45;
  prjHitboxY: number = 45;
  prjArrHitboxXleft: number[] = [];
  prjArrHitboxXright: number[] = [];
  prjArrHitboxYleft: number[] = [];
  prjArrHitboxYright: number[] = [];

  constructor(
    shipPosition: Vector,
    projectileImage: HTMLImageElement,
    frameHeight: number,
    frameWidth: number,
    scale: number
  ) {
    this.shipPosition = shipPosition;
    this.prjSprite = new Sprite(
      projectileImage,
      new Vector2(frameHeight, frameWidth),
      scale
    );
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

  renderProjectile = () => {
    if (!this.isRendered) this.isRendered = true;
    if (this.isFiring) {
      this.firingAnimation();
    }

    this.prjSprite.drawImage(
      canvasContext,
      this.prjDirectionsLeft.x,
      this.prjDirectionsLeft.y
    );
    this.prjSprite.drawImage(
      canvasContext,
      this.prjDirectionsRight.x,
      this.prjDirectionsRight.y
    );
  };

  firingAnimation = () => {
    // return projectiles to ship position
    if (this.targetHit) {
      this.updateProjectileBaseCoordinates();
    } else {
      // fire projectile
      if (!this.isFiring) this.isFiring = true;

      this.prjDirectionsLeft.y -= this.prjSpeed;
      this.prjDirectionsRight.y -= this.prjSpeed;
      this.projectileDistanceTraveled += this.prjSpeed;

      this.setProjectileHitboxArray();
      this.checkIfProjectileHitEnemy();

      if (this.projectileDistanceTraveled >= this.distanceToEndOfScreen) {
        this.targetHitOrProjectileOutsideOFScreen();
      }
    }
  };

  targetHitOrProjectileOutsideOFScreen() {
    this.isReloading = true;
    this.projectileDistanceTraveled = 0;
    this.isFiring = false;
    this.updateProjectileBaseCoordinates();
  }

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
      if (this.targetHit) this.targetHit = false;
      this.distanceToEndOfScreen = this.shipPosition.y + 34 * 2;
      this.calculateSpeedOfProjectilesBasedOnSpaceshipPosition();
      this.firingAnimation();
    } else {
      console.log("reloading");
    }
  }

  checkIfProjectileHitEnemy() {
    enemySpawner.enemyArray.forEach((item) => {
      item.forEach((enemy, i) => {
        if (
          this.prjArrHitboxYleft.includes(
            Math.round(enemy.enemySprite.position.y)
          )
        ) {
          if (
            this.prjArrHitboxXleft.includes(
              Math.round(enemy.enemySprite.position.x)
            ) ||
            this.prjArrHitboxXright.includes(
              Math.round(enemy.enemySprite.position.x)
            )
          ) {
            this.targetHit = true;
            enemy.takeDamage(item, i);
            this.targetHitOrProjectileOutsideOFScreen();
          }
        }
      });
    });
  }

  resetProjectile() {
    this.prjDirectionsLeft = { x: 0, y: 0 };
    this.prjDirectionsRight = { x: 0, y: 0 };
    this.prjSpeed = 15;
    this.prjDamage = 50;
    this.prjAmount = 1;
    this.prjReloadCooldown = 10;
    this.prjReloadSpeed = 20;
    this.isReloading = false;
    this.isFiring = false;
    this.projectileDistanceTraveled = 0;
    this.isReady = false;
    this.isRendered = false;
    this.targetHit = false;
    this.shipPosition = shipPosition;
    this.distanceToEndOfScreen = 0;
    this.prjHitboxX = 45;
    this.prjHitboxY = 45;
    this.prjArrHitboxXleft = [];
    this.prjArrHitboxXright = [];
    this.prjArrHitboxYleft = [];
    this.prjArrHitboxYright = [];
    this.prjSprite.scale = 1.2;

    this.updateProjectileBaseCoordinates();
  }

  increaseProjectileSizeAndHitbox(value: number) {
    const valueInPercentage = value / 100;
    const increaseScaleBy = this.prjSprite.scale * valueInPercentage;
    this.prjSprite.scale = this.prjSprite.scale + increaseScaleBy;

    const increaseHitbox = this.prjHitboxX * valueInPercentage;
    this.prjHitboxX = this.prjHitboxX + increaseHitbox;
    this.prjHitboxY = this.prjHitboxY + increaseHitbox;

    console.log(this.prjHitboxX, this.prjHitboxY, this.prjSprite.scale);
  }
}
