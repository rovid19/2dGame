/**
 * @jest-environment jsdom
 */
import { Projectile } from "../Projectile";

describe("checking why projectileDistanceTraveled isn't bigger or equal to distanceToTheEndOfScreen, but it still goes as true", () => {
  const projectile = new Projectile();
  projectile.prjDirections.prjL[0].y = 800;
  projectile.prjDirections.prjR[0].y = 800;
  projectile.prjSpeed = 15;
  projectile.projectileDistanceTraveled = 0;
  projectile.isFiring = false;
  projectile.targetHit = false;
});
