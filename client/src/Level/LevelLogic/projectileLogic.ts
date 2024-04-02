import { animationLoop } from "../../Classes/AnimationLoop";
import { projectile } from "./mainLevelLogic";
import { canvasContext } from "./mainLevelLogic";
import { projectiles } from "./mainLevelLogic";
export const placeHolderFunction = () => {};

/*const renderProjectilesLoop = new animationLoop(
  placeHolderFunction,
  renderProjectiles
);

renderProjectilesLoop.start();*/

export function renderProjectiles(): void {
  if (!canvasContext || !projectiles) {
  } else {
    if (projectiles.isFiring) {
      projectiles.fireProjectile();
    }

    projectiles.renderProjectile(
      canvasContext,
      projectile.spriteImage.image,
      projectiles.prjDirections.prjL,
      projectiles.prjAmount
    );
    projectiles.renderProjectile(
      canvasContext,
      projectile.spriteImage.image,
      projectiles.prjDirections.prjR,
      projectiles.prjAmount
    );
  }
}
