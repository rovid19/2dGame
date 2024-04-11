import { HUD, projectiles } from "../Level/LevelLogic/mainLevelLogic";
import { levelStore } from "../Stores/LevelStore";
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
  reloadElementPercentage: number = 100;
  reloadElementMaxPercentage: number = 100;
  isFiring: boolean = false;
  projectileDistanceTraveled: number = 0;
  isReady: boolean = false;
  isRendered: boolean = false;
  targetHit: boolean = false;
  shipPosition: Vector = new Vector2();
  distanceToEndOfScreen: number = 0;
  constructor(shipPosition: Vector) {
    this.shipPosition = shipPosition;
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
    // return projectiles to ship position
    if (this.targetHit) {
      this.updateProjectileBaseCoordinates();
    } else {
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
    }
  };

  updateProjectileBaseCoordinates() {
    this.prjDirectionsLeft.x = this.shipPosition.x + 7;
    this.prjDirectionsLeft.y = this.shipPosition.y + 10;

    this.prjDirectionsRight.x = this.shipPosition.x + 55;
    this.prjDirectionsRight.y = this.shipPosition.y + 10;

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

      this.renderReloadHudElement();
      if (this.prjReloadCooldown === 0) {
        this.isReloading = false;
        this.prjReloadCooldown = this.prjReloadSpeed;
        this.reloadElementPercentage = 100;
        HUD.playerReloadBarFiller.style.width = `95%`;
      }
    }
  };

  renderReloadHudElement() {
    const reduceMaxReloadPercentageBy = 100 / this.prjReloadSpeed;
    this.reloadElementPercentage =
      this.reloadElementPercentage - reduceMaxReloadPercentageBy;
    HUD.playerReloadBarFiller.style.width = `${this.reloadElementPercentage}%`;
  }

  fireProjectile() {
    if (!this.isReloading) {
      this.distanceToEndOfScreen = this.shipPosition.y + 34 * 2;
      this.calculateSpeedOfProjectilesBasedOnSpaceshipPosition();
      this.firingAnimation();
    } else {
      console.log("reloading");
    }
  }
}
