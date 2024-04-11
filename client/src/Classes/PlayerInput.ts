import {
  playerMovementInput,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export class Input {
  direction: string = "";
  fireProjectile: boolean = false;

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.direction = UP;
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.direction = DOWN;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.direction = LEFT;
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.direction = RIGHT;
      }

      if (e.code === "KeyP") {
        this.fireProjectile = true;
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyP") {
        this.fireProjectile = false;
      } /*
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.direction = "";
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.direction = "";
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.direction = "";
      } */
    });
  }

  playerInput = () => {
    if (
      playerMovementInput.fireProjectile &&
      projectiles.projectileDistanceTraveled === 0
    ) {
      if (shipPosition.y > 100) {
        projectiles.fireProjectile();
      }
    }

    this.playerMovement();
  };

  playerMovement() {
    if (playerMovementInput.direction === UP) {
      shipPosition.y -= 10;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (playerMovementInput.direction === DOWN) {
      shipPosition.y += 10;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (playerMovementInput.direction === LEFT) {
      shipPosition.x -= 10;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (playerMovementInput.direction === RIGHT) {
      shipPosition.x += 10;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
  }
}
