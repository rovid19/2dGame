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

interface Coordinates {
  x: number;
  y: number;
  rotation: number;
}

export type ProjectileArray = {
  [key: string]: Coordinates[];
};

export type EnemyObject = {
  health: number;
  maxHealth: number;
  speed: number;
  damage: number;
  position: Vector;
  hpBarDiv: HTMLElement;
  hpBar: HTMLElement;
  hpBarWidth: number;
  hpBarPercentage: number;
  hitboxX: number;
  hitboxY: number;
};
