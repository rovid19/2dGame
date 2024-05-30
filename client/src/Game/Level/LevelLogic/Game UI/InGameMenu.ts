import { enemySpawner, player, projectiles } from "../mainLevelLogic";
import { keydown, mainMenu } from "../../../MainMenu/MainMenuLogic";
import { menuStore } from "../../../../Stores/MenuStore";

export class Menu {
  menuContainer: HTMLElement = document.createElement("div");
  menuMainDiv: HTMLElement = document.createElement("div");
  menuButton1: HTMLElement = document.createElement("button");
  menuButton2: HTMLElement = document.createElement("button2");
  menuNote: HTMLElement = document.createElement("h4");
  settingsBackButton: HTMLElement = document.createElement("div");
  menuEventListeners: (() => void)[] = [];
  settingsEventListeners: (() => void)[] = [];

  nav: string = "";
  isChanging: boolean = false;
  constructor() {}

  openOrCloseMenu() {
    if (this.nav === "menu") {
      this.nav = "closeMenu";
      this.openMenu();
      this.removeMenuEventListeners();
    } else {
      this.nav = "menu";
      this.openMenu();
    }
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
      player.playerSpells.resetSpellEventListeners();
      player.isPlayerAlive = true;
      mainMenu.settings.resetSettingContainerValues();
      this.menuContainer.remove();
      mainMenu.settings.removeSettings();
    } else if (this.nav === "settings") {
      if (!document.querySelector(".settings-main-div")) {
        mainMenu.settings.createSettings();
      }
    }
  }

  createMenuPopup() {
    const isMobile = menuStore.get("mobile");
    document.body.appendChild(this.menuContainer);
    this.menuContainer.className = "menu-container";
    this.menuContainer.appendChild(this.menuMainDiv);
    this.menuMainDiv.className = "menu-main-div";
    this.menuMainDiv.appendChild(this.menuButton1);
    this.menuMainDiv.appendChild(this.menuButton2);
    this.menuMainDiv.appendChild(this.menuNote);
    this.menuNote.id = "menu-note";
    this.menuNote.className = "sixtyfour-myapp";
    this.menuNote.textContent = isMobile
      ? "press here to exit menu"
      : "press escape to exit";
    this.menuButton1.id = "menu-button";
    this.menuButton1.textContent = "Settings";
    this.menuButton1.className = "sixtyfour-myapp";
    this.menuButton2.id = "menu-button";
    this.menuButton2.textContent = "Exit to main menu";
    this.menuButton2.className = "sixtyfour-myapp";

    if (isMobile) {
      this.menuButton1.remove();
    }
  }

  createMenuEventListeners() {
    const openSettings = () => {
      this.nav = "settings";
      this.openMenu();
    };

    this.menuEventListeners.push(openSettings);

    const exitToMainMenu = () => {
      menuStore.set("currentMenuNav", "menu");
      mainMenu.setAnimationOut(this.menuContainer);
      player.resetPlayer();
      player.isPlayerAlive = false;
      enemySpawner.resetEnemies();
      projectiles.resetProjectile();
      player.playerInput.resetInput();
      player.playerSpells.resetSpells();
      player.playerSpells.resetSpellEventListeners();
      mainMenu.settings.removeSettings();
      this.removeSettingsEventListeners();
      this.menuMainDiv.remove();
      this.removeMenuEventListeners();
      keydown.autoFire = false;
    };
    this.menuEventListeners.push(exitToMainMenu);

    this.menuButton1.addEventListener("click", openSettings);
    this.menuButton2.addEventListener("click", exitToMainMenu);

    const isMobile = menuStore.get("mobile");
    if (isMobile) {
      const exitMenu = () => {
        this.nav = "closeMenu";
        this.openMenu();
      };

      this.menuEventListeners.push(exitMenu);
      this.menuNote.addEventListener("click", exitMenu);
    }
  }

  removeMenuEventListeners() {
    this.menuButton1.removeEventListener("click", this.menuEventListeners[0]);
    this.menuButton2.removeEventListener("click", this.menuEventListeners[1]);

    const isMobile = menuStore.get("mobile");
    if (isMobile) {
      this.menuNote.removeEventListener("click", this.menuEventListeners[2]);
    }
  }

  // settings popup

  addClosingAnimation(backButton: HTMLElement, mainDiv: HTMLElement) {
    mainDiv.setAttribute("ani", "close");
    document.querySelectorAll(".setting-container").forEach((con) => {
      con.setAttribute("ani", "closeRest");
    });
    backButton.setAttribute("ani", "closeRest");
  }

  removeClosingAnimation(backButton: HTMLElement, mainDiv: HTMLElement) {
    mainDiv.removeAttribute("ani");
    document.querySelectorAll(".setting-container").forEach((con) => {
      con.removeAttribute("ani");
    });
    backButton.removeAttribute("ani");
  }

  createSettingsEventListeners(backButton: HTMLElement, mainDiv: HTMLElement) {
    const closeSettings = () => {
      this.addClosingAnimation(backButton, mainDiv);
      setTimeout(() => {
        this.nav = "menu";
        mainMenu.settings.resetSettingContainerValues();
        this.removeClosingAnimation(backButton, mainDiv);
        mainDiv.remove();
        this.removeSettingsEventListeners();
      }, 1000);
    };
    this.settingsEventListeners.push(closeSettings);
    this.settingsBackButton = backButton;

    backButton.addEventListener("click", closeSettings);
  }

  removeSettingsEventListeners() {
    this.settingsBackButton.removeEventListener(
      "click",
      this.settingsEventListeners[0]
    );
  }
}
