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
      const leaderboardScore = document.createElement("h2");
      const number = document.createElement("h3");

      this.leaderboardsScoreContainer.appendChild(leaderboardScoreContainer);
      leaderboardScoreContainer.appendChild(leaderboardScore);
      leaderboardScoreContainer.appendChild(number);

      leaderboardScoreContainer.className =
        "leaderboard-single-score-container";
      leaderboardScore.className = "sixtyfour-myapp";
      leaderboardScore.id = "leaderboard-single-score";
      number.id = "score-number";
      number.className = "sixtyfour-myapp";

      let username = service.topScores[i].player;

      if (username.length > 15) username = `${username.slice(0, 9)}..`;

      leaderboardScore.textContent = `${username}: ${service.topScores[i].score} pts `;
      number.textContent = `${i + 1}.`;

      if (i === 0) {
        console.log(service.topScores[i]);
        leaderboardScoreContainer.style.border = "2px solid #FFD700";
      } else if (i === 1) {
        leaderboardScoreContainer.style.border = "2px solid #c13bc1";
      } else if (i === 2) {
        leaderboardScoreContainer.style.border = "2px solid #c0c0c0";
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
