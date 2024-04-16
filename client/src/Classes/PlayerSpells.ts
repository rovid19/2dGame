import { HUD, player } from "../Level/LevelLogic/mainLevelLogic";
import { InputSpellType, SpellObject } from "../Utils/TsTypes";

function keydownFunction(this: InputSpellType, e: KeyboardEvent) {
  if (this.isChangingSpell) {
    HUD.inputBeingChanged.textContent = e.code;
    HUD.inputBeingChanged.style.fontSize = "16px";
    this.isChangingSpell = false;
  } else {
    if (e.code === this.spell1.value) {
      if (this.spellsOnCooldown.includes("Shield")) {
        console.log("shield on cd");
      } else {
        this.activateSpell("Shield");
      }
    }
    if (e.code === this.spell2.value) {
      this.activateSpell("Wall");
    }
    if (e.code === this.spell3.value) {
      this.activateSpell("Explosion");
    }
  }

  if (e.code === "Escape") {
    if (this.spell === "menu") {
      this.menu = "closeMenu";
    } else {
      this.menu = "menu";
    }
  }
}

export class PlayerSpells {
  spell1: SpellObject = {
    name: "Spell 1",
    value: "KeyO",
  };
  spell2: SpellObject = {
    name: "Spell 2",
    value: "KeyŠ",
  };
  spell3: SpellObject = {
    name: "Spell 3",
    value: "KeyĐ",
  };
  menu: string = "";
  isChangingSpell: boolean = false;
  spell: string = "";
  spellsOnCooldown: string[] = [];
  playerShieldAmount: number = 0;
  playerShieldCooldown: number = 0;
  playerShieldDuration: number = 0;
  intervalRunning: boolean = false;
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
    if (this.spellsOnCooldown.includes("Shield")) {
    } else {
      this.setActiveSpell(spellValue);
      this.spell = spellValue;
      player.playerSpellActivated = true;
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

  removeEventListener() {
    document.removeEventListener("keydown", this.keydownFunction);
  }
  resetSpells() {
    document.addEventListener("keydown", this.keydownFunction);
  }
}
