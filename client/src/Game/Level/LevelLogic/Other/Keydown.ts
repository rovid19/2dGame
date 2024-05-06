import { menuStore } from "../../../../Stores/MenuStore";
import { menu, player } from "../mainLevelLogic";

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
    if (menu.isChanging) {
      console.log(e.code);
      menu.changeSpellKeybind(e);
    } else {
      if (
        e.code === player.playerInput.moveUp ||
        e.code === player.playerInput.moveDown ||
        e.code === player.playerInput.moveLeft ||
        e.code === player.playerInput.moveRight ||
        e.code === player.playerSpells.projectile.value
      ) {
        player.playerInput.keydownFunction(e);
      } else if (
        e.code === player.playerSpells.spell1.value ||
        e.code === player.playerSpells.spell2.value ||
        e.code === player.playerSpells.spell3.value
      ) {
        player.playerSpells.keydownFunction(e);
      } else if (e.code === "Escape") {
        const nav = menuStore.get("currentMenuNav");
        if (nav === "play") {
          menu.openOrCloseMenu();
        }
      }
    }
  }

  detectAutoFire(e: KeyboardEvent) {
    if (e.code === player.playerSpells.projectile.value) {
      this.fireProjectileArray.push(0);

      if (this.autoFire) this.autoFire = false;

      if (this.fireProjectileArray.length === 2) {
        this.autoFire = true;
      }

      setTimeout(() => {
        this.fireProjectileArray = [];
      }, 200);
    }
  }
}
