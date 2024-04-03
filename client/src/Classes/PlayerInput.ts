import {
  playerMovementInput,
  playerSpellInput,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export class Input {
  direction: string = "";

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
    });

    /* document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        this.direction = "";
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        this.direction = "";
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.direction = "";
      }
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.direction = "";
      }
    });*/
  }

  playerMovement = () => {
    if (playerSpellInput.spell === "P") {
      if (shipPosition.y > 40) {
        projectiles.targetHit = false;
        projectiles.fireProjectile();
      }
    }
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
  };
}

export class PlayerSpells {
  spell: string = "";

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyP") {
        this.spell = "P";
      }
      if (e.code === "KeyŠ") {
        this.spell = "Š";
      }
      if (e.code === "KeyĐ") {
        this.spell = "Đ";
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyP") {
        this.spell = "";
      }
      if (e.code === "KeyŠ") {
        this.spell = "";
      }
      if (e.code === "KeyĐ") {
        this.spell = "";
      }
    });
  }
}
