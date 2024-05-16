import {
  inGameSounds,
  menu,
  player,
} from "../../Level/LevelLogic/mainLevelLogic";
import { mainMenu } from "../MainMenuLogic";
import { MenuScreen } from "./MenuScreen";

export class Settings extends MenuScreen {
  settingsContainer: HTMLElement = document.createElement("div");
  inputBeingChanged: HTMLElement = document.createElement("input");
  containerBeingChanged: HTMLElement = document.createElement("div");

  isChangingKeybind: boolean = false;

  constructor() {
    super();
  }

  createSettings() {
    if (menu) this.createMenuScreen(menu.menuContainer);
    else this.createMenuScreen();
    this.createSettingContainers();
  }

  createSettingContainers() {
    if (
      !document.querySelector(".setting-container") &&
      !document.querySelector(".setting-container2")
    ) {
      const mainSettingContainer = document.createElement("div");

      if (this.isInGameSettings)
        mainSettingContainer.className = "main-setting-container";
      else mainSettingContainer.className = "main-setting-container2";

      this.mainDiv.appendChild(mainSettingContainer);

      for (let i = 0; i < 10; i++) {
        const settingContainer = document.createElement("div") as HTMLElement;
        const settingHeading = document.createElement("h3") as HTMLElement;
        let settingInput: HTMLElement;
        if (i < 8) settingInput = document.createElement("div") as HTMLElement;
        else settingInput = document.createElement("input") as HTMLInputElement;

        mainSettingContainer.appendChild(settingContainer);
        settingContainer.appendChild(settingHeading);
        settingContainer.appendChild(settingInput);

        /*if (menuStore.get("currentMenuNav") === "play")
          settingContainer.className = "setting-container";
        else*/ settingContainer.className = "setting-container2";

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
          setting.textContent = player.playerInput.moveUp.slice(3);
          break;
        case 1:
          setting.textContent = player.playerInput.moveLeft.slice(3);
          break;
        case 2:
          setting.textContent = player.playerInput.moveRight.slice(3);
          break;
        case 3:
          setting.textContent = player.playerInput.moveDown.slice(3);
          break;
        case 4:
          setting.textContent = player.playerSpells.spell1.value.slice(3);
          break;
        case 5:
          setting.textContent = player.playerSpells.spell2.value.slice(3);
          break;
        case 6:
          setting.textContent = player.playerSpells.spell3.value.slice(3);
          break;
        case 7:
          setting.textContent = player.playerSpells.projectile.value.slice(3);
          break;
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
        settingInput.textContent = player.playerSpells.spell2.value.slice(3);
        break;
      case 6:
        settingHeading.textContent = "Spell 3";
        settingInput.textContent = player.playerSpells.spell3.value.slice(3);
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
        if (!this.isChangingKeybind) {
          this.isChangingKeybind = true;
          settingInput.textContent = "press any key to save changes";
          settingInput.style.fontSize = "8px";
          this.inputBeingChanged = settingInput;
          this.containerBeingChanged = settingContainer;
        }
      });
    }
  }

  removeSettings() {
    this.mainDiv.remove();
  }
}
