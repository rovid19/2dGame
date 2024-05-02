import { backIcon2 } from "../Utils/IconsExports";
import { mainMenu } from "./MainMenuLogic";

export class Leaderboards {
  leaderboardsContainer: HTMLElement = document.createElement("div");
  leaderboardsMainDiv: HTMLElement = document.createElement("div");
  leaderboardsHeading: HTMLElement = document.createElement("h1");
  leaderboardsBackBtn: HTMLElement = document.createElement("button");
  leaderboardsScoreContainer: HTMLElement = document.createElement("div");
  leaderboardsEventListeners: (() => void)[] = [];

  constructor() {}

  createLeaderboards() {
    document.body.appendChild(this.leaderboardsContainer);
    this.leaderboardsContainer.appendChild(this.leaderboardsMainDiv);
    this.leaderboardsMainDiv.appendChild(this.leaderboardsHeading);
    this.leaderboardsMainDiv.appendChild(this.leaderboardsBackBtn);
    this.leaderboardsMainDiv.appendChild(this.leaderboardsScoreContainer);

    this.leaderboardsContainer.className = "leaderboards-container";
    this.leaderboardsMainDiv.className = "leaderboards-main-div";
    this.leaderboardsHeading.id = "leaderboards-heading";
    this.leaderboardsHeading.className = "sixtyfour-myapp";
    this.leaderboardsHeading.textContent = "Leaderboards";
    this.leaderboardsBackBtn.className = "main-menu-settings-back-btn";
    this.leaderboardsScoreContainer.className = "leaderboards-score-container";

    this.leaderboardsBackBtn.innerHTML = backIcon2;

    this.backButtonEventListener();
  }

  createLeaderboardScores() {}

  removeEventListeners() {
    this.leaderboardsBackBtn.removeEventListener(
      "click",
      this.leaderboardsEventListeners[0]
    );
  }

  backButtonEventListener() {
    const playAnimation = () => {
      this.animationOut();
      mainMenu.mainMenuAnimation("in");
    };
    this.leaderboardsEventListeners.push(playAnimation);

    this.leaderboardsBackBtn.addEventListener(
      "click",
      this.leaderboardsEventListeners[0]
    );
  }

  animationOut() {
    this.leaderboardsContainer.id = "settings-animation-out";
    mainMenu.resetMainMenu();
    setTimeout(() => {
      this.leaderboardsContainer.remove();
      this.leaderboardsContainer.removeAttribute("id");
      this.removeEventListeners();
    }, 200);
  }
}
