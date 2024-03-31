export class Enemy {
  health: number = 100;
  speed: number = 1;
  damage: number = 1;

  constructor() {}

  renderEnemy(
    ctx: CanvasRenderingContext2D,
    enemyImage: HTMLImageElement,
    x: number,
    y: number
  ) {
    ctx.drawImage(enemyImage, x, y);
  }
}
