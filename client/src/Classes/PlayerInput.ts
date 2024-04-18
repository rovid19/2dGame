import {
  player,
  playerMovementInput,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { InputType } from "../Utils/TsTypes";

function keydownFunction(this: InputType, e: KeyboardEvent) {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    if (this.direction !== "settings") this.direction = UP;
  }
  if (e.code === "ArrowDown" || e.code === "KeyS") {
    if (this.direction !== "settings") this.direction = DOWN;
  }
  if (e.code === "ArrowLeft" || e.code === "KeyA") {
    if (this.direction !== "settings") this.direction = LEFT;
  }
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    if (this.direction !== "settings") this.direction = RIGHT;
  }

  if (e.code === player.playerSpells.projectile.value) {
    this.fireProjectile = true;
  }
}

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export class Input {
  direction: string = "";
  fireProjectile: boolean = false;
  keydownFunction: (e: KeyboardEvent) => void;

  constructor() {
    this.keydownFunction = keydownFunction.bind(this);
    document.addEventListener("keydown", this.keydownFunction);

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
        projectiles.targetHit = false;
        projectiles.fireProjectile();
      }
    }

    this.playerMovement();
  };

  playerMovement() {
    if (playerMovementInput.direction === UP) {
      shipPosition.y -= player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (playerMovementInput.direction === DOWN) {
      shipPosition.y += player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (playerMovementInput.direction === LEFT) {
      shipPosition.x -= player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (playerMovementInput.direction === RIGHT) {
      shipPosition.x += player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
  }

  removeEventListener() {
    this.direction = "";
    document.removeEventListener("keydown", this.keydownFunction);
  }

  resetInput() {
    document.addEventListener("keydown", this.keydownFunction);
  }
}
