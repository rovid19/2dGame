import {
  canvasContext,
  enemy1,
  enemy1Sprite,
  enemy2,
  enemy2Sprite,
  enemy3,
  enemy3Sprite,
} from "./mainLevelLogic";

export function renderEnemy() {
  if (canvasContext) {
    enemy1Sprite.drawImage(
      canvasContext,
      enemy1Sprite.position.x,
      enemy1Sprite.position.y
    );
    enemy1.followPlayer();
    enemy2Sprite.drawImage(
      canvasContext,
      enemy2Sprite.position.x,
      enemy2Sprite.position.y
    );
    //enemy2.followPlayer();

    enemy3Sprite.drawImage(
      canvasContext,
      enemy3Sprite.position.x,
      enemy3Sprite.position.y
    );
    //enemy3.followPlayer();
  }
}
