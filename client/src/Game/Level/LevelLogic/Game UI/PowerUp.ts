import { inGameSounds, player } from "../mainLevelLogic";
import { generateArrayWithUniqueNumbers } from "../../../../Utils/OftenUsed";

import { PowerUpType } from "../../../../Utils/TsTypes";

export class PowerUp {
  isPowerUpActive: boolean = false;
  lastPowerUp: string = "spellIncrease";
  availablePowerUps: PowerUpType[] = [];
  availablePowerUpsHtmlElements: HTMLElement[] = [];
  randomNumberArray: number[] = [];
  powerUpQueue: boolean = false;
  powerUpQueueArray: number[] = [];
  rarityArray: string[] = [
    "silver",
    "silver",
    "silver",
    "silver",
    "blue",
    "blue",
    "gold",
  ];

  // power ups
  generalIncrease: PowerUpType[] = [
    {
      name: "Damage increase",
      description: "Increases damage output.",
      value: 0,
      rarity: "",
    },
    {
      name: "Movement speed increase",
      description: "Increases spaceship movement speed.",
      value: 0,
      rarity: "",
    },
    {
      name: "Reload speed increase",
      description: "Increases reload speed for faster projectile firing.",
      value: 0,
      rarity: "gold",
    },
    /*{
      name: "Projectile size increase",
      description: "Increases projectile hitbox so it's easier to hit enemies.",
      value: 0,
      rarity: "",
    },*/
    {
      name: "Cooldown reduction",
      description: "Decreases cooldown for every spell by", // Ensure the description is complete.
      value: 0,
      rarity: "",
    },
  ];
  spellIncrease: PowerUpType[] = [
    {
      name: "Shield duration increase",
      value: 0,
      description: "increases duration of player shield",
      rarity: "",
    },
    {
      name: "Shield amount increase",
      value: 0,
      description: "increases amount of damage player shield can take",
      rarity: "",
    },
    {
      name: "Explosion damage increase",
      value: 0,
      description: "increases damage of explosion spell",
      rarity: "",
    },
    {
      name: "Explosion radius increase",
      value: 0,
      description: "increases radius of explosion spell",
      rarity: "",
    },
    {
      name: "Walls duration increase",
      value: 0,
      description:
        "increases duration of a spell which allows player to go through left and rigth side of walls",
      rarity: "",
    },
  ];

  // power up modal
  powerUpContainer: HTMLElement = document.createElement("div");
  powerUpMainDiv: HTMLElement = document.createElement("div");
  powerUpHeading: HTMLElement = document.createElement("h1");
  powerUpCardContainer: HTMLElement = document.createElement("div");
  selectedPowerUpCard: HTMLElement = document.createElement("article");

  constructor() {}

  openPowerUp() {
    if (!this.powerUpQueue) {
      if (this.isPowerUpActive) {
        inGameSounds.playPowerUpOpen();
        this.powerUpQueue = true;

        player.playerInput.removeEventListener();
        player.playerSpells.removeEventListener();

        document.body.appendChild(this.powerUpContainer);
        this.powerUpContainer.appendChild(this.powerUpMainDiv);
        this.powerUpMainDiv.appendChild(this.powerUpHeading);
        this.powerUpMainDiv.appendChild(this.powerUpCardContainer);

        this.powerUpContainer.className = "power-up-container";
        this.powerUpMainDiv.className = "power-up-main-div";
        this.powerUpHeading.textContent = "Choose an upgrade";
        this.powerUpHeading.id = "power-up-heading";
        this.powerUpHeading.className = "sixtyfour-myapp";
        this.powerUpCardContainer.id = "power-up-card-container";
        this.powerUpCardContainer.className = "sixtyfour-myapp";

        this.generatePowerUps();
        player.isPlayerAlive = false;
      }
    }
  }

  generatePowerUps() {
    if (this.lastPowerUp === "spellIncrease") {
      this.randomNumberArray = generateArrayWithUniqueNumbers(
        3,
        this.generalIncrease.length - 1
      );
      this.assignItemRarityToPowerUps("general");
      this.lastPowerUp = "generalIncrease";
    } else {
      this.randomNumberArray = generateArrayWithUniqueNumbers(
        3,
        this.spellIncrease.length - 1
      );
      this.assignItemRarityToPowerUps("spell");
      this.lastPowerUp = "spellIncrease";
    }

    this.createPowerUpCards();
  }

