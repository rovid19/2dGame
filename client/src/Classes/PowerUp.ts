import { generateArrayWithUniqueNumbers } from "../Level/LevelLogic/canvasLogic";
import {
  player,
  playerMovementInput,
} from "../Level/LevelLogic/mainLevelLogic";
import { PowerUpType } from "../Utils/TsTypes";

export class PowerUp {
  isPowerUpActive: boolean = false;
  lastPowerUp: string = "spellIncrease";
  availablePowerUps: PowerUpType[] = [];
  availablePowerUpsHtmlElements: HTMLElement[] = [];
  randomNumberArray: number[] = [];

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
      rarity: "",
    },
    {
      name: "Projectile size increase",
      description: "Increases projectile hitbox so it's easier to hit enemies.",
      value: 0,
      rarity: "",
    },
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
    if (this.isPowerUpActive) {
      playerMovementInput.removeEventListener();
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

  generatePowerUps() {
    if (this.lastPowerUp === "spellIncrease") {
      this.randomNumberArray = [2];
      this.assignItemRarityToPowerUps("general");
      // this.lastPowerUp = "generalIncrease";
    } else {
      this.randomNumberArray = generateArrayWithUniqueNumbers(
        2,
        this.spellIncrease.length - 1
      );
      this.assignItemRarityToPowerUps("general");
      this.lastPowerUp = "spellIncrease";
    }

    this.createPowerUpCards();
  }

  createPowerUpCards() {
    for (let i = 0; i < 3; i++) {
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
      }, 200);
    }
  }

  eventListenerForPowerUpCards(card: HTMLElement, i: number) {
    card.addEventListener("click", () => {
      player.increasePlayerStatsAfterPowerUp(
        this.availablePowerUps[i].name as string,
        this.availablePowerUps[i].value as number
      );
      document.querySelectorAll("#power-up-card").forEach((powerUp) => {
        powerUp.remove();
      });
      this.powerUpContainer.remove();
      this.availablePowerUpsHtmlElements = [];
      this.availablePowerUps = [];
      this.isPowerUpActive = false;
      player.isPlayerAlive = true;
      playerMovementInput.resetInput();
      player.playerSpells.resetSpells();
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
    const rarityArray = [
      "silver",
      "silver",
      "silver",
      "silver",
      "blue",
      "blue",
      "gold",
    ];

    const randomNumber = Math.floor(Math.random() * rarityArray.length - 1) + 1;

    const itemRarity = rarityArray[randomNumber];
    console.log(itemRarity);
    return itemRarity;
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

      console.log("item", upgradeArray[number], "number", number);
      upgradeArray[number].rarity = itemRarity;

      this.availablePowerUps.push(upgradeArray[number]);
    });
  }
}
