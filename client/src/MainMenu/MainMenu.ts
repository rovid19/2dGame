import { generateLevel, setHud } from "../Level/LevelLogic/mainLevelLogic";
import { menuStore } from "../Stores/MenuStore";
import { muteAudio, playAudio } from "../Utils/IconsExports";
import { SettingsType } from "../Utils/TsTypes";

export class MainMenu {
  // main menu
  mainContainer: HTMLElement = document.createElement("div");
  mainMenuDiv: HTMLElement = document.createElement("div");
  mainMenuInnerDiv: HTMLElement = document.createElement("div");
  mainMenuAudio: HTMLAudioElement = new Audio(
    "../../public/sounds/soundtrack2.mp3"
  );

  // main menu nav
  mainMenuNavContainer: HTMLElement = document.createElement("div");
  mainMenuNav: HTMLElement = document.createElement("nav");
  mainMenuNavButton: HTMLButtonElement = document.createElement("button");
  mainMenuNavHeading: HTMLElement = document.createElement("h1");
  mainMenuNavLi1: HTMLElement = document.createElement("li");
  mainMenuNavLi2: HTMLElement = document.createElement("li");
  mainMenuNavLi3: HTMLElement = document.createElement("li");

  // play animation
  playAnimationDiv: HTMLElement = document.createElement("div");
  playAnimationLoaderDiv: HTMLElement = document.createElement("div");

  // states
  isAudioPlaying: boolean = false;
  currentNav: string[] = [];

  //
  settings: SettingsType;

  constructor(settings: SettingsType) {
    this.setMainMenu();
    this.setMainMenuNav();
    this.settings = settings;
    menuStore.set("soundtrack", this.mainMenuAudio);
  }

  setMainMenu() {
    document.body.appendChild(this.mainContainer);
    this.mainContainer.appendChild(this.mainMenuDiv);
    this.mainMenuDiv.appendChild(this.mainMenuInnerDiv);

    this.mainContainer.id = "main-container";
    this.mainMenuDiv.className = "mainMenuDiv1";
    this.mainMenuInnerDiv.className = "animate-circle";
  }

  setMainMenuNav() {
    document.body.appendChild(this.mainMenuNavContainer);
    this.mainMenuNavContainer.appendChild(this.mainMenuNav);
    this.mainMenuNav.appendChild(this.mainMenuNavButton);
    this.mainMenuNav.appendChild(this.mainMenuNavHeading);
    this.mainMenuNav.appendChild(this.mainMenuNavLi1);
    this.mainMenuNav.appendChild(this.mainMenuNavLi2);
    this.mainMenuNav.appendChild(this.mainMenuNavLi3);

    this.mainMenuNavContainer.id = "mainMenuNav-container";
    this.mainMenuNav.id = "mainMenuNav";
    this.mainMenuNavButton.className = "audioBtn";
    this.mainMenuNavHeading.className = "sixtyfour-myapp";
    this.mainMenuNavLi1.className = "sixtyfour-myapp";
    this.mainMenuNavLi2.className = "sixtyfour-myapp";
    this.mainMenuNavLi3.className = "sixtyfour-myapp";

    this.mainMenuNavButton.innerHTML = !this.isAudioPlaying
      ? muteAudio
      : playAudio;

    this.mainMenuNavHeading.id = "nav-heading";
    this.mainMenuNavHeading.innerHTML = "Space </br> Apocalypse";
    this.mainMenuNavLi1.innerText = "Play";
    this.mainMenuNavLi2.innerText = "Settings";
    this.mainMenuNavLi3.innerText = "Leaderboards";

    this.setMainMenuNavEventListeners();
  }

  setMainMenuNavEventListeners() {
    this.mainMenuNavLi1.addEventListener("click", () => {
      menuStore.set("currentMenuNav", "play");
      this.currentNav.push("play");
      this.setAnimation();
      setTimeout(() => {
        generateLevel();
        setHud();
      }, 800);
    });

    this.mainMenuNavLi2.addEventListener("click", () => {
      menuStore.set("currentMenuNav", "settings");
      this.currentNav.push("settings");
      this.mainMenuOutAnimation();
      this.settings.createSettings(this.mainContainer);
    });

    this.mainMenuNavButton.addEventListener("click", () => {
      this.playOrMuteSoundtrack();
    });
  }

  setAnimation() {
    this.playAnimationDiv.id = "playAnimation";
    this.mainMenuNavContainer.appendChild(this.playAnimationDiv);

    this.playAnimationLoaderDiv.id = "levelLoaderDiv";

    setTimeout(() => {
      this.mainContainer.remove();
      this.mainMenuNavContainer.remove();
      document.body.appendChild(this.playAnimationLoaderDiv);
    }, 800);

    setTimeout(() => {
      this.playAnimationLoaderDiv.remove();
    }, 1600);
  }

  playOrMuteSoundtrack() {
    if (this.isAudioPlaying) {
      this.mainMenuAudio.pause();
      this.mainMenuNavButton.innerHTML = muteAudio;
      this.isAudioPlaying = false;
    } else {
      this.mainMenuAudio.play();
      this.mainMenuNavButton.innerHTML = playAudio;
      this.isAudioPlaying = true;
    }
  }

  resetMainMenu() {
    this.setMainMenu();
    this.setMainMenuNav();
  }

  mainMenuOutAnimation() {
    this.mainMenuNav.className = "main-menu-nav-out";
    setTimeout(() => {
      this.mainMenuNavContainer.remove();
    }, 200);
  }

  mainMenuInAnimation() {}
}
