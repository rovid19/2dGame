import { isOutside } from "../../Utils/TsTypes";
import { height, width } from "./canvasLogic";
import { canvasContext, player, shipPosition } from "./mainLevelLogic";

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
  const isOutside = ifSpaceshipIsOutsideOfTheScreenReturnAnObject();

  if (isOutside.isOutside) {
    if (isOutside.position === "x") {
      if (isOutside.onWhichSide === "left") {
        console.log("left", isOutside);
        player.playerSprite.drawImage(
          canvasContext,
          shipPosition.x + width + 38,
          shipPosition.y
        );
      } else {
        console.log("right", isOutside);
        player.playerSprite.drawImage(
          canvasContext,
          shipPosition.x - width - 38,
          shipPosition.y
        );
      }
    } else {
      if (isOutside.onWhichSide === "up") {
        console.log("up", isOutside);
        player.playerSprite.drawImage(
          canvasContext,
          shipPosition.x,
          shipPosition.y + height + 34
        );
      } else {
        console.log("down", isOutside);
        player.playerSprite.drawImage(
          canvasContext,
          shipPosition.x,
          shipPosition.y - height - 34
        );
      }
    }
  }
}
