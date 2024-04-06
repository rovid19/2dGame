import {
  canvasContext,
  playerSpellInput,
  shield,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import {
  PlayerMovementMethods,
  SpriteMethods,
  PlayerSpellMethods,
  Vector,
} from "../Utils/TsTypes";
import { Input, PlayerSpells } from "./PlayerInput";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector";

export class Player {
  playerSprite: SpriteMethods;
  playerHp: number = 100;
  playerShield: number = 0;
  playerShieldDuration: number = 0;
  playerEnergy: number = 100;
  playerSpeed: number = 1;
  playerMovement: PlayerMovementMethods = new Input();
  playerSpells: PlayerSpellMethods = new PlayerSpells();
  playerSpellActivated: boolean = false;

  constructor(
    spaceshipImage: HTMLImageElement,
    frameHeight: number,
    frameWidth: number,
    scale: number
  ) {
    this.playerSprite = new Sprite(
      spaceshipImage,
      new Vector2(frameHeight, frameWidth),
      scale
    );
  }

  activateSpell() {
    if (this.playerSpellActivated || this.playerShieldDuration > 0) {
      if (playerSpellInput.spell === "Shield") {
        console.log("da22");
        this.playerShieldDuration = 4;
        const shieldMinusShipHeight = 122 - 68;
        const centerShield = shieldMinusShipHeight / 2;

        const shieldMinusShipWidth = 122 - 76;
        const centerShieldX = shieldMinusShipWidth / 2;
        shield.drawImage(
          canvasContext,
          shipPosition.x - centerShieldX,
          shipPosition.y - centerShield
        );
      }
    }
  }
}
