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
  takeDamage(): void;
  isAlive: boolean;
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

export type EnemyType = {
  image: HTMLImageElement;
  title: string;
};

export type EnemyInstance = {
  enemySprite: SpriteMethods;
  enemyHp: number;
  enemyMaxHp: number;
  enemySpeed: number;
  enemyHpBarContainer: HTMLElement;
  enemyHpBarFillerContainer: HTMLElement;
  enemyHpBarFiller: HTMLElement;
  enemyHpBarWidth: number;
  enemyHpBarPercentage: number;
  enemyHitboxX: number;
  enemyHitboxY: number;
  enemyAttack: EnemyAttack;
  removeEnemy(): void;
  renderHealthBar(): void;
  takeDamage(): void;
  followPlayer(): void;
};
