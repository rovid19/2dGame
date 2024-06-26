import { keydown, tutorial } from "../../../MainMenu/MainMenuLogic";
import { height, width } from "../Other/canvasLogic";
import {
  HUD,
  canvasContext2,
  player,
  projectiles,
  shipPosition,
} from "../mainLevelLogic";

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export class Input {
  moveUp: string = "KeyW";
  moveLeft: string = "KeyA";
  moveRight: string = "KeyD";
  moveDown: string = "KeyS";
  direction: string = "";
  fireProjectile: boolean = false;

  constructor() {}

  keydownFunction(e: KeyboardEvent) {
    if (player.isPlayerAlive || tutorial.isReady) {
      if (e.code === this.moveUp) {
        if (this.direction !== "settings") this.direction = UP;
      }
      if (e.code === this.moveDown) {
        if (this.direction !== "settings") this.direction = DOWN;
      }
      if (e.code === this.moveLeft) {
        if (this.direction !== "settings") this.direction = LEFT;
      }
      if (e.code === this.moveRight) {
        if (this.direction !== "settings") this.direction = RIGHT;
      }

      if (e.code === player.playerSpells.projectile.value) {
        this.fireProjectile = true;
        if (keydown.autoFire) {
          keydown.autoFire = false;
          HUD.playerSpell4.style.border = "1px solid black";
        }
      }
    }
  }

  playerInput = () => {
    if (
      player.playerInput.fireProjectile &&
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
    if (player.playerInput.direction === UP) {
      shipPosition.y -= player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (player.playerInput.direction === DOWN) {
      shipPosition.y += player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (player.playerInput.direction === LEFT) {
      shipPosition.x -= player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
    if (player.playerInput.direction === RIGHT) {
      shipPosition.x += player.playerSpeed;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    }
  }

  stopSpaceshipFromGoingOutsideOfScreen() {
    // prva 4 ifa proveravaju gornji lijevi gornji, donji lijevi, gornji desni i donji desni kut jer za ta 4 kuta trebam 2 conditiona ispunjavat
    if (shipPosition.x === 0 && shipPosition.y < 0) {
      if (
        player.playerInput.direction === "LEFT" ||
        player.playerInput.direction === "UP"
      ) {
        player.playerInput.direction = "";
      }
      player.playerSprite.drawImage(canvasContext2, 0, 0);
    } else if (shipPosition.y >= height - 34 * 2 && shipPosition.x === 0) {
      if (
        player.playerInput.direction === "LEFT" ||
        player.playerInput.direction === "DOWN"
      ) {
        player.playerInput.direction = "";
      }
      shipPosition.x = 0;
      shipPosition.y = height - 34 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(canvasContext2, 0, height - 34 * 2);
    } else if (shipPosition.y < 0 && shipPosition.x >= width - 38 * 2) {
      if (
        player.playerInput.direction === "RIGHT" ||
        player.playerInput.direction === "UP"
      ) {
        player.playerInput.direction = "";
      }
      player.playerSprite.drawImage(canvasContext2, width - 38 * 2, 0);
    } else if (
      shipPosition.y >= height - 34 * 2 &&
      shipPosition.x >= width - 38 * 2
    ) {
      if (
        player.playerInput.direction === "RIGHT" ||
        player.playerInput.direction === "DOWN"
      ) {
        player.playerInput.direction = "";
      }
      shipPosition.x = width - 38 * 2;
      shipPosition.y = height - 34 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(
        canvasContext2,
        width - 38 * 2,
        height - 34 * 2
      );
    }
    // lijeva strana
    else if (shipPosition.x <= 0) {
      if (player.playerInput.direction === "LEFT")
        player.playerInput.direction = "";

      shipPosition.x = 0;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      if (player.isPlayerOutside && player.onWhichSide === "left") {
        player.playerSprite.drawImage(
          canvasContext2,
          width - 38 * 2,
          shipPosition.y
        );

        shipPosition.x = width - 37 * 2;
        projectiles.stopRendering = false;
        player.playerInput.direction = "LEFT";
      } else {
        player.playerSprite.drawImage(canvasContext2, 0, shipPosition.y);
      }
    }
    // desna strana
    else if (shipPosition.x >= width - 38 * 2) {
      if (player.playerInput.direction === "RIGHT")
        player.playerInput.direction = "";

      shipPosition.x = width - 38 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      if (player.isPlayerOutside && player.onWhichSide === "right") {
        player.playerSprite.drawImage(canvasContext2, 0, shipPosition.y);
        shipPosition.x = 1;
        projectiles.stopRendering = false;
        player.playerInput.direction = "RIGHT";
      } else {
        player.playerSprite.drawImage(
          canvasContext2,
          width - 38 * 2,
          shipPosition.y
        );
      }
    }
    // gornja strana
    else if (shipPosition.y < 0) {
      if (player.playerInput.direction === "UP")
        player.playerInput.direction = "";

      shipPosition.y = 0;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(canvasContext2, shipPosition.x, 0);
    }
    // donja strana
    else if (shipPosition.y >= height - 34 * 2) {
      if (player.playerInput.direction === "DOWN")
        player.playerInput.direction = "";  

      shipPosition.y = height - 34 * 2;
      if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
      player.playerSprite.drawImage(
        canvasContext2,
        shipPosition.x,
        height - 34 * 2
      );
    } else {
      player.playerSprite.drawImage(
        canvasContext2,
        shipPosition.x,
        shipPosition.y
      );
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
