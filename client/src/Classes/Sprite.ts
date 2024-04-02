import { Vector2 } from "three";
import { Coordinates, SpriteMethods, Vector } from "../Utils/TsTypes";

export class Sprite implements SpriteMethods {
  spriteImage: any = {};
  frameSize: Vector = new Vector2();
  scale: number = 0;
  position: Coordinates = { x: 0, y: 0 };
  constructor(image: string, frameSize: Vector) {
    this.spriteImage = image;
    this.frameSize = frameSize;
  }

  drawImage(ctx: any, x: number, y: number) {
    if (!this.spriteImage.isLoaded) {
      return;
    }

    // find correct sprite sheet frame to use
    let frameX = 0;
    let frameY = 0;

    ctx.drawImage(
      this.spriteImage.image,
      frameX,
      frameY,
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
