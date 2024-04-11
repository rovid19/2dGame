import { projectile } from "./mainLevelLogic";
import { canvasContext } from "./mainLevelLogic";
import { projectiles } from "./mainLevelLogic";

export const placeHolderFunction = () => {};

export function renderProjectiles(): void {
  if (!canvasContext || !projectiles) {
  } else {
    if (projectiles.isFiring) {
      projectiles.firingAnimation();
    }

    projectiles.renderProjectile(
      canvasContext,
      projectile.spriteImage.image,
      projectiles.prjDirectionsLeft.x,
      projectiles.prjDirectionsLeft.y
    );
    projectiles.renderProjectile(
      canvasContext,
      projectile.spriteImage.image,
      projectiles.prjDirectionsRight.x,
      projectiles.prjDirectionsRight.y
    );
  }
}
