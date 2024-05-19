import { service } from "../../../MainMenu/MainMenuLogic";
import { player } from "../mainLevelLogic";

export class Tutorial {
  isReady: boolean = false;
  tutorialContainer: HTMLElement = document.createElement("div");
  tutorialTracker: number[] = [];
  htmlElement: HTMLElement = document.createElement("div");

  constructor() {
    this.isTutorialNeeded();
  }

  keydownMethod(e: KeyboardEvent) {
    if (this.tutorialTracker.length === 1) {
      this.removeIntroduction();
      setTimeout(() => {
        this.firing();
      }, 0);
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

  firing() {
    this.tutorialTracker.push(0);
    this.tutorialContainer.style.background = "transparent";
    this.tutorialContainer.style.justifyContent = "start";

    const movementDiv = document.createElement("div");
    const movementText = document.createElement("h2");

    this.tutorialContainer.appendChild(movementDiv);
    movementDiv.appendChild(movementText);

    movementDiv.className = "tutorial-movement";
    movementText.className = "sixtyfour-myapp";
    movementText.textContent = "You can move spaceship around using W,A,S,D";

    this.htmlElement = movementDiv;
  }

  removeFiring(movementDiv: HTMLElement) {
    movementDiv.id = "close-div";
    setTimeout(() => {
      movementDiv.removeAttribute("id");
      movementDiv.remove();
    }, 200);
  }

  shieldActivation() {}

  walllsActivation() {}

  explosionActivation() {}

  autoFire() {}
}
