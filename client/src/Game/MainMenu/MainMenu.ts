import { generateLevel, setHud } from "../Level/LevelLogic/mainLevelLogic";
import { menuStore } from "../../Stores/MenuStore";
import { muteAudio, playAudio } from "../../Utils/IconsExports";
import { LeaderboardType, SettingsType } from "../../Utils/TsTypes";
import { service } from "./MainMenuLogic";

export class MainMenu {
  // main menu
  mainContainer: HTMLElement = document.createElement("div");
  mainMenuDiv: HTMLElement = document.createElement("div");
  mainMenuOverlayDiv: HTMLElement = document.createElement("div");
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
  mainMenuNavEventListeners: (() => void)[] = [];

  // set username popup
  usernameContainer: HTMLElement = document.createElement("div");
  usernameMainDiv: HTMLElement = document.createElement("div");
  usernameHeading: HTMLElement = document.createElement("h2");
  usernameInput: HTMLElement = document.createElement("input");
  usernameButton: HTMLElement = document.createElement("button");

  // play animation
  playAnimationDiv: HTMLElement = document.createElement("div");
  playAnimationLoaderDiv: HTMLElement = document.createElement("div");

  // states
  isAudioPlaying: boolean = false;
  audioVolume: number = 30;
  currentNav: string[] = [];
  backgroundScaleStoppedAt: number = 0;

  //
  settings: SettingsType;
  leaderboards: LeaderboardType;

  usernamePopupEventL: (() => void)[] = [];

  constructor(settings: SettingsType, leaderboards: LeaderboardType) {
    this.setMainMenu();
    this.setMainMenuNav();
    this.settings = settings;
    this.leaderboards = leaderboards;
    this.changeSoundtrackVolume(0.15);
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
    this.mainMenuNav.appendChild(this.mainMenuOverlayDiv);
    this.mainMenuOverlayDiv.appendChild(this.mainMenuNavButton);
    this.mainMenuOverlayDiv.appendChild(this.mainMenuNavHeading);
    this.mainMenuOverlayDiv.appendChild(this.mainMenuNavLi1);
    this.mainMenuOverlayDiv.appendChild(this.mainMenuNavLi2);
    this.mainMenuOverlayDiv.appendChild(this.mainMenuNavLi3);

    this.mainMenuNavContainer.id = "mainMenuNav-container";
    this.mainMenuNav.className = "main-menu-nav";
    this.mainMenuOverlayDiv.className = "nav-overlay";
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
    const startGame = () => {
      if (service.playerReady) {
        console.log("pokrene se");
        menuStore.set("currentMenuNav", "play");
        this.currentNav.push("play");
        this.setAnimation();
        setTimeout(() => {
          generateLevel();
          setHud();
        }, 800);
      } else {
        this.createUsernamePopup();
      }
    };
    this.mainMenuNavEventListeners.push(startGame);

    const openSettings = () => {
      menuStore.set("currentMenuNav", "settings");
      this.currentNav.push("settings");
      this.mainMenuAnimation("out");
      this.settings.createSettings(this.mainContainer);
    };
    this.mainMenuNavEventListeners.push(openSettings);

    const openLeaderboards = () => {
      this.leaderboards.createLeaderboards();
      this.mainMenuAnimation("out");
    };
    this.mainMenuNavEventListeners.push(openLeaderboards);

    const playOrMute = () => this.playOrMuteSoundtrack();
    this.mainMenuNavEventListeners.push(playOrMute);

    this.mainMenuNavLi1.addEventListener("click", startGame);
    this.mainMenuNavLi2.addEventListener("click", openSettings);
    this.mainMenuNavLi3.addEventListener("click", openLeaderboards);
    this.mainMenuNavButton.addEventListener("click", playOrMute);
  }

  removeMainMenuNavEventListeners() {
    this.mainMenuNavLi1.removeEventListener(
      "click",
      this.mainMenuNavEventListeners[0]
    );
    this.mainMenuNavLi2.removeEventListener(
      "click",
      this.mainMenuNavEventListeners[1]
    );
    this.mainMenuNavLi3.removeEventListener(
      "click",
      this.mainMenuNavEventListeners[2]
    );
    this.mainMenuNavButton.removeEventListener(
      "click",
      this.mainMenuNavEventListeners[3]
    );
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
    //this.setMainMenu();
    this.setMainMenuNav();
    this.removeMainMenuNavEventListeners();
  }

  mainMenuAnimation(type: string) {
    if (type === "out") this.mainMenuNav.id = "main-menu-nav-out";
    else this.mainMenuNav.id = "main-menu-nav-in";
    setTimeout(() => {
      if (type === "out") this.mainMenuNavContainer.remove();
      this.mainMenuNav.removeAttribute("id");
    }, 200);
  }

  changeSoundtrackVolume(volume: number) {
    this.mainMenuAudio.volume = volume;
    this.audioVolume = volume * 100;
  }

  createUsernamePopup() {
    this.mainMenuNavContainer.appendChild(this.usernameContainer);
    this.usernameContainer.appendChild(this.usernameMainDiv);
    this.usernameMainDiv.appendChild(this.usernameHeading);
    this.usernameMainDiv.appendChild(this.usernameInput);
    this.usernameMainDiv.appendChild(this.usernameButton);

    this.usernameContainer.className = "username-container";
    this.usernameMainDiv.className = "username-div";
    this.usernameHeading.className = "sixtyfour-myapp";
    this.usernameInput.className = "sixtyfour-myapp";
    this.usernameInput.id = "username-input";
    this.usernameButton.className = "sixtyfour-myapp";
    this.usernameButton.id = "username-button";

    this.usernameHeading.textContent = "Enter your username";
    this.usernameButton.textContent = "Confirm";

    this.setUsernameEventListener();
  }

  setUsernameEventListener() {
    const saveUsername = (e) => {
      const target = e.target as HTMLInputElement;
      service.playerUsername = e.target.value;
    };
    this.usernamePopupEventL.push(saveUsername);
    const eventFunction = () => {
      service.saveUsernameToLocalStorage(service.playerUsername);
      this.removeUsernameEventListener();
      this.usernameContainer.remove();
      this.mainMenuNavEventListeners[0]();
    };
    this.usernamePopupEventL.push(eventFunction);

    this.usernameInput.addEventListener("change", saveUsername);
    this.usernameButton.addEventListener("click", eventFunction);
  }
  removeUsernameEventListener() {
    this.usernameInput.removeEventListener(
      "click",
      this.usernamePopupEventL[0]
    );
    this.usernameButton.removeEventListener(
      "click",
      this.usernamePopupEventL[1]
    );
  }
}
