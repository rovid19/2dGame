import { menuStore } from "../../../../Stores/MenuStore";
import { mainMenu, tutorial } from "../../../MainMenu/MainMenuLogic";
import { HUD, menu, player } from "../mainLevelLogic";

export class Keydown {
  keyPressed: string = "";
  fireProjectileArray: number[] = [];
  autoFire: boolean = false;
  eventListener: (e: KeyboardEvent) => void = function placeholder() {};
  constructor() {
    this.addEventListener();
  }

  addEventListener() {
    this.eventListener = (e: KeyboardEvent) => {
      this.keyPressed = e.code;
      this.detectWhoNeedsKeydown(e);
      this.detectAutoFire(e);
    };

    document.addEventListener("keydown", this.eventListener);
  }

  removeEventListener() {
    document.removeEventListener("keydown", this.eventListener);
  }

  detectWhoNeedsKeydown(e: KeyboardEvent) {
    if (tutorial.isReady) {
      tutorial.keydownMethod();
      if (tutorial.tutorialTracker.length === 2) {
        this.playerMovement(e);
        if (!tutorial.nextStep) {
          if (
            e.code === "KeyW" ||
            e.code === "KeyA" ||
            e.code === "KeyS" ||
            e.code === "KeyD"
          ) {
            tutorial.nextStep = true;

            setTimeout(() => {
              tutorial.removeDiv(tutorial.htmlElement);
              setTimeout(() => {
                tutorial.spellActivation("shield");
                tutorial.nextStep = false;
              }, 200);
            }, 5000);
          }
        }
      } else if (tutorial.tutorialTracker.length === 3) {
        this.playerMovement(e);
        if (!tutorial.nextStep) {
          if (e.code === "KeyQ") {
            this.playerSpells(e);
            tutorial.nextStep = true;

            tutorial.htmlElementText.textContent =
              "When you activate your shield, the remaining shield amount will be shown in the highlighted field on the screen.";

            HUD.shieldBarFillerContainer.style.border = "5px solid red";
            HUD.playerSpell1.style.border = "1px solid black";
            setTimeout(() => {
              HUD.shieldBarFillerContainer.style.border = "none";
            }, 4000);
            setTimeout(() => {
              tutorial.removeDiv(tutorial.htmlElement);

              setTimeout(() => {
                tutorial.spellActivation("walls");
                tutorial.nextStep = false;
              }, 200);
            }, 5000);
          }
        }
      } else if (tutorial.tutorialTracker.length === 4) {
        this.playerMovement(e);
        if (!tutorial.nextStep) {
          if (e.code === "KeyE") {
            console.log("dadad");
            this.playerSpells(e);
            tutorial.nextStep = true;
            HUD.playerSpell2.style.border = "1px solid black";
            tutorial.htmlElementText.textContent =
              "When the walls are activated, you can pass through the left or right side of the screen and reappear on the opposite side.";
            setTimeout(() => {
              tutorial.removeDiv(tutorial.htmlElement);

              setTimeout(() => {
                tutorial.spellActivation("explosion");
                tutorial.nextStep = false;
              }, 200);
            }, 5000);
          }
        }
      } else if (tutorial.tutorialTracker.length === 5) {
        this.playerMovement(e);
        if (!tutorial.nextStep) {
          if (e.code === "KeyR") {
            this.playerSpells(e);
            tutorial.nextStep = true;
            HUD.playerSpell3.style.border = "1px solid black";
            tutorial.htmlElementText.textContent =
              "Explosion has a 1-second charge time and then deals damage to enemies within its range.";
            setTimeout(() => {
              tutorial.removeDiv(tutorial.htmlElement);

              setTimeout(() => {
                tutorial.spellActivation("autofire");
                tutorial.nextStep = false;
              }, 200);
            }, 5000);
          }
        }
      } else if (tutorial.tutorialTracker.length === 6) {
        this.playerMovement(e);
        if (!tutorial.nextStep) {
          if (e.code === "KeyO") {
            this.playerSpells(e);
            tutorial.nextStep = true;
            HUD.playerSpell4.style.border = "3px solid white";
            tutorial.htmlElementText.textContent =
              "You can switch off autofire by pressing 'O' again or by firing a normal projectile by pressing 'P'.";
            setTimeout(() => {
              tutorial.removeDiv(tutorial.htmlElement);
              tutorial.nextStep = false;
              tutorial.isReady = false;
              player.resetPlayer();
            }, 5000);
          }
        }
      }
    } else {
      if (mainMenu.settings.isChangingKeybind) {
        mainMenu.changeSpellKeybind(e);
      } else {
        this.playerMovement(e);
        this.playerSpells(e);
        if (e.code === "Escape") {
          const nav = menuStore.get("currentMenuNav");
          if (nav === "play") {
            menu.openOrCloseMenu();
          }
        }
      }
    }
  }

  playerMovement(e: KeyboardEvent) {
    if (
      e.code === player.playerInput.moveUp ||
      e.code === player.playerInput.moveDown ||
      e.code === player.playerInput.moveLeft ||
      e.code === player.playerInput.moveRight ||
      e.code === player.playerSpells.projectile.value
    ) {
      player.playerInput.keydownFunction(e);
    }
  }

  playerSpells(e: KeyboardEvent) {
    if (
      e.code === player.playerSpells.spell1.value ||
      e.code === player.playerSpells.spell2.value ||
      e.code === player.playerSpells.spell3.value ||
      e.code === player.playerSpells.spell4.value
    ) {
      player.playerSpells.keydownFunction(e);
    }
  }

  detectAutoFire(e: KeyboardEvent) {
    if (e.code === player.playerSpells.spell4.value) {
      /*this.fireProjectileArray.push(0);

      if (this.autoFire) {
        this.autoFire = false;
        HUD.playerSpell4.remove();
      }

      if (this.fireProjectileArray.length === 2) {
        this.autoFire = true;
        HUD.appendAutoFire();
      }

      setTimeout(() => {
        this.fireProjectileArray = [];
      }, 200);*/
    }
  }
}
