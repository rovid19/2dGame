/**
 * @jest-environment jsdom
 */
import { Projectile } from "../Projectile";

describe("Projectile fireProjectile method under multiple invocations", () => {
  it("should maintain correct state over multiple firings with changing ship positions", () => {
    // Initial setup
    let shipPosition = { x: 100, y: 200 }; // Starting ship position
    const projectile = new Projectile(shipPosition);
    projectile.isFiring = true; // Simulate that firing has started
    projectile.targetHit = false; // Ensure target hasn't been hit initially

    // Define a function to update ship position to simulate movement
    const updateShipPosition = () => {
      shipPosition = { x: shipPosition.x + 5, y: shipPosition.y - 10 };
      projectile.updateProjectileBaseCoordinates(shipPosition); // Assuming you've adapted your class to accept dynamic shipPosition updates
    };

    // Simulate multiple firings and changing ship positions
    for (let i = 0; i < 100; i++) {
      // Update ship position before each firing
      updateShipPosition();

      // Calculate expected distance to end of screen based on current ship position
      const distanceToEndOfScreen = shipPosition.y + 34 * 2;

      // Fire projectile
      projectile.fireProjectile();

      // Check conditions after firing
      if (projectile.projectileDistanceTraveled >= distanceToEndOfScreen) {
        // If condition is meant to reset, verify reset happens correctly
        expect(projectile.projectileDistanceTraveled).toBe(0);
        expect(projectile.isFiring).toBe(false);
        // Reset for next firing cycle
        projectile.isFiring = true;
        projectile.targetHit = false;
      } else {
        // If projectile has not reached the end, verify it's still firing and distance traveled is updated correctly
        expect(projectile.isFiring).toBe(true);
        expect(projectile.projectileDistanceTraveled).toBeLessThan(
          distanceToEndOfScreen
        );
      }
    }
  });
});
