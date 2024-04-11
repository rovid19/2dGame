/**
 * @jest-environment jsdom
 */
import { Projectile } from "../Projectile";

describe("Projectile intermittent firing issue", () => {
  it("consistently resets projectileDistanceTraveled and isFiring after exceeding distance", () => {
    for (let testIteration = 0; testIteration < 100000; testIteration++) {
      const shipPosition = { x: 100, y: Math.floor(Math.random() * 1000) };
      const projectile = new Projectile(shipPosition);
      projectile.prjSpeed = 10 + Math.random() * 10; // Vary speed

      while (
        projectile.projectileDistanceTraveled < projectile.distanceToEndOfScreen
      ) {
        projectile.firingAnimation();
      }

      expect(projectile.projectileDistanceTraveled).toBe(0);
      expect(projectile.isFiring).toBe(false);
    }
  });
});
