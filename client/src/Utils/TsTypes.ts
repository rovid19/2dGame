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

export type EnemyType = {
  image: HTMLImageElement;
  title: string;
};

export type EnemyInstance = {
  enemySprite: SpriteMethods;
  enemyDamage: number;
  enemyAttackCooldown: number;
  isEnemyAttackOnCooldown: boolean;
  enemyExp: number;
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
  isEnemyAlive: boolean;
  whichEnemy: string;
  enemyAttack(): void;
  setEnemyAttackOnCooldown(): void;
  removeEnemy(item: EnemyInstance[], i: number): void;
  renderHealthBar(): void;
  takeDamage(item: EnemyInstance[], i: number, dmg: number): void;
  followPlayer(): void;
};

export type InputType = {
  direction: string;
  fireProjectile: boolean;
  playerInput(): void;
  playerMovement(): void;
  removeEventListener(): void;
  resetInput(): void;
  stopSpaceshipFromGoingOutsideOfScreen(): void;
};

export type SpellObject = {
  name: string;
  value: string;
};

export type InputSpellType = {
  projectile: SpellObject;
  spell1: SpellObject;
  spell2: SpellObject;
  spell3: SpellObject;
  rotateSpaceship: SpellObject;
  spell: string;
  spellsOnCooldown: string[];
  playerShieldAmount: number;
  playerShieldCooldown: number;
  playerShieldMaxCooldown: number;
  playerShieldDuration: number;
  activateSpell(spellValue: string): void;
  activateSpellCooldown(): void;
  cooldownTimerCounter(
    value: number,
    maxValue: number,
    spellHTML: HTMLElement
  ): void;
  renderSpells(): void;
  renderWalls(): void;
  removeEventListener(): void;
  resetSpells(): void;
  decreaseStatByPercentage(value: number): void;
  increaseSpellStats(name: string, value: number): void;
};

export type PowerUpType = {
  name?: string;
  description?: string;
  value?: number;
  rarity?: string;
};

export type Projectile = {
  prjDirectionsLeft: Vector;
  prjDirectionsRight: Vector;
  prjSpeed: number;
  prjDamage: number;
  prjAmount: number;
  prjReloadCooldown: number;
  prjReloadSpeed: number;
  isReloading: boolean;
  isFiring: boolean;
  projectileDistanceTraveled: number;
  isReady: boolean;
  isRendered: boolean;
  targetHit: boolean;
  shipPosition: Vector;
  distanceToEndOfScreen: number;
  prjHitboxX: number;
  prjHitboxY: number;
  prjArrHitboxXleft: number[];
  prjArrHitboxXright: number[];
  prjArrHitboxYleft: number[];
  prjArrHitboxYright: number[];
};
