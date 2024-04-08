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

export type EnemyAttack = {
  enemyDamage: number;
  enemyAttackCooldown: number;
  isEnemyAttackOnCooldown: boolean;
};

export type EnemyObject = {
  position: { x: number; y: number };
  enemyAttack: EnemyAttack;
};

export type SpriteType = {
  spriteImage: HTMLImageElement;
  frameSize: Vector;
  scale: number;
  position: Coordinates;
};

export type SpriteMethods = {
  spriteImage: HTMLImageElement;
  frameSize: Vector;
  scale: number;
  position: Coordinates;
  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void;
};

export type PlayerMovementMethods = {
  direction: string;
  playerMovement(): void;
};

export type PlayerSpellMethods = {
  spell: string;
  spellsOnCooldown: string[];
  playerShieldDuration: number;
  playerShieldCooldown: number;
  playerShieldAmount: number;
  activateSpellCooldown(): void;
};
