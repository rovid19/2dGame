import { menuStore } from "../../../Stores/MenuStore";
import { backIcon, backIcon2 } from "../../../Utils/IconsExports";
import { menu } from "../../Level/LevelLogic/mainLevelLogic";
import { mainMenu } from "../MainMenuLogic";

export class MenuScreen {
  container: HTMLElement = document.createElement("div");
  mainDiv: HTMLElement = document.createElement("div");
  backButton: HTMLElement = document.createElement("button");
  eventListeners: (() => void)[] = [];
  isInGameSettings: boolean = false;
  constructor() {}

  createMenuScreen(inGameMenuContainer?: HTMLElement) {
    this.isSettingsInGameOrMainMenu();

    if (this.isInGameSettings) {
      (inGameMenuContainer as HTMLElement).appendChild(this.mainDiv);
      this.mainDiv.className = "settings-main-div";
      this.backButton.className = "settings-back-button";
      this.backButton.innerHTML = backIcon;
      this.backButtonInGameEventListener();
    } else {
      document.body.appendChild(this.container);
      this.container.appendChild(this.mainDiv);
      this.container.className = "menu-screen-container";
      this.mainDiv.className = "menu-screen-main-div";
      this.backButton.className = "main-menu-settings-back-btn";
      this.backButton.innerHTML = backIcon2;
      this.backButtonEventListener();
    }

    this.mainDiv.appendChild(this.backButton);
  }

  backButtonEventListener() {
    const playAnimation = () => {
      this.animationOut();
      mainMenu.mainMenuAnimation("in");
    };
    this.eventListeners.push(playAnimation);

    this.backButton.addEventListener("click", this.eventListeners[0]);
  }

  backButtonInGameEventListener() {
    menu.createSettingsEventListeners(this.backButton, this.mainDiv);
  }

  removeEventListeners() {
    this.backButton.removeEventListener("click", this.eventListeners[0]);
  }

  animationOut() {
    this.container.id = "menu-screen-animation-out";
    setTimeout(() => {
      this.container.remove();
      this.container.removeAttribute("id");
      this.removeEventListeners();
    }, 200);
  }

  isSettingsInGameOrMainMenu() {
    const nav = menuStore.get("currentMenuNav") as string;

    if (nav === "play") this.isInGameSettings = true;
    else this.isInGameSettings = false;
  }
}
