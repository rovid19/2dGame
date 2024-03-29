import { animationLoop } from "../../Classes/AnimationLoop";
import { projectile } from "./mainLevelLogic";
import { canvasContext } from "./mainLevelLogic";
import { projectiles } from "./mainLevelLogic";
export const placeHolderFunction = () => {};

const renderProjectilesLoop = new animationLoop(
  placeHolderFunction,
  renderProjectiles
);

renderProjectilesLoop.start();

function renderProjectiles(): void {
  if (!canvasContext || !projectiles) {
  } else {
    if (projectiles.isFiring) {
      projectiles.fireProjectile();
    }

    projectiles.renderLeftProjectile(
      canvasContext,
      projectile.resource.image,
      projectiles.prjDirections.prjL["1"].x,
      projectiles.prjDirections.prjL["1"].y
    );
    projectiles.renderRightProjectile(
      canvasContext,
      projectile.resource.image,
      projectiles.prjDirections.prjR["1"].x,
      projectiles.prjDirections.prjR["1"].y
    );
  }
}