  createPowerUpCards() {
    for (let i = 0; i < 3; i++) {
      let delay = 200 + i * 2 * 10;
      setTimeout(() => {
        const card = document.createElement("article");
        const cardHeadingContainer = document.createElement("div");
        const cardHeading = document.createElement("h3");
        const cardDescriptionContainer = document.createElement("div");
        const cardDescription = document.createElement("div");
        const cardValue = document.createElement("h2");

        this.powerUpCardContainer.appendChild(card);
        card.appendChild(cardHeadingContainer);
        card.appendChild(cardDescriptionContainer);
        cardHeadingContainer.appendChild(cardHeading);
        cardDescriptionContainer.appendChild(cardDescription);
        cardDescriptionContainer.appendChild(cardValue);

        card.className = "sixtyfour-myapp";
        card.id = "power-up-card";
        cardHeadingContainer.className = "card-heading-container";
        cardHeading.textContent = this.availablePowerUps[i].name as string;
        cardHeading.id = "card-heading";
        cardHeading.className = "sixtyfour-myapp";
        cardDescriptionContainer.className = "card-description-container";
        cardDescription.textContent = this.availablePowerUps[i]
          .description as string;
        cardDescription.className = "sixtyfour-myapp";
        cardDescription.id = "card-description";
        cardValue.id = "card-value";
        cardValue.className = "sixtyfour-myapp";

        this.eventListenerForPowerUpCards(card, i);
        this.availablePowerUpsHtmlElements.push(card);
        this.createPowerUpDetailsAndStylingAccordingToItsRarity(
          this.availablePowerUps[i].rarity as string,
          this.availablePowerUps[i],
          this.availablePowerUpsHtmlElements[i]
        );
        cardValue.textContent = `${this.availablePowerUps[i].value}%`;
      }, delay);
    }
  }

  eventListenerForPowerUpCards(card: HTMLElement, i: number) {
    card.addEventListener("click", () => {
      inGameSounds.playPowerUpSelected();
      if (this.lastPowerUp === "generalIncrease") {
        player.increasePlayerStatsAfterPowerUp(
          this.availablePowerUps[i].name as string,
          this.availablePowerUps[i].value as number
        );
      } else {
        player.playerSpells.increaseSpellStats(
          this.availablePowerUps[i].name as string,
          this.availablePowerUps[i].value as number
        );
      }

      this.powerUpMainDiv.id = "power-up-main-div-ani-out";

      setTimeout(() => {
        document.querySelectorAll("#power-up-card").forEach((powerUp) => {
          powerUp.remove();
        });
        this.powerUpContainer.remove();
        this.availablePowerUpsHtmlElements = [];
        this.availablePowerUps = [];
        this.isPowerUpActive = false;
        this.powerUpQueueArray.pop();
        this.powerUpQueue = false;

        player.isPlayerAlive = true;
        player.playerInput.resetInput();
        player.playerSpells.resetSpellEventListeners();

        this.powerUpMainDiv.removeAttribute("id");
      }, 400);
    });
  }

  createPowerUpDetailsAndStylingAccordingToItsRarity(
    rarity: string,
    powerUp: PowerUpType,
    powerUpElement: HTMLElement
  ) {
    if (rarity === "silver") {
      powerUp.value = 10;
      powerUpElement.style.backgroundColor = "#C0C0C0";
    } else if (rarity === "blue") {
      powerUp.value = 25;
      powerUpElement.style.backgroundColor = "#c13bc1";
    } else {
      powerUp.value = 35;
      powerUpElement.style.backgroundColor = "#FFD700";
    }
  }

  randomlyDecideRarityOfPowerUp(): string {
    const randomNumber =
      Math.floor(Math.random() * this.rarityArray.length - 1) + 1;

    const itemRarity = this.rarityArray[randomNumber];
    return itemRarity;
  }

  increaseRarityOfPowerUps() {
    if (player.playerLevel > 4) {
      this.rarityArray.shift();
      this.rarityArray.push("blue");
      //console.log("lvl5", this.rarityArray);
      if (player.playerLevel > 9) {
        this.rarityArray.shift();
        this.rarityArray.push("gold");
        // console.log("lvl10", this.rarityArray);
      }
    }
  }

  assignItemRarityToPowerUps(whichPowerUp: string) {
    let upgradeArray = [] as PowerUpType[];

    if (whichPowerUp === "general") {
      upgradeArray = this.generalIncrease;
    } else {
      upgradeArray = this.spellIncrease;
    }

    this.randomNumberArray.forEach((number) => {
      const itemRarity = this.randomlyDecideRarityOfPowerUp();

      upgradeArray[number].rarity = itemRarity;

      this.availablePowerUps.push(upgradeArray[number]);
    });
  }

  openPowerUpIfQueueExists() {
    if (this.powerUpQueueArray.length > 0) {
      if (!this.powerUpQueue) {
        this.isPowerUpActive = true;
        this.openPowerUp();
      }
    }
  }
}
