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
  removeEventListener(): void;
  resetSpells(): void;
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
  takeDamage(item: EnemyInstance[], i: number): void;
  followPlayer(): void;
};

export type InputType = {
  direction: string;
  fireProjectile: boolean;
  playerInput(): void;
  playerMovement(): void;
  removeEventListenerAndHardcodeShipPosition(): void;
  resetInput(): void;
};

export type InputSpellType = {
  spell: string;
  spellsOnCooldown: string[];
  playerShieldAmount: number;
  playerShieldCooldown: number;
  playerShieldDuration: number;
  intervalRunning: boolean;
  activateSpell(spellValue: string): void;
  setActiveSpell(spellValue: string): void;
  activateSpellCooldown(): void;
  cooldownTimerCounter(): void;
};
