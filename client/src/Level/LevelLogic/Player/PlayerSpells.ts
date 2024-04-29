import { width } from "../Other/canvasLogic";
import {
  HUD,
  canvasContext,
  enemySpawner,
  inGameSounds,
  player,
  projectiles,
  shield,
  shipPosition,
} from "../mainLevelLogic";
import { returnArrayOfHitboxNumbers } from "../../../Utils/OftenUsed";
import { InputSpellType, SpellObject, isOutside } from "../../../Utils/TsTypes";

function keydownFunction(this: InputSpellType, e: KeyboardEvent) {
  if (player.isPlayerAlive) {
    if (e.code === this.spell1.value) {
      if (this.spellsOnCooldown.includes("Shield")) {
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
    value: "BracketRight",
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
  playerShieldDuration: number = 240;
  shieldActivated: boolean = false;

  // walls
  playerWallsDuration: number = 600;
  playerWallsCooldown: number = 600;
  playerWallsMaxCooldown: number = 600;
  wallsActivated: boolean = false;

  // explosion
  playerExplosionDamage: number = 50;
  playerExplosionRadius: number = 250;
  playerExplosionHitboxX: number[] = [];
  playerExplosionHitboxY: number[] = [];
  playerExplosionCooldown: number = 600;
  playerExplosionMaxCooldown: number = 600;
  explosionActivated: boolean = false;
  explosionDealtDmg: boolean = false;
  explosionShowRadius: boolean = false;
  explosionShowRadiusDuration: number = 90;
  explosionRadiusContainerTopRight: HTMLElement = document.createElement("div");
  explosionRadiusContainerTopLeft: HTMLElement = document.createElement("div");
  explosionRadiusContainerBottomRight: HTMLElement =
    document.createElement("div");
  explosionRadiusContainerBottomLeft: HTMLElement =
    document.createElement("div");

  keydownFunction: (e: KeyboardEvent) => void;

  constructor() {
    this.keydownFunction = keydownFunction.bind(this);
    document.addEventListener("keydown", this.keydownFunction);

    document.addEventListener("keyup", (e) => {
      if (player.isPlayerAlive) {
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
      }
    });
  }

  activateSpell = (spellValue: string) => {
    if (spellValue === "Shield") {
      if (!this.spellsOnCooldown.includes("Shield")) {
        player.playerShield = this.playerShieldAmount;
        this.spellsOnCooldown.push("Shield");
        this.spell = spellValue;
        this.shieldActivated = true;
        inGameSounds.playShield();
      }
    }
    if (spellValue === "Walls") {
      if (!this.spellsOnCooldown.includes("Walls")) {
        this.spellsOnCooldown.push("Walls");
        inGameSounds.playWind();
        this.spell = spellValue;
        this.wallsActivated = true;
      }
    }
    if (spellValue === "Explosion") {
      if (!this.spellsOnCooldown.includes("Explosion")) {
        this.spellsOnCooldown.push("Explosion");

        this.spell = spellValue;
        this.explosionDealtDmg = false;
        this.explosionShowRadius = true;
        this.explosionActivated = true;
      }
    }
  };

  renderSpells() {
    if (this.shieldActivated) {
      this.renderShield();
      if (this.playerShieldDuration === 0 || player.playerShield <= 0) {
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

    if (this.explosionActivated) {
      if (this.explosionShowRadius) {
        this.chargeExplosion();
      } else {
        this.dealDamageToEnemiesNearBy();
        this.activateSpellCooldown();
      }
    }
  }

  activateSpellCooldown = () => {
    if (player.isPlayerAlive) {
      this.spellsOnCooldown.forEach((spell, i) => {
        if (spell === "Shield") {
          if (this.playerShieldDuration === 0 || player.playerShield <= 0) {
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
          }
        } else if (spell === "Walls") {
          if (this.playerWallsDuration === 0) {
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
          }
        } else {
          this.playerExplosionCooldown--;

          this.cooldownTimerCounter(
            this.playerExplosionCooldown,
            this.playerExplosionMaxCooldown,
            HUD.playerSpell3Cooldown
          );

          if (this.playerExplosionCooldown === 0) {
            this.spellsOnCooldown.splice(i, 1);
            this.explosionActivated = false;
            this.playerExplosionCooldown = this.playerExplosionMaxCooldown;
            this.explosionShowRadiusDuration = 90;
          }
        }
      });
    }
  };

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

  // Shield logic

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

  // Walls logic

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

  removeWalls() {
    if (document.querySelector(".left-wall")) {
      document.querySelector(".left-wall")?.remove();
      document.querySelector(".right-wall")?.remove();

      player.isPlayerOutside = false;
      player.onWhichSide = "";
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
    }

    return isOutside;
  };

  renderSpaceshipAccordingly() {
    if (this.playerWallsDuration > 0) {
      const isOutside = this.ifSpaceshipIsOutsideOfTheScreenReturnAnObject();

      if (isOutside.isOutside) {
        projectiles.stopRendering = true;
        player.isPlayerOutside = true;
        player.onWhichSide = isOutside.onWhichSide;
      }
    }
  }

  // Explosion logic

  dealDamageToEnemiesNearBy() {
    if (!this.explosionDealtDmg) {
      inGameSounds.playExplosion();
      player.isAoeDamage = true;

      returnArrayOfHitboxNumbers(
        Math.floor(shipPosition.x),
        this.playerExplosionRadius,
        this.playerExplosionHitboxX,
        Math.floor(shipPosition.x + 1)
      );
      returnArrayOfHitboxNumbers(
        Math.floor(shipPosition.y),
        this.playerExplosionRadius,
        this.playerExplosionHitboxY,
        Math.floor(shipPosition.y)
      );

      enemySpawner.enemyArray.forEach((array) => {
        for (let i = array.length - 1; i >= 0; i--) {
          if (
            this.playerExplosionHitboxY.includes(
              Math.floor(array[i].enemySprite.position.y)
            )
          ) {
            if (
              this.playerExplosionHitboxX.includes(
                Math.floor(array[i].enemySprite.position.x)
              )
            ) {
              array[i].takeDamage(array, i, this.playerExplosionDamage);
            }
          }
        }
      });

      this.explosionDealtDmg = true;
      player.isAoeDamage = false;
    }
  }

  chargeExplosion() {
    if (this.explosionShowRadiusDuration === 0) {
      document.querySelector(".radius-container-top-right")?.remove();
      document.querySelector(".radius-container-top-left")?.remove();
      document.querySelector(".radius-container-bottom-right")?.remove();
      document.querySelector(".radius-container-bottom-left")?.remove();
      this.explosionShowRadius = false;
    } else {
      if (!document.querySelector(".radius-container-top-right")) {
        document.body.appendChild(this.explosionRadiusContainerTopRight);
        document.body.appendChild(this.explosionRadiusContainerTopLeft);
        document.body.appendChild(this.explosionRadiusContainerBottomLeft);
        document.body.appendChild(this.explosionRadiusContainerBottomRight);

        this.explosionRadiusContainerTopRight.className =
          "radius-container-top-right";
        this.explosionRadiusContainerTopLeft.className =
          "radius-container-top-left";
        this.explosionRadiusContainerBottomLeft.className =
          "radius-container-bottom-left";
        this.explosionRadiusContainerBottomRight.className =
          "radius-container-bottom-right";

        this.explosionRadiusContainerTopRight.style.width = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerTopRight.style.height = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerTopLeft.style.width = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerTopLeft.style.height = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerBottomLeft.style.width = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerBottomLeft.style.height = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerBottomRight.style.width = `${this.playerExplosionRadius}px`;
        this.explosionRadiusContainerBottomRight.style.height = `${this.playerExplosionRadius}px`;
      }

      this.explosionRadiusContainerTopRight.style.top = `${
        shipPosition.y - this.playerExplosionRadius + 50
      }px`;
      this.explosionRadiusContainerTopRight.style.left = `${shipPosition.x}px`;
      this.explosionRadiusContainerTopLeft.style.top = `${
        shipPosition.y - this.playerExplosionRadius + 50
      }px`;
      this.explosionRadiusContainerTopLeft.style.left = `${
        shipPosition.x - this.playerExplosionRadius + 38 * 2
      }px`;
      this.explosionRadiusContainerBottomLeft.style.top = `${shipPosition.y}px`;
      this.explosionRadiusContainerBottomLeft.style.left = `${
        shipPosition.x - this.playerExplosionRadius + 38 * 2
      }px`;
      this.explosionRadiusContainerBottomRight.style.top = `${shipPosition.y}px`;
      this.explosionRadiusContainerBottomRight.style.left = `${shipPosition.x}px`;

      this.explosionShowRadiusDuration--;
    }
  }

  // Spell powerup logic

  decreaseStatByPercentage(value: number) {
    const decreaseShieldCooldownBy =
      this.playerShieldMaxCooldown * (value / 100);
    const decreaseWallsCooldownBy = this.playerWallsMaxCooldown * (value / 100);
    const decreaseExplosionCooldownBy =
      this.playerExplosionMaxCooldown * (value / 100);

    this.playerShieldCooldown -= decreaseShieldCooldownBy;
    this.playerShieldMaxCooldown -= decreaseShieldCooldownBy;

    this.playerWallsCooldown -= decreaseWallsCooldownBy;
    this.playerWallsMaxCooldown -= decreaseWallsCooldownBy;

    this.playerExplosionCooldown -= decreaseExplosionCooldownBy;
    this.playerExplosionMaxCooldown -= decreaseExplosionCooldownBy;
  }

  increaseSpellStats(name: string, value: number) {
    switch (name) {
      case "Shield duration increase":
        const increaseDurationBy = this.playerShieldDuration * (value / 100);
        this.playerShieldDuration += increaseDurationBy;
        break;
      case "Shield amount increase":
        const increaseAmountBy = this.playerShieldAmount * (value / 100);
        this.playerShieldAmount += increaseAmountBy;
        break;
      case "Explosion damage increase":
        const increaseDamageBy = this.playerExplosionDamage * (value / 100);
        this.playerExplosionDamage += increaseDamageBy;
        break;
      case "Explosion radius increase":
        const increaseRadiusBy = this.playerExplosionRadius * (value / 100);
        this.playerExplosionRadius += increaseRadiusBy;
        break;
      case "Walls duration increase":
        const increaseWallsDurationBy =
          this.playerWallsDuration * (value / 100);
        this.playerWallsDuration += increaseWallsDurationBy;
        break;
    }
  }

  removeEventListener() {
    document.removeEventListener("keydown", this.keydownFunction);
  }
  resetSpells() {
    document.addEventListener("keydown", this.keydownFunction);
  }
}
