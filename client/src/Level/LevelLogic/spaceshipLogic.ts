import { isOutside } from "../../Utils/TsTypes";
import { height, width } from "./canvasLogic";
import {
  canvasContext,
  playerMovementInput,
  playerShip,
  shipPosition,
} from "./mainLevelLogic";
import { projectiles } from "./mainLevelLogic";

export function renderPlayerSpaceship() {
  stopSpaceshipFromGoingOutsideOfScreen();
  //allowSpaceshipToGoOutsideOfTheScreen()
}

function stopSpaceshipFromGoingOutsideOfScreen() {
  //console.log(projectiles);
  // prva 4 ifa proveravaju gornji lijevi gornji, donji lijevi, gornji desni i donji desni kut jer za ta 4 kuta trebam 2 conditiona ispunjavat
  if (shipPosition.x < 0 && shipPosition.y < 0) {
    if (
      playerMovementInput.direction === "LEFT" ||
      playerMovementInput.direction === "UP"
    ) {
      playerMovementInput.direction = "";
    }
    playerShip.drawImage(canvasContext, 0, 0);
  } else if (shipPosition.y >= height - 34 * 2 && shipPosition.x < 0) {
    if (
      playerMovementInput.direction === "LEFT" ||
      playerMovementInput.direction === "DOWN"
    ) {
      playerMovementInput.direction = "";
    }
    shipPosition.x = 0;
    shipPosition.y = height - 34 * 2;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    playerShip.drawImage(canvasContext, 0, height - 34 * 2);
  } else if (shipPosition.y < 0 && shipPosition.x >= width - 38 * 2) {
    if (
      playerMovementInput.direction === "RIGHT" ||
      playerMovementInput.direction === "UP"
    ) {
      playerMovementInput.direction = "";
    }
    playerShip.drawImage(canvasContext, width - 38 * 2, 0);
  } else if (
    shipPosition.y >= height - 34 * 2 &&
    shipPosition.x >= width - 38 * 2
  ) {
    if (
      playerMovementInput.direction === "RIGHT" ||
      playerMovementInput.direction === "DOWN"
    ) {
      playerMovementInput.direction = "";
    }
    shipPosition.x = width - 38 * 2;
    shipPosition.y = height - 34 * 2;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    playerShip.drawImage(canvasContext, width - 38 * 2, height - 34 * 2);
  }
  // lijeva strana
  else if (shipPosition.x < 0) {
    if (playerMovementInput.direction === "LEFT")
      playerMovementInput.direction = "";

    shipPosition.x = 0;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    playerShip.drawImage(canvasContext, 0, shipPosition.y);
  }
  // desna strana
  else if (shipPosition.x >= width - 38 * 2) {
    if (playerMovementInput.direction === "RIGHT")
      playerMovementInput.direction = "";

    shipPosition.x = width - 38 * 2;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    playerShip.drawImage(canvasContext, width - 38 * 2, shipPosition.y);
  }
  // gornja strana
  else if (shipPosition.y < 0) {
    if (playerMovementInput.direction === "UP")
      playerMovementInput.direction = "";

    shipPosition.y = 0;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    playerShip.drawImage(canvasContext, shipPosition.x, 0);
  }
  // donja strana
  else if (shipPosition.y >= height - 34 * 2) {
    if (playerMovementInput.direction === "DOWN")
      playerMovementInput.direction = "";

    shipPosition.y = height - 34 * 2;
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
    playerShip.drawImage(canvasContext, shipPosition.x, height - 34 * 2);
  } else {
    playerShip.drawImage(canvasContext, shipPosition.x, shipPosition.y);
    if (!projectiles.isFiring) projectiles.updateProjectileBaseCoordinates();
  }
}

const ifSpaceshipIsOutsideOfTheScreenReturnAnObject = (): isOutside => {
  let isOutside = {
    isOutside: false,
    onWhichSide: "",
    position: "",
  };

  if (shipPosition.x + 38 * 2 < 0) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "left";
    isOutside.position = "x";
    return isOutside;
  } else if (shipPosition.x > width) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "right";
    isOutside.position = "x";
    return isOutside;
  } else if (shipPosition.y + 34 * 2 < 0) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "up";
    isOutside.position = "y";
    return isOutside;
  } else if (shipPosition.y > height) {
    isOutside.isOutside = true;
    isOutside.onWhichSide = "down";
    isOutside.position = "y";
    return isOutside;
  }

  return isOutside;
};
function allowSpaceshipToGoOutsideOfTheScreen() {
  /*const isOutside = ifSpaceshipIsOutsideOfTheScreenReturnAnObject();
    //console.log("width", heroPos.x, width, "height", heroPos.y, height);
    //console.log(isOutside);
    if (isOutside.isOutside) {
      if (isOutside.position === "x") {
        if (isOutside.onWhichSide === "left") {
          log("left", isOutside);
          playerShip.drawImage(canvasContext, heroPos.x + width + 38, heroPos.y);
        } else {
          console.log("right", isOutside);
          playerShip.drawImage(canvasContext, heroPos.x - width - 38, heroPos.y);
        }
      } else {
        if (isOutside.onWhichSide === "up") {
          console.log("up", isOutside);
          playerShip.drawImage(canvasContext, heroPos.x, heroPos.y + height + 34);
        } else {
          ("down", isOutside);
          playerShip.drawImage(canvasContext, heroPos.x, heroPos.y - height - 34);
        }
      }
    } */
}
