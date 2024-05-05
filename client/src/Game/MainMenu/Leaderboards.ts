import { backIcon2 } from "../../Utils/IconsExports";
import { mainMenu, service } from "./MainMenuLogic";

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
    this.leaderboardsMainDiv.appendChild(this.leaderboardsBackBtn);
    this.leaderboardsMainDiv.appendChild(this.leaderboardsScoreContainer);
    this.leaderboardsScoreContainer.appendChild(this.leaderboardsHeading);

    this.leaderboardsContainer.className = "leaderboards-container";
    this.leaderboardsMainDiv.className = "leaderboards-main-div";
    this.leaderboardsHeading.id = "leaderboards-heading";
    this.leaderboardsHeading.className = "sixtyfour-myapp";
    this.leaderboardsHeading.textContent = "Leaderboards";
    this.leaderboardsBackBtn.className = "main-menu-settings-back-btn";
    this.leaderboardsScoreContainer.className = "leaderboards-score-container";

    this.leaderboardsBackBtn.innerHTML = backIcon2;

    this.backButtonEventListener();
    service.fetchTopScores();
  }

  createLeaderboardScores() {
    document
      .querySelectorAll(".leaderboard-single-score-container")
      .forEach((item) => item.remove());

    for (let i = 0; i < 10; i++) {
      const leaderboardScoreContainer = document.createElement("div");
      const leaderboardScore = document.createElement("div");
      const leaderboardScoreUsername = document.createElement("div");
      const leaderboardScorePoints = document.createElement("div");

      this.leaderboardsScoreContainer.appendChild(leaderboardScoreContainer);
      leaderboardScoreContainer.appendChild(leaderboardScore);
      leaderboardScore.appendChild(leaderboardScoreUsername);
      leaderboardScore.appendChild(leaderboardScorePoints);
      console.log(leaderboardScoreUsername);

      leaderboardScoreContainer.className =
        "leaderboard-single-score-container";
      leaderboardScore.className = "sixtyfour-myapp";
      leaderboardScore.id = "leaderboard-single-score";
      leaderboardScoreUsername.className = "leaderboardUsername";

      leaderboardScoreUsername.textContent = "DA";

      let username = service.topScores[i].player;

      if (username.length > 9) username = `${username.slice(0, 9)}..`;

      leaderboardScore.textContent = `${i + 1}. ${username}: ${
        service.topScores[i].score
      } pts `;

      if (i === 0) {
        console.log(service.topScores[i]);
        leaderboardScoreContainer.style.border = "2px solid #FFD700";
        leaderboardScoreContainer.style.backgroundColor =
          "rgba(255, 215, 0, 0.5)";
      } else if (i === 1) {
        leaderboardScoreContainer.style.border = "2px solid #c13bc1";
        leaderboardScoreContainer.style.backgroundColor =
          "rgba(193, 59, 193, 0.5)";
      } else if (i === 2) {
        leaderboardScoreContainer.style.border = "2px solid #c0c0c0";
        leaderboardScoreContainer.style.backgroundColor =
          "rgba(192, 192, 192, 0.5)";
      }
    }
  }

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
