import { Vector2 } from "three";

export class Sprite {
  resource: any;
  frameSize: any;
  hFrames: any;
  vFrames: any;
  frame: any;
  frameMap: Map<any, any>;
  scale: any;
  position: any;
  constructor(
    resource: any,
    frameSize: any = new Vector2(16, 16),
    hFrames: number = 1,
    vFrames: number = 1,
    frame: number = 0,
    frameMap: Map<number, number> = new Map(),
    scale: any = 1,
    position: any = new Vector2()
  ) {
    this.resource = resource;
    this.frameSize = frameSize;
    this.hFrames = hFrames;
    this.vFrames = vFrames;
    (this.frame = frame), (this.frameMap = frameMap);
    this.scale = scale;
    this.position = position;
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx: any, x: number, y: number) {
    if (!this.resource.isLoaded) {
      return;
    }

    // find correct sprite sheet frame to use
    let frameCordX = 0;
    let frameCordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCordX = this.frameSize.x;
      frameCordY = this.frameSize.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCordX,
      frameCordY,
      frameSizeX, // how much to crop from sprite sheet
      frameSizeY, // same crop
      x, // where to place sprite on canvas
      y, // same place
      frameSizeX * this.scale, //how large to scale it
      frameSizeY * this.scale // same scale
    );

    console.log(
      this.resource.image,
      frameCordX,
      frameCordY,
      frameSizeX,
      frameSizeY,
      x,
      y
    );
  }
}
