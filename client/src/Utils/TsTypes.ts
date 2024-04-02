export type toLoadType = {
  [key: string]: string;
};

export type ImageInfo = {
  image: HTMLImageElement;
  isLoaded: boolean;
};

export type levelAssetsPath = {
  [key: string]: string;
};

export type isOutside = {
  isOutside: boolean;
  position: string;
  onWhichSide: string;
};

export type Vector = {
  x: number;
  y: number;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type ProjectileArray = {
  [key: string]: Coordinates[];
};

export type EnemyObject = {
  x: number;
  y: number;
  isAlive: boolean;
};

export type SpriteType = {
  spriteImage: HTMLImageElement;
  frameSize: Vector;
  scale: number;
  position: Coordinates;
};

export type SpriteMethods = {
  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void;
};
