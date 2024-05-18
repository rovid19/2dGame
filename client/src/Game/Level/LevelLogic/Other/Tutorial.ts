import { service } from "../../../MainMenu/MainMenuLogic";
import { player } from "../mainLevelLogic";

export class Tutorial {
  isReady: boolean = false;
  tutorialContainer: HTMLElement = document.createElement("div");
  tutorialTracker: number[] = [];

  constructor() {
    this.isTutorialNeeded();
  }

  keydownMethod(e: KeyboardEvent) {
    if (this.tutorialTracker.length === 1) {
      this.removeIntroduction();
      this.firing();
    }
  }

  isTutorialNeeded() {
    if (service.playerReady) {
      this.isReady = false;
      player.isPlayerAlive = false;
      console.log(player.isPlayerAlive);
    } else {
      this.isReady = true;
    }

    console.log(this.isReady);
  }

  createTutorial() {
    if (this.isReady) {
      document.body.appendChild(this.tutorialContainer);
      this.tutorialContainer.className = "tutorial-container";

      this.introduction();
    }
  }

  introduction() {
    const introductionText = document.createElement("h1");
    const subText = document.createElement("h3");

    this.tutorialContainer.appendChild(introductionText);
    this.tutorialContainer.appendChild(subText);
    introductionText.className = "sixtyfour-myapp";
    introductionText.id = "introduction-text";
    introductionText.textContent =
      "Since this is your first time starting this game, here's a quick tutorial on how the game works";
    subText.className = "sixtyfour-myapp";
    subText.id = "sub-text";
    subText.textContent = "press any key to continue";

    this.tutorialTracker.push(0);
  }

  removeIntroduction() {
    document.getElementById("introduction-text")?.remove();
    document.getElementById("sub-text")?.remove();
  }

  firing() {}

  removeFiring() {}

  shieldActivation() {}

  walllsActivation() {}

  explosionActivation() {}

  autoFire() {}
}
