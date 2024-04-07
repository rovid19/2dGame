import {
  HUD,
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
    if (
      this.playerSpellActivated ||
      this.playerSpells.playerShieldDuration > 0
    ) {
      if (playerSpellInput.spell === "Shield") {
        this.playerSpells.playerShieldDuration--;

        //render shield in the middle of spaceship sprite
        const shieldMinusShipHeight = 122 - 68;
        const centerShield = shieldMinusShipHeight / 2;
        const shieldMinusShipWidth = 122 - 76;
        const centerShieldX = shieldMinusShipWidth / 2;

        shield.drawImage(
          canvasContext,
          shipPosition.x - centerShieldX,
          shipPosition.y - centerShield
        );

        if (this.playerSpells.playerShieldDuration === 0) {
          this.playerSpells.spellsOnCooldown.push("Shield");
          HUD.playerSpell1Cooldown.style.height = "100%";
          this.playerSpells.playerShieldCooldown = 600;
          this.playerSpells.activateSpellCooldown();
        }
      }
    }
  }
}
