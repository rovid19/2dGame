import { player, projectiles } from "../mainLevelLogic";
import { height, width } from "./canvasLogic";

export class GameOptimization {
  baseWidth: number = 1470;
  baseHeight: number = 832;
  scaleX: number = 0;
  scaleY: number = 0;
  scale: number = 2;
  projectileScale: number = 1.2;
  enemyBasicScale: number = 2.5;
  isIncrease: boolean = false;

  constructor() {
    this.calculateHeight();
    // this.calculateWidth();
    //this.adjustPlayerAccordingToScreenSize();
  }

  /*calculateWidth() {
    if (width === 1470) {
      console.log("base");
    } else {
      const newWidth = window.screen.width;
      let widthPercentage: number;
      if (newWidth > this.baseWidth) {
        widthPercentage = ((newWidth - this.baseWidth) / this.baseWidth) * 100;
        this.scaleX = widthPercentage;
        this.isIncrease = true;
        console.log("increase", width);
      } else {
        widthPercentage = ((this.baseWidth - newWidth) / this.baseWidth) * 100;
        this.differencePercentageWidth = widthPercentage;
        this.isIncrease = false;
        console.log("decrease", widthPercentage);
      }
    }
  }*/

  calculateHeight() {
    if (height === 832) {
      this.scaleY = 1;
      console.log("base");
    } else {
      const newHeight = window.screen.height;

      this.scaleY = newHeight / this.baseHeight;
      this.scale = this.scale * this.scaleY;
      this.projectileScale = this.projectileScale * this.scaleY;
      this.enemyBasicScale = this.enemyBasicScale * this.scaleY;
    }
  }

  adjustPlayerAccordingToScreenSize() {
    if (width === 1470 && height === 832) {
    } else {
      player.playerSpeed = player.playerSpeed * this.scaleY;
      projectiles.prjSpeed = projectiles.prjSpeed * this.scaleY;
      player.playerSpells.playerExplosionRadius =
        player.playerSpells.playerExplosionRadius * this.scaleY;
    }
  }

  defineScaleForSprites() {}
}
