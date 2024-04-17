import { generateArrayWithUniqueNumbers } from "../Level/LevelLogic/canvasLogic";
import { PowerUpType } from "../Utils/TsTypes";

export class PowerUp {
  isPowerUpActive: boolean = false;
  powerUpAvailable: any = {};
  lastPowerUp: string = "spellIncrease";
  availablePowerUps: any = [];
  randomNumberArray: number[] = [];

  // power ups
  generalIncrease: PowerUpType[] = [
    {
      name: "Damage increase",
      description: "Increases damage output.", // Added a placeholder description
      value: 0,
      rarity: "",
    },
    {
      name: "Projectile speed increase",
      description: "Enables faster projectile firing.",
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
      description: "increases duration of shield by",
      rarity: "",
    },
    {
      name: "Shield amount increase",
      value: 0,
      description: "increases amount of shield by",
      rarity: "",
    },
    {
      name: "Explosion damage increase",
      value: 0,
      description: "increases damage of explosion spell by",
      rarity: "",
    },
    {
      name: "Walls duration increase",
      value: 0,
      description: "increases duration of walls spell by",
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

      this.createPowerUpCards();
      this.generatePowerUps();
    }
  }

  createPowerUpCards() {
    this.randomNumberArray = generateArrayWithUniqueNumbers(3);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const card = document.createElement("article");
        this.powerUpCardContainer.appendChild(card);
        card.className = "sixtyfour-myapp";
        card.id = "power-up-card";
        this.eventListenerForPowerUpCards(card);
      }, 200);
    }
  }

  eventListenerForPowerUpCards(card: HTMLElement) {
    card.addEventListener("click", () => {
      this.isPowerUpActive = false;
      this.powerUpContainer.remove();
    });
  }

  generatePowerUps() {
    if (this.lastPowerUp === "spellIncrease") {
      this.take3RandomPowerUpsAndPushThemIntoAnArray(this.generalIncrease);
      this.lastPowerUp = "generalIncrease";
    } else {
      this.take3RandomPowerUpsAndPushThemIntoAnArray(this.spellIncrease);
      this.lastPowerUp = "spellIncrease";
    }
  }

  take3RandomPowerUpsAndPushThemIntoAnArray(powerUpArray: PowerUpType[]) {
    this.randomNumberArray = generateArrayWithUniqueNumbers(3);
    this.randomNumberArray.forEach((number) => {
      const itemRarity = this.randomlyDecideRarityOfPowerUp();
      powerUpArray[number].rarity = itemRarity;
      this.createPowerUpDetailsAccordingToItsRarity(
        itemRarity,
        powerUpArray[number]
      );
      this.availablePowerUps.push(powerUpArray[number]);
      console.log(this.availablePowerUps);
    });
  }

  createPowerUpDetailsAccordingToItsRarity(
    rarity: string,
    powerUp: PowerUpType
  ) {
    if (rarity === "silver") {
      powerUp.value = 10;
    } else if (rarity === "blue") {
      powerUp.value = 25;
    } else {
      powerUp.value = 35;
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

    const randomNumber = Math.floor(Math.random() * rarityArray.length) + 1;

    const itemRarity = rarityArray[randomNumber];

    return itemRarity;
  }
}
