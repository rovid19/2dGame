import { height, width } from "../Level/LevelLogic/canvasLogic";
import {
  HUD,
  canvasContext,
  player,
  projectiles,
  shield,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";
import { InputSpellType, SpellObject, isOutside } from "../Utils/TsTypes";

function keydownFunction(this: InputSpellType, e: KeyboardEvent) {
  if (e.code === this.spell1.value) {
    if (this.spellsOnCooldown.includes("Shield")) {
      console.log("shield on cd");
    } else {
      this.activateSpell("Shield");
    }
  }
  if (e.code === this.spell2.value) {
    this.activateSpell("Walls");
  }
  if (e.code === this.spell3.value) {
    this.activateSpell("Explosion");
  }
}

export class PlayerSpells {
  projectile: SpellObject = {
    name: "Projectile",
    value: "KeyP",
  };
  spell1: SpellObject = {
    name: "Spell 1",
    value: "KeyO",
  };
  spell2: SpellObject = {
    name: "Spell 2",
    value: "BracketLeft",
  };
  spell3: SpellObject = {
    name: "Spell 3",
    value: "KeyĐ",
  };
  rotateSpaceship: SpellObject = {
    name: "Rotate spaceship",
    value: "KeyR",
  };

  spell: string = "";
  spellsOnCooldown: string[] = [];

  // shield
  playerShieldAmount: number = 100;
  playerShieldCooldown: number = 600;
  playerShieldMaxCooldown: number = 600;
  playerShieldDuration: number = 0;
  shieldActivated: boolean = false;

  // walls
  playerWallsDuration: number = 0;
  playerWallsCooldown: number = 600;
  playerWallsMaxCooldown: number = 600;
  wallsActivated: boolean = false;

  keydownFunction: (e: KeyboardEvent) => void;

  constructor() {
    this.keydownFunction = keydownFunction.bind(this);
    document.addEventListener("keydown", this.keydownFunction);

    document.addEventListener("keyup", (e) => {
      if (e.code === this.spell1.value) {
        player.playerSpellActivated = false;
      }
      if (e.code === this.spell2.value) {
        this.spell = "";
        player.playerSpellActivated = false;
      }
      if (e.code === this.spell3.value) {
        this.spell = "";
        player.playerSpellActivated = false;
      }
    });
  }

  // tu ide metoda koja ce triggerati playerspellactivated i onda accordignly aktivirati spell
  activateSpell = (spellValue: string) => {
    if (spellValue === "Shield") {
      if (!this.spellsOnCooldown.includes("Shield")) {
        console.log("dadad");
        this.spellsOnCooldown.push("Shield");
        this.setActiveSpell(spellValue);
        this.spell = spellValue;
        this.shieldActivated = true;
      }
    }
    if (spellValue === "Walls") {
      if (!this.spellsOnCooldown.includes("Walls")) {
        this.spellsOnCooldown.push("Walls");
        this.setActiveSpell(spellValue);
        this.spell = spellValue;
        this.wallsActivated = true;
      }
    }
  };

  setActiveSpell = (spellValue: string) => {
    if (spellValue === "Shield") {
      player.playerShield = 10;
      this.playerShieldDuration = 240;
    } else if (spellValue === "Walls") {
      this.playerWallsDuration = 600;
    } else {
    }
  };

  activateSpellCooldown = () => {
    if (player.isPlayerAlive) {
      this.spellsOnCooldown.forEach((spell, i) => {
        if (spell === "Shield") {
          this.playerShieldCooldown--;

          this.cooldownTimerCounter(
            this.playerShieldCooldown,
            this.playerShieldMaxCooldown,
            HUD.playerSpell1Cooldown
          );

          if (this.playerShieldCooldown === 0) {
            this.spellsOnCooldown.splice(i, 1);
            this.shieldActivated = false;
            this.playerShieldDuration = 0;
            this.playerShieldCooldown = this.playerShieldMaxCooldown;
          }
        } else if (spell === "Walls") {
          this.removeWalls();
          this.playerWallsCooldown--;

          this.cooldownTimerCounter(
            this.playerWallsCooldown,
            this.playerWallsMaxCooldown,
            HUD.playerSpell2Cooldown
          );

          if (this.playerWallsCooldown === 0) {
            this.spellsOnCooldown.splice(i, 1);
            this.wallsActivated = false;
            this.playerWallsDuration = 0;
            this.playerWallsCooldown = this.playerWallsMaxCooldown;
          }
        } else {
        }
      });
    }
  };

  removeWalls() {
    if (document.querySelector(".left-wall")) {
      document.querySelector(".left-wall")?.remove();
      document.querySelector(".right-wall")?.remove();

      player.isPlayerOutside = false;
      player.onWhichSide = "";
    }
  }

  cooldownTimerCounter = (
    value: number,
    maxValue: number,
    spellHTML: HTMLElement
  ) => {
    const decreaseWidthBy =
      100 - Math.floor(((maxValue - value) * 100) / maxValue);

    spellHTML.style.zIndex = "1";
    spellHTML.style.width = `${decreaseWidthBy}%`;
  };

  renderSpells() {
    if (this.shieldActivated) {
      this.renderShield();
      if (this.playerShieldDuration === 0 || player.playerShield <= 0) {
        console.log(this.playerShieldDuration);
        this.activateSpellCooldown();
      }
    }
    if (this.wallsActivated) {
      this.renderWalls();
      if (this.playerWallsDuration > 0) this.playerWallsDuration--;

      this.renderSpaceshipAccordingly();
      if (this.playerWallsDuration === 0) {
        this.playerWallsDuration = 0;
        this.activateSpellCooldown();
      }
    }
  }

  renderShield() {
    if (player.playerShield > 0 && this.playerShieldDuration > 0) {
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

      this.playerShieldDuration--;
    }
  }

  renderWalls() {
    if (!document.querySelector(".left-wall")) {
      const leftWall = document.createElement("div") as HTMLElement;
      leftWall.className = "left-wall";
      const rightWall = document.createElement("div") as HTMLElement;
      rightWall.className = "right-wall";

      document.body.appendChild(leftWall);
      document.body.appendChild(rightWall);
    }
  }

  ifSpaceshipIsOutsideOfTheScreenReturnAnObject = (): isOutside => {
    let isOutside = {
      isOutside: false,
      onWhichSide: "",
      position: "",
    };

    if (shipPosition.x === 0) {
      isOutside.isOutside = true;
      isOutside.onWhichSide = "left";
      isOutside.position = "x";
      return isOutside;
    } else if (shipPosition.x + 38 * 2 === width) {
      isOutside.isOutside = true;
      isOutside.onWhichSide = "right";
      isOutside.position = "x";
      return isOutside;
    } /*else if (shipPosition.y + 34 * 2 < 0) {
      isOutside.isOutside = true;
      isOutside.onWhichSide = "up";
      isOutside.position = "y";
      return isOutside;
    } else if (shipPosition.y > height) {
      isOutside.isOutside = true;
      isOutside.onWhichSide = "down";
      isOutside.position = "y";
      return isOutside;
    }*/

    return isOutside;
  };

  renderSpaceshipAccordingly() {
    const isOutside = this.ifSpaceshipIsOutsideOfTheScreenReturnAnObject();

    if (isOutside.isOutside) {
      projectiles.stopRendering = true;
      player.isPlayerOutside = true;
      player.onWhichSide = isOutside.onWhichSide;
    }
  }

  decreaseStatByPercentage(stat: number, value: number) {}

  removeEventListener() {
    document.removeEventListener("keydown", this.keydownFunction);
  }
  resetSpells() {
    document.addEventListener("keydown", this.keydownFunction);
  }
}
