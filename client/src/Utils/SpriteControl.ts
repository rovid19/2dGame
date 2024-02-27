class SpriteControl {
  resource: any;
  frameSize: any;
  hFrames: any;
  vFrames: any;
  frame: any;
  frameMap: any;
  scale: any;
  position: any;
  constructor(
    resource: any,
    frameSize: any,
    hFrames: any,
    vFrames: any,
    frame: any,
    frameMap: any,
    scale: any,
    position: any
  ) {
    this.resource = resource;
    this.frameSize = frameSize;
    this.hFrames = hFrames;
    this.vFrames = vFrames;
    this.frame = new Map();
    this.frameMap = frameMap;
    this.scale = scale;
    this.position = position;
  }
}
