import {
  HUD,
  enemySpawner,
  inGameSounds,
  player,
  projectiles,
} from "../mainLevelLogic";

import { mainMenu } from "../../../MainMenu/MainMenuLogic";
import { menuStore } from "../../../../Stores/MenuStore";
import { backIcon } from "../../../../Utils/IconsExports";

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
        player.playerInput.removeEventListener();
        player.playerSpells.removeEventListener();
        player.isPlayerAlive = false;
        this.createMenuPopup();
        this.createMenuEventListeners();
      }
    } else if (this.nav === "closeMenu") {
      player.playerInput.resetInput();
      player.playerSpells.resetSpells();
      player.isPlayerAlive = true;
      this.resetSettingContainerValues();
      this.menuContainer.remove();
      this.settingsMainDiv.remove();
    } else if (this.nav === "settings") {
      if (!document.querySelector(".settings-main-div")) {
        this.createSettingsPopup("inGame");
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
      HUD.removeHudElements();
      HUD.resetHud();
      player.resetPlayer();
      player.isPlayerAlive = false;
      enemySpawner.resetEnemies();
      projectiles.resetProjectile();
      player.playerInput.resetInput();
      player.playerSpells.resetSpells();
      document.querySelector(".background-canvas")?.remove();
      document.querySelector(".level-canvas")?.remove();
      this.menuContainer.remove();
      mainMenu.resetMainMenu();
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
    if (
      !document.querySelector(".setting-container") &&
      !document.querySelector(".setting-container2")
    ) {
      const mainSettingContainer = document.createElement("div");
      if (menuStore.get("currentMenuNav") === "play")
        mainSettingContainer.className = "main-setting-container";
      else mainSettingContainer.className = "main-setting-container2";

      this.settingsMainDiv.appendChild(mainSettingContainer);

      for (let i = 0; i < 10; i++) {
        const settingContainer = document.createElement("div") as HTMLElement;
        const settingHeading = document.createElement("h3") as HTMLElement;
        let settingInput: HTMLElement;
        if (i < 8) settingInput = document.createElement("div") as HTMLElement;
        else settingInput = document.createElement("input") as HTMLInputElement;

        mainSettingContainer.appendChild(settingContainer);
        settingContainer.appendChild(settingHeading);
        settingContainer.appendChild(settingInput);

        if (menuStore.get("currentMenuNav") === "play")
          settingContainer.className = "setting-container";
        else settingContainer.className = "setting-container2";

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
    settingInput: HTMLElement | HTMLInputElement
  ) {
    switch (i) {
      case 0:
        settingHeading.textContent = "Up";
        settingInput.textContent = player.playerInput.moveUp.slice(3);
        break;
      case 1:
        settingHeading.textContent = "Left";
        settingInput.textContent = player.playerInput.moveLeft.slice(3);
        break;
      case 2:
        settingHeading.textContent = "Down";
        settingInput.textContent = player.playerInput.moveDown.slice(3);
        break;

      case 3:
        settingHeading.textContent = "Right";
        settingInput.textContent = player.playerInput.moveRight.slice(3);
        break;

      case 4:
        settingHeading.textContent = "Spell 1";
        settingInput.textContent = player.playerSpells.spell1.value.slice(3);
        break;
      case 5:
        settingHeading.textContent = "Spell 2";
        settingInput.textContent = player.playerSpells.spell1.value.slice(3);
        break;
      case 6:
        settingHeading.textContent = "Spell 3";
        settingInput.textContent = player.playerSpells.spell1.value.slice(3);
        break;
      case 7:
        settingHeading.textContent = "Fire projectile";
        settingInput.textContent =
          player.playerSpells.projectile.value.slice(3);
        break;

      case 8:
        settingHeading.textContent = "Soundtrack volume";
        settingInput.setAttribute("type", "range");
        if (settingInput instanceof HTMLInputElement) {
          settingInput.value = String(mainMenu.audioVolume);
        }

        break;
      case 9:
        settingHeading.textContent = "Sound effects";
        settingInput.setAttribute("type", "range");
        if (settingInput instanceof HTMLInputElement) {
          settingInput.value = String(inGameSounds.soundsVolume);
        }
        break;
    }
  }

  createSettingContainerEventListener(
    settingInput: HTMLElement | HTMLInputElement,
    settingContainer: HTMLElement
  ) {
    // setting event listeners for input
    if (settingInput instanceof HTMLInputElement) {
      settingInput.addEventListener("click", (e) => {
        const htmlTarget = e.target as HTMLElement;
        const inputElement = htmlTarget.parentElement?.firstChild?.textContent;
        let isSoundtrack = false;

        if (inputElement === "Soundtrack volume") isSoundtrack = true;

        if (e.target instanceof HTMLInputElement && isSoundtrack) {
          if (!mainMenu.isAudioPlaying) {
            mainMenu.playOrMuteSoundtrack();
          }
          const volume = parseInt(e.target.value) / 100;
          mainMenu.changeSoundtrackVolume(volume);
        } else {
          if (e.target instanceof HTMLInputElement) {
            const volume = parseInt(e.target.value) / 100;
            inGameSounds.changeSoundEffectsVolume(volume);
          }
        }
      });
    }
    // setting event listeners for divs
    else {
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
  }

  createSettingsPopup(value: string, htmlElement?: HTMLElement) {
    if (value === "mainMenu") {
      htmlElement?.appendChild(this.settingsMainDiv);
    } else {
      this.menuContainer.appendChild(this.settingsMainDiv);
    }

    this.settingsMainDiv.className = "settings-main-div";
    this.settingsMainDiv.appendChild(this.settingsBackButton);
    this.settingsBackButton.className = "settings-back-button";
    this.settingsBackButton.innerHTML = backIcon;
    this.createSettingContainers();
  }

  changeSpellKeybind(e: KeyboardEvent) {
    if (this.containerBeingChanged.firstChild?.textContent === "Up") {
      player.playerInput.moveUp = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (this.containerBeingChanged.firstChild?.textContent === "Down") {
      player.playerInput.moveDown = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (this.containerBeingChanged.firstChild?.textContent === "Left") {
      player.playerInput.moveLeft = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (this.containerBeingChanged.firstChild?.textContent === "Right") {
      player.playerInput.moveRight = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (
      this.containerBeingChanged.firstChild?.textContent === "Spell 1"
    ) {
      player.playerSpells.spell1.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      HUD.playerSpell1Keybind.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (
      this.containerBeingChanged.firstChild?.textContent === "Spell 2"
    ) {
      player.playerSpells.spell2.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      HUD.playerSpell2Keybind.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (
      this.containerBeingChanged.firstChild?.textContent === "Spell 3"
    ) {
      player.playerSpells.spell3.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      HUD.playerSpell3Keybind.textContent = e.code.slice(3);
      this.isChanging = false;
    } else if (
      this.containerBeingChanged.firstChild?.textContent === "Fire projectile"
    ) {
      player.playerSpells.projectile.value = e.code;
      this.inputBeingChanged.style.fontSize = "16px";
      this.inputBeingChanged.textContent = e.code.slice(3);
      this.isChanging = false;
    }
  }
}
