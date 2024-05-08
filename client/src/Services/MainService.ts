import axios from "axios";
import { mainMenu } from "../Game/MainMenu/MainMenuLogic";

type TopScore = {
  player: string;
  score: number;
};

export class Service {
  topScores: TopScore[] = [];
  playerUsername: string = "";
  playerReady: boolean = false;
  constructor() {
    this.getUsernameFromLocalStorage();
  }

  async fetchTopScores() {
    try {
      const response = await axios.get("/api/score/fetch-top-10-scores");

      this.topScores = response.data as TopScore[];

      mainMenu.leaderboards.createLeaderboardScores();
    } catch (error) {
      console.error("Failed to fetch top scores:", error);
    }
  }

  async saveUserScoreToDb(playerName: string, playerScore: number) {
    await axios.post("/api/score/save-player-score-to-db", {
      playerName,
      playerScore,
    });
  }

  saveUsernameToLocalStorage(playerName: string) {
    localStorage.setItem("username", playerName);
    this.playerReady = true;
  }

  getUsernameFromLocalStorage() {
    const username = localStorage.getItem("username") as string;
    this.playerUsername = username;

    if (username) this.playerReady = true;
  }
}
