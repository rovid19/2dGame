import { Menu } from "../Level/LevelLogic/Game UI/InGameMenu";
import { backIcon2 } from "../Utils/IconsExports";
import { mainMenu } from "./MainMenuLogic";

export class Settings extends Menu {
  settingsContainer: HTMLElement = document.createElement("div");
  settingsMainDiv: HTMLElement = document.createElement("div");
  settingsBackButton: HTMLElement = document.createElement("button");
  settingsEventListeners: (() => void)[] = [];
  constructor() {
    super();
  }

  createSettings() {
    document.body.appendChild(this.settingsContainer);
    this.settingsContainer.appendChild(this.settingsMainDiv);
    this.settingsMainDiv.appendChild(this.settingsBackButton);

    this.settingsContainer.className = "main-menu-settings-container";
    this.settingsMainDiv.className = "main-menu-settings";
    this.settingsBackButton.className = "main-menu-settings-back-btn";
    this.settingsBackButton.innerHTML = backIcon2;

    this.createSettingContainers();
    this.backButtonEventListener();
  }

  backButtonEventListener() {
    const playAnimation = () => {
      this.animationOut();
      mainMenu.mainMenuAnimation("in");
    };
    this.settingsEventListeners.push(playAnimation);

    this.settingsBackButton.addEventListener(
      "click",
      this.settingsEventListeners[0]
    );
  }

  removeSettingsEventListeners() {
    this.settingsBackButton.removeEventListener(
      "click",
      this.settingsEventListeners[0]
    );
  }

  animationOut() {
    this.settingsContainer.id = "settings-animation-out";
    mainMenu.resetMainMenu();
    setTimeout(() => {
      //document.querySelector(".main-setting-container2")?.remove();
      this.settingsContainer.remove();
      this.settingsContainer.removeAttribute("id");
      this.removeSettingsEventListeners();
    }, 200);
  }
}
