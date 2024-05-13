import { service } from "../MainMenuLogic";
import { MenuScreen } from "./MenuScreen";

export class Leaderboards extends MenuScreen {
  heading: HTMLElement = document.createElement("h1");
  scoreContainer: HTMLElement = document.createElement("div");

  constructor() {
    super();
  }

  createLeaderboards() {
    this.createMenuScreen();

    this.mainDiv.appendChild(this.heading);
    this.mainDiv.appendChild(this.scoreContainer);

    this.heading.className = "sixtyfour-myapp";
    this.heading.textContent = "Leaderboards";
    this.heading.id = "leaderboards-heading";
    this.scoreContainer.className = "leaderboards-score-container";

    service.fetchTopScores();
  }

  createLeaderboardScores() {
    document
      .querySelectorAll(".leaderboard-single-score-container")
      .forEach((item) => item.remove());

    for (let i = 0; i < 11; i++) {
      const leaderboardScoreContainer = document.createElement("div");
      const leaderboardScore = document.createElement("div");
      const leaderboardScoreUsername = document.createElement("div");
      const leaderboardScorePoints = document.createElement("div");

      this.scoreContainer.appendChild(leaderboardScoreContainer);
      leaderboardScoreContainer.appendChild(leaderboardScore);
      leaderboardScore.appendChild(leaderboardScoreUsername);
      leaderboardScore.appendChild(leaderboardScorePoints);

      leaderboardScoreContainer.className =
        "leaderboard-single-score-container";
      leaderboardScore.className = "sixtyfour-myapp";
      leaderboardScore.id = "leaderboard-single-score";
      leaderboardScoreUsername.className = "leaderboardUsername";

      //leaderboardScoreUsername.textContent = "DA";

      let username = service.topScores[i].player;
      let score = String(service.topScores[i].score);

      if (username.length > 9) username = `${username.slice(0, 9)}..`;
      //if (score.length > 5) score = `${score.slice(0, 5)}..`;

      leaderboardScore.textContent = `${i + 1}. ${username}: ${score} pts `;

      if (i === 0) {
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
}
