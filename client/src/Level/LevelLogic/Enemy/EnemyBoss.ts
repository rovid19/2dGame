import { Enemy } from "./Enemy";

export class Boss extends Enemy {
  constructor(
    speed: number,
    enemyImage: HTMLImageElement,
    frameHeight: number,
    frameWidth: number,
    scale: number,
    enemy: string
  ) {
    super(speed, enemyImage, frameHeight, frameWidth, scale, enemy);
  }
}
