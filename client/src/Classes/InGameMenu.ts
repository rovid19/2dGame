import {
  HUD,
  player,
  playerMovementInput,
} from "../Level/LevelLogic/mainLevelLogic";
import { backIcon } from "../Utils/Icons";

export class Menu {
  menuContainer: HTMLElement = document.createElement("div");
  menuMainDiv: HTMLElement = document.createElement("div");
  menuButton1: HTMLElement = document.createElement("button");
  menuButton2: HTMLElement = document.createElement("button2");
  menuNote: HTMLElement = document.createElement("h4");
  settingsMainDiv: HTMLElement = document.createElement("div");
  settingsBackButton: HTMLElement = document.createElement("button");
  containerBeingChanged: HTMLElement = document.createElement("div");
  inputBeingChanged: HTMLElement = document.createElement("div");

  nav: string = "";
  isChanging: boolean = false;
  constructor() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (!this.isChanging) {
        if (e.code === "Escape") {
          if (this.nav === "menu") {
            this.nav = "closeMenu";
          } else {
            this.nav = "menu";
          }
        }
      } else {
        this.changeSpellKeybind(e);
      }
    });
  }
  openMenu() {
    if (this.nav === "menu") {
      if (!document.querySelector(".menu-container")) {
        playerMovementInput.removeEventListener();
        player.playerSpells.removeEventListener();
        player.isPlayerAlive = false;
        this.createMenuPopup();
        this.createMenuEventListeners();
      }
    } else if (this.nav === "closeMenu") {
      playerMovementInput.resetInput();
      player.playerSpells.resetSpells();
      player.isPlayerAlive = true;
      this.resetSettingContainerValues();
      this.menuContainer.remove();
      this.settingsMainDiv.remove();
    } else if (this.nav === "settings") {
      if (!document.querySelector(".settings-main-div")) {
        this.createSettingsPopup();
        this.addOrRemoveAttributesFromSettingSubmenu("remove");
        this.createSettingsEventListeners();
      }
    }
  }

  createMenuPopup() {
    document.body.appendChild(this.menuContainer);
    this.menuContainer.className = "menu-container";
    this.menuContainer.appendChild(this.menuMainDiv);
    this.menuMainDiv.className = "menu-main-div";
    this.menuMainDiv.appendChild(this.menuButton1);
    this.menuMainDiv.appendChild(this.menuButton2);
    this.menuMainDiv.appendChild(this.menuNote);
    this.menuNote.id = "menu-note";
    this.menuNote.className = "sixtyfour-myapp";
    this.menuNote.textContent = "press escape to exit";
    this.menuButton1.id = "menu-button";
    this.menuButton1.textContent = "Settings";
    this.menuButton1.className = "sixtyfour-myapp";
    this.menuButton2.id = "menu-button";
    this.menuButton2.textContent = "Exit to main menu";
    this.menuButton2.className = "sixtyfour-myapp";
  }

  createMenuEventListeners() {
    this.menuButton1.addEventListener("click", () => {
      this.nav = "settings";
    });

    this.menuButton2.addEventListener("click", () => {
      this.nav = "home";
    });
  }

  addOrRemoveAttributesFromSettingSubmenu(value: string) {
    if (value === "add") {
      this.settingsMainDiv.setAttribute("ani", "close");
      document.querySelectorAll(".setting-container").forEach((con) => {
        con.setAttribute("ani", "closeRest");
      });
      this.settingsBackButton.setAttribute("ani", "closeRest");
    } else {
      this.settingsMainDiv.removeAttribute("ani");
      document.querySelectorAll(".setting-container").forEach((con) => {
        con.removeAttribute("ani");
      });
      this.settingsBackButton.removeAttribute("ani");
    }
  }

  createSettingsEventListeners() {
    this.settingsBackButton.addEventListener("click", () => {
      this.addOrRemoveAttributesFromSettingSubmenu("add");
      setTimeout(() => {
        this.nav = "menu";
        this.resetSettingContainerValues();
        this.settingsMainDiv.remove();
      }, 1000);
    });
  }

  createSettingContainers() {
    if (!document.querySelector(".setting-container")) {
      for (let i = 0; i < 5; i++) {
        const settingContainer = document.createElement("div") as HTMLElement;
        const settingHeading = document.createElement("h3") as HTMLElement;
        const settingInput = document.createElement("div") as HTMLElement;

        this.settingsMainDiv.appendChild(settingContainer);
        settingContainer.appendChild(settingHeading);
        settingContainer.appendChild(settingInput);

        settingContainer.className = "setting-container";
        settingHeading.className = "sixtyfour-myapp";
        settingHeading.id = "setting-heading";
        settingInput.className = "sixtyfour-myapp";
        settingInput.id = "setting-input";

        this.assignCorrectValueToSettingContainers(
          i,
          settingHeading,
          settingInput
        );
        this.createSettingContainerEventListener(
          settingInput,
          settingContainer
        );
      }
    }
  }

  resetSettingContainerValues() {
    document.querySelectorAll("#setting-input").forEach((setting, i) => {
      const element = setting as HTMLElement;
      element.style.fontSize = "16px";

      switch (i) {
        case 0:
          setting.textContent = player.playerSpells.spell1.value.slice(3);
          break;
        case 1:
          setting.textContent = player.playerSpells.spell2.value.slice(3);
          break;
        case 2:
          setting.textContent = player.playerSpells.spell3.value.slice(3);
          break;
        case 3:
          setting.textContent = player.playerSpells.projectile.value.slice(3);
      }
    });
  }

  assignCorrectValueToSettingContainers(
    i: number,
    settingHeading: HTMLElement,
    settingInput: HTMLElement
  ) {
    switch (i) {
      case 0:
        settingHeading.textContent = "Spell 1";
        settingInput.textContent = player.playerSpells.spell1.value.slice(3);
        break;
      case 1:
        settingHeading.textContent = "Spell 2";
        settingInput.textContent = player.playerSpells.spell1.value.slice(3);
        break;
      case 2:
        settingHeading.textContent = "Spell 3";
        settingInput.textContent = player.playerSpells.spell1.value.slice(3);
        break;
      case 3:
        settingHeading.textContent = "Fire projectile";
        settingInput.textContent =
          player.playerSpells.projectile.value.slice(3);
        break;
      case 4:
        settingHeading.textContent = "Rotate spaceship";
        break;
    }
  }

  createSettingContainerEventListener(
    settingInput: HTMLElement,
    settingContainer: HTMLElement
  ) {
    settingInput.addEventListener("click", () => {
      if (!this.isChanging) {
        this.isChanging = true;
        settingInput.textContent = "press any key to save changes";
        settingInput.style.fontSize = "8px";
        this.inputBeingChanged = settingInput;
        this.containerBeingChanged = settingContainer;
      }
    });
  }

  createSettingsPopup() {
    this.menuContainer.appendChild(this.settingsMainDiv);
    this.settingsMainDiv.className = "settings-main-div";
    this.settingsMainDiv.appendChild(this.settingsBackButton);
    this.settingsBackButton.className = "settings-back-button";
    this.settingsBackButton.innerHTML = backIcon;
    this.createSettingContainers();
  }

  changeSpellKeybind(e: KeyboardEvent) {
    if (this.containerBeingChanged.firstChild?.textContent === "Spell 1") {
      player.playerSpells.spell1.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      HUD.playerSpell1Keybind.textContent = e.code.slice(3);
      this.isChanging = false;
    }
    if (this.containerBeingChanged.firstChild?.textContent === "Spell 2") {
      player.playerSpells.spell2.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      HUD.playerSpell2Keybind.textContent = e.code.slice(3);
      this.isChanging = false;
    }
    if (this.containerBeingChanged.firstChild?.textContent === "Spell 3") {
      player.playerSpells.spell3.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      HUD.playerSpell3Keybind.textContent = e.code.slice(3);
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    }

    if (
      this.containerBeingChanged.firstChild?.textContent === "Fire projectile"
    ) {
      player.playerSpells.projectile.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    }
    if (
      this.containerBeingChanged.firstChild?.textContent === "Rotate spaceship"
    ) {
      player.playerSpells.rotateSpaceship.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    }
  }
}
