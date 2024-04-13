import { Vector2 } from "three";
import { Coordinates, SpriteMethods, Vector } from "../Utils/TsTypes";
import { width } from "../Level/LevelLogic/canvasLogic";

export class Sprite implements SpriteMethods {
  spriteImage: any = {};
  frameSize: Vector = new Vector2();
  scale: number = 0;
  position: Coordinates = { x: 0 + Math.random() * (width - 0), y: -100 };
  constructor(image: HTMLImageElement, frameSize: Vector, scale: number) {
    this.spriteImage = image;
    this.frameSize = frameSize;
    this.scale = scale;
  }

  createImage() {}

  drawImage(ctx: any, x: number, y: number) {
    if (!this.spriteImage.isLoaded) {
      return;
    }

    ctx.drawImage(
      this.spriteImage.image,
      0,
      0,
      this.frameSize.x, // how much to crop from sprite sheet
      this.frameSize.y, // same crop
      x, // where to place sprite on canvas
      y, // same place
      this.frameSize.x * this.scale, //how large to scale it
      this.frameSize.y * this.scale // same scale
    );
  }
}

/*
canvasContext?.drawImage(
hero, - slika
64, 0, - x i y os na spritesheetu
32, 32, - how big of a grab
0, 0, - where do you want your crop to be placed
32, 32 - size of a grab
);
*/
