import { shipPosition } from "../Level/LevelLogic/mainLevelLogic";
import { ProjectileArray } from "../Utils/TsTypes";

// prj -> projectile, L - left, R - right
export class Projectile {
  prjDirections: any = {
    prjL: [{ x: 0, y: 0 }],
    prjR: [{ x: 0, y: 0 }],
  };
  prjSpeed: number = 15;
  prjAmount: number = 1;
  isFiring: boolean = false;
  fireRate: number = 0;
  isReady: boolean = false;
  isRendered: boolean = false;
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
      /*ctx.save();
      ctx.translate(projectileArray[i].x, projectileArray[i].y);

      if (projectileArray[i].rotation > 0) {
        ctx.rotate(projectileArray[i].rotation);
      }
*/
      ctx.drawImage(
        projectileImage,
        projectileArray[i].x,
        projectileArray[i].y
      );

      //ctx.restore();
    }
  }

  fireProjectile = () => {
    if (!this.isFiring) this.isFiring = true;
    const distanceToEndOfScreen = shipPosition.y + 34 * 2;

    this.prjDirections.prjL[0].y -= this.prjSpeed;
    this.prjDirections.prjR[0].y -= this.prjSpeed;
    this.fireRate += this.prjSpeed;

    this.projectileCollisionDetection();

    if (this.fireRate >= distanceToEndOfScreen) {
      this.fireRate = 0;
      this.isFiring = false;
      this.updateProjectileBaseCoordinates();
    }
  };

  /*updateProjectileAmount = () => {
    const projectileObject = {
      x: 0,
      y: 0,
      rotation: 0,
    };
    for (let i = 0; i < this.prjAmount; i++) {
      this.prjDirections.prjL.push({
        ...projectileObject,
      });
      this.prjDirections.prjR.push({
        ...projectileObject,
      });
    }
    console.log(this.prjDirections);
    this.updateProjectileBaseCoordinates();
  };*/

  updateProjectileBaseCoordinates() {
    this.prjDirections.prjL[0].x = shipPosition.x + 7;
    this.prjDirections.prjL[0].y = shipPosition.y + 10;

    this.prjDirections.prjR[0].x = shipPosition.x + 55;
    this.prjDirections.prjR[0].y = shipPosition.y + 10;
    /*switch (this.prjAmount) {
      case 1:
        this.updateSingleProjectileCoordinates();
        break;
      case 2:
        this.updateSingleProjectileCoordinates();
        break;
      case 3:
        this.updateSingleProjectileCoordinates();
        break;
      case 4:
        this.updateSingleProjectileCoordinates();
        break;
    }*/

    if (!this.isReady) {
      this.isReady = true;
    }
  }

  /*updateSingleProjectileCoordinates = () => {
    for (let i = 0; i < this.prjAmount; i++) {
      this.prjDirections.prjL[i].x = shipPosition.x + 7;
      this.prjDirections.prjL[i].y = shipPosition.y + 10;

      this.prjDirections.prjR[i].x = shipPosition.x + 55;
      this.prjDirections.prjR[i].y = shipPosition.y + 10;

      switch (i) {
        case 0:
          this.prjDirections.prjL[i].rotation = (345 * Math.PI) / 180;
          this.prjDirections.prjR[i].rotation = (5 * Math.PI) / 180;
          break;
        case 2:
          this.prjDirections.prjL[i].rotation = (200 * Math.PI) / 180;
          this.prjDirections.prjR[i].rotation = (20 * Math.PI) / 180;
          break;
        case 3:
          this.prjDirections.prjL[i].rotation = (210 * Math.PI) / 180;
          this.prjDirections.prjR[i].rotation = (30 * Math.PI) / 180;
          break;
      }
    }
    
  };*/

  projectileCollisionDetection() {}
}
