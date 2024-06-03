import { menuStore } from "../../../../Stores/MenuStore";
import { service } from "../../../MainMenu/MainMenuLogic";
import { HUD, player } from "../mainLevelLogic";

export class Tutorial {
  isReady: boolean = false;
  tutorialContainer: HTMLElement = document.createElement("div");
  tutorialTracker: number[] = [];
  htmlElement: HTMLElement = document.createElement("div");
  htmlElementText: HTMLElement = document.createElement("h2");
  nextStep: boolean = false;

  constructor() {
    this.isTutorialNeeded();
  }

  keydownMethod() {
    if (this.tutorialTracker.length === 1) {
      this.removeIntroduction();
      setTimeout(() => {
        this.firing();
      }, 0);
    }
  }

  isTutorialNeeded() {
    const isMobile = menuStore.get("mobile");
    if (!isMobile) {
      if (service.playerReady) {
        this.isReady = false;
        player.isPlayerAlive = false;
        console.log(player.isPlayerAlive);
      } else {
        this.isReady = true;
      }
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
      "Since this is your first time starting the game, here's a quick tutorial on how it works.";
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

    const div = document.createElement("div");
    const movementText = document.createElement("h2");

    this.tutorialContainer.appendChild(div);
    div.appendChild(movementText);

    div.className = "tutorial-div";
    movementText.className = "sixtyfour-myapp";
    movementText.textContent =
      "You can move the spaceship using W, A, S, and D keys, and fire projectiles by pressing P.";

    this.htmlElement = div;
  }

  removeDiv(htmlElement: HTMLElement) {
    htmlElement.id = "close-div";
    setTimeout(() => {
      htmlElement.removeAttribute("id");
      htmlElement.remove();
    }, 200);
  }

  spellActivation(spell: string) {
    this.tutorialTracker.push(0);
    const div = document.createElement("div");
    const text = document.createElement("h2");

    this.tutorialContainer.appendChild(div);
    div.appendChild(text);

    div.className = "tutorial-div";
    text.className = "sixtyfour-myapp";

    if (spell === "shield") {
      text.textContent =
        "The Shield spell is highlighted on your screen. Press 'Q' to activate your shield.";
      HUD.playerSpell1.style.border = "5px solid red";
    } else if (spell === "walls") {
      text.textContent =
        "Your Walls spell is highlighted on the screen. Press 'E' to activate the shield.";
      HUD.playerSpell2.style.border = "5px solid red";
    } else if (spell === "explosion") {
      text.textContent =
        "Your Explosion spell is highlighted on the screen. Press 'R' to activate it.";
      HUD.playerSpell3.style.border = "5px solid red";
    }

    if (spell === "autofire") {
      text.textContent =
        "Your Autofire toggle is highlighted on the screen. Press 'O' to turn on autofire.";
      HUD.playerSpell4.style.border = "5px solid red";
    }

    this.htmlElementText = text;
    this.htmlElement = div;
  }
}
