import {
  HUD,
  player,
  playerMovementInput,
  playerSpellInput,
  projectiles,
  shipPosition,
} from "../Level/LevelLogic/mainLevelLogic";

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";

export const PROJECTILE = "KeyP";
export const SPELL1 = "KeyO";
export const SPELL2 = "KeyŠ";
export const SPELL3 = "KeyĐ";

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
  spellsOnCooldown: string[] = [];
  playerShieldAmount: number = 0;
  playerShieldCooldown: number = 0;
  playerShieldDuration: number = 0;
  intervalRunning: boolean = false;

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.code === PROJECTILE) {
        this.activateSpell("Projectile");
      }
      if (e.code === SPELL1) {
        if (this.spellsOnCooldown.includes("Shield")) {
          console.log("shield on cd");
        } else {
          this.activateSpell("Shield");
        }
      }
      if (e.code === SPELL2) {
        this.activateSpell("Wall");
      }
      if (e.code === SPELL3) {
        this.activateSpell("Explosion");
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.code === PROJECTILE) {
      }
      if (e.code === SPELL1) {
        player.playerSpellActivated = false;
      }
      if (e.code === SPELL2) {
        this.spell = "";
        player.playerSpellActivated = false;
      }
      if (e.code === SPELL3) {
        this.spell = "";
        player.playerSpellActivated = false;
      }
    });
  }

  // tu ide metoda koja ce triggerati playerspellactivated i onda accordignly aktivirati spell
  activateSpell = (spellValue: string) => {
    if (this.spellsOnCooldown.includes("Shield")) {
    } else {
      this.setActiveSpell(spellValue);
      this.spell = spellValue;
      if (spellValue !== "Projectile") player.playerSpellActivated = true;
    }
  };

  setActiveSpell = (spellValue: string) => {
    if (spellValue === "Shield") {
      this.playerShieldAmount = 100;
      this.playerShieldDuration = 240;
    }
  };

  activateSpellCooldown = () => {
    this.spellsOnCooldown.forEach((spell, i) => {
      if (spell === "Shield") {
        this.cooldownTimerCounter(this.playerShieldCooldown);
        this.playerShieldCooldown--;

        if (this.playerShieldCooldown === 0) {
          this.spellsOnCooldown.splice(i, 1);
        }
      } else if (spell === "Explosion") {
      } else {
      }
    });
  };

  cooldownTimerCounter = (frames: number) => {
    if (!this.intervalRunning) {
      this.intervalRunning = true;
      const cooldownDurationMilliseconds = 1000 / frames;
      console.log(cooldownDurationMilliseconds);
      let currentWidthPercentage = 100;
      const interval = setInterval(() => {
        HUD.playerSpell1Cooldown.style.width = `${
          currentWidthPercentage - cooldownDurationMilliseconds
        }%`;
        currentWidthPercentage -= cooldownDurationMilliseconds;

        if (currentWidthPercentage <= 0) {
          clearInterval(interval);

          this.intervalRunning = false;
        }
      }, 100);
    }
  };
}
