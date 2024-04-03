import { canvasContext, enemy1, enemy2, enemy3 } from "./mainLevelLogic";

export function renderEnemy() {
  if (canvasContext) {
    enemy1.sprite.drawImage(
      canvasContext,
      enemy1.sprite.position.x,
      enemy1.sprite.position.y
    );
    enemy1.followPlayer();
    enemy2.sprite.drawImage(
      canvasContext,
      enemy2.sprite.position.x,
      enemy2.sprite.position.y
    );
    enemy2.followPlayer();

    enemy3.sprite.drawImage(
      canvasContext,
      enemy3.sprite.position.x,
      enemy3.sprite.position.y
    );
    //enemy3.followPlayer();
  }
}
