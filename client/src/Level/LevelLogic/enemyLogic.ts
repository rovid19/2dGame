import {
  canvasContext,
  enemy1,
  enemy1Sprite,
  enemy2,
  enemy2Sprite,
} from "./mainLevelLogic";

export function renderEnemy() {
  if (canvasContext) {
    enemy1.renderEnemy(canvasContext, enemy1Sprite.resource.image, 0, 0);
    enemy2.renderEnemy(canvasContext, enemy2Sprite.resource.image, 50, 0);
  }
}
