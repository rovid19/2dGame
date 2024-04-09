import { shipPosition } from "../Level/LevelLogic/mainLevelLogic";
import { ProjectileArray } from "../Utils/TsTypes";

// prj -> projectile, L - left, R - right
export class Projectile {
  prjDirections: any = {
    prjL: [{ x: 0, y: 0 }],
    prjR: [{ x: 0, y: 0 }],
  };
  prjSpeed: number = 15;
  prjDamage: number = 10;
  prjAmount: number = 1;
  isFiring: boolean = false;
  projectileDistanceTraveled: number = 0;
  isReady: boolean = false;
  isRendered: boolean = false;
  targetHit: boolean = false;
  constructor() {}

  renderProjectile = (
    ctx: CanvasRenderingContext2D,
    projectileImage: HTMLImageElement,
    projectileArray: ProjectileArray,
    projectileAmount: number
  ) => {
    if (!this.isRendered) this.isRendered = true;
    switch (projectileAmount) {
      case 1:
        this.drawProjectile(
          ctx,
          projectileImage,
          projectileArray,
          projectileAmount
        );
        break;
      case 2:
        this.drawProjectile(
          ctx,
          projectileImage,
          projectileArray,
          projectileAmount
        );

        break;
      case 3:
        this.drawProjectile(
          ctx,
          projectileImage,
          projectileArray,
          projectileAmount
        );
        break;
      case 4:
        this.drawProjectile(
          ctx,
          projectileImage,
          projectileArray,
          projectileAmount
        );
        break;
    }
  };

  drawProjectile(
    ctx: CanvasRenderingContext2D,
    projectileImage: HTMLImageElement,
    projectileArray: ProjectileArray,
    projectileAmount: number
  ) {
    for (let i = 0; i < projectileAmount; i++) {
      ctx.drawImage(
        projectileImage,
        projectileArray[i].x,
        projectileArray[i].y
      );
    }
  }

  fireProjectile = () => {
    // return projectiles to ship position
    if (this.targetHit) {
      this.updateProjectileBaseCoordinates();
    } else {
      // fire projectile
      if (!this.isFiring) this.isFiring = true;

      const distanceToEndOfScreen = shipPosition.y + 34 * 2;

      this.prjDirections.prjL[0].y -= this.prjSpeed;
      this.prjDirections.prjR[0].y -= this.prjSpeed;
      this.projectileDistanceTraveled += this.prjSpeed;

      if (this.projectileDistanceTraveled >= distanceToEndOfScreen) {
        this.projectileDistanceTraveled = 0;
        this.isFiring = false;
        this.updateProjectileBaseCoordinates();
      }
    }
  };

  updateProjectileBaseCoordinates() {
    this.prjDirections.prjL[0].x = shipPosition.x + 7;
    this.prjDirections.prjL[0].y = shipPosition.y + 10;

    this.prjDirections.prjR[0].x = shipPosition.x + 55;
    this.prjDirections.prjR[0].y = shipPosition.y + 10;

    if (!this.isReady) {
      this.isReady = true;
    }
  }
}
