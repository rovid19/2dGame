import { height } from "../Level/LevelLogic/canvasLogic";
import { shipPosition } from "../Level/LevelLogic/mainLevelLogic";

// prj -> projectile, L - left, R - right
export class Projectile {
  prjDirections: any = {
    prjL: { 1: { x: 0, y: 0 } },
    prjR: { 1: { x: 0, y: 0 } },
  };
  prjSpeed: number = 30;
  prjLAmount: number = 1;
  prjRAmount: number = 1;
  isFiring: boolean = false;
  fireRate: number = 0;
  isReady: boolean = false;
  constructor() {
    console.log("defined");
  }

  renderLeftProjectile = (
    ctx: CanvasRenderingContext2D,
    projectileImage: HTMLImageElement,
    x: number,
    y: number
  ) => {
    ctx.drawImage(projectileImage, x, y);
  };
  renderRightProjectile = (
    ctx: CanvasRenderingContext2D,
    projectileImage: HTMLImageElement,
    x: number,
    y: number
  ) => {
    ctx.drawImage(projectileImage, x, y);
  };

  fireProjectile = () => {
    if (!this.isFiring) this.isFiring = true;
    //const distanceToEndOfScreen = shipPosition.y + 44;

    this.prjDirections.prjL["1"].y -= this.prjSpeed;
    this.prjDirections.prjR["1"].y -= this.prjSpeed;
    this.fireRate += 1;
    if (this.fireRate === 30) {
      this.fireRate = 0;
      this.isFiring = false;
      this.updateProjectileBaseCoordinates();
    }
  };

  howManyProjectiles = () => {};

  updateProjectileBaseCoordinates() {
    this.prjDirections.prjL["1"].x = shipPosition.x + 7;
    this.prjDirections.prjL["1"].y = shipPosition.y + 10;

    this.prjDirections.prjR["1"].x = shipPosition.x + 55;
    this.prjDirections.prjR["1"].y = shipPosition.y + 10;

    if (!this.isReady) {
      this.isReady = true;
    }
  }
}
