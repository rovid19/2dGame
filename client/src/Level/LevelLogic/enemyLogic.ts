import { canvasContext, enemy1, enemy2, enemy3 } from "./mainLevelLogic";

export function renderEnemy() {
  if (canvasContext) {
    enemy1.enemySprite.drawImage(
      canvasContext,
      enemy1.enemySprite.position.x,
      enemy1.enemySprite.position.y
    );
    enemy1.followPlayer();
    enemy1.setEnemyAttackOnCooldown();
    /*enemy2.enemySprite.drawImage(
      canvasContext,
      enemy2.enemySprite.position.x,
      enemy2.enemySprite.position.y
    );
    enemy2.followPlayer();
    enemy2.setEnemyAttackOnCooldown();

    enemy3.enemySprite.drawImage(
      canvasContext,
      enemy3.enemySprite.position.x,
      enemy3.enemySprite.position.y
    );
    enemy3.followPlayer();
    enemy3.setEnemyAttackOnCooldown();*/
  }
}
