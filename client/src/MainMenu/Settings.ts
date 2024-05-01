import { Menu } from "../Level/LevelLogic/Game UI/InGameMenu";
import { backIcon2 } from "../Utils/IconsExports";
import { mainMenu } from "./MainMenuLogic";

export class Settings extends Menu {
  settingsContainer: HTMLElement = document.createElement("div");
  settingsMainDiv: HTMLElement = document.createElement("div");
  settingsBackButton: HTMLElement = document.createElement("button");
  constructor() {
    super();
  }

  createSettings() {
    if (document.querySelector(".main-setting-container2"))
      document.querySelector(".main-setting-container2")?.remove();
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
    this.settingsBackButton.addEventListener("click", () => {
      this.animationOut();
    });
  }

  animationOut() {
    this.settingsContainer.id = "settings-animation-out";
    mainMenu.resetMainMenu();
    setTimeout(() => {
      document.querySelector(".main-setting-container2")?.remove();
      this.settingsContainer.remove();
      this.settingsContainer.removeAttribute("id");
    }, 200);
  }
}
