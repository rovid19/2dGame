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
}
