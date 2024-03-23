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
    resource: any, // to je slika
    frameSize: any = new Vector2(16, 16), // velicina frame-a znaci 32px x 32px
    hFrames: number = 1, // koliko spritesheet ima horizontalnih frejmova
    vFrames: number = 1, // koliko spritesheet ima vertikalnih frejmova
    frame: number = 0, // koji je trenutni frame na spritesheetu
    frameMap: Map<number, number> = new Map(), // mapa koja odreduje poziciju za svaki frame na spritesheetu
    scale: any = 1, // velicina
    position: any = new Vector2() // pozicija spritea na canvasu
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
    let frameX = 0;
    let frameY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame.x > 0 || frame.y > 0) {
      frameX = frame.x;
      frameY = frame.y;
    }

    ctx.drawImage(
      this.resource.image,
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
