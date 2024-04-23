import { enemySpawner, player, projectiles } from "../mainLevelLogic";

export class Hud {
  // HP BAR AND ENERGY BARD
  hpBarContainer: HTMLElement = document.createElement("div");
  hpBar: HTMLElement = document.createElement("div");
  hpBarFillerContainer: HTMLElement = document.createElement("div");
  hpBarFiller: HTMLElement = document.createElement("div");
  energyBar: HTMLElement = document.createElement("div");
  energyBarFillerContainer: HTMLElement = document.createElement("div");
  energyBarFiller: HTMLElement = document.createElement("div");

  // EXP BAR
  playerExpBarContainer: HTMLElement = document.createElement("div");
  playerExpBar: HTMLElement = document.createElement("div");
  playerExpBarHeading: HTMLElement = document.createElement("div");
  playerExpBarFiller: HTMLElement = document.createElement("div");

  // SPELL BAR
  playerSpellBarContainer: HTMLElement = document.createElement("div");
  playerSpellBar: HTMLElement = document.createElement("div");
  playerSpell1: HTMLElement = document.createElement("div");
  playerSpell1Cooldown: HTMLElement = document.createElement("div");
  playerSpell1Image: HTMLImageElement = document.createElement("img");
  playerSpell1Keybind: HTMLElement = document.createElement("h3");
  playerSpell2: HTMLElement = document.createElement("div");
  playerSpell2Image: HTMLImageElement = document.createElement("img");
  playerSpell2Keybind: HTMLElement = document.createElement("h3");
  playerSpell2Cooldown: HTMLElement = document.createElement("div");
  playerSpell3: HTMLElement = document.createElement("div");
  playerSpell3Image: HTMLImageElement = document.createElement("img");
  playerSpell3Keybind: HTMLElement = document.createElement("h3");
  playerSpell3Cooldown: HTMLElement = document.createElement("div");

  // PLAYER DIED POPUP
  playerIsDeadContainer: HTMLElement = document.createElement("div");
  playerIsDeadMainDiv: HTMLElement = document.createElement("div");
  playerIsDeadHeadingContainer: HTMLElement = document.createElement("div");
  playerIsDeadSubheading: HTMLElement = document.createElement("h3");
  playerIsDeadHeading: HTMLElement = document.createElement("h1");
  playerIsDeadButtonContainer: HTMLElement = document.createElement("div");
  playerIsDeadButton1: HTMLElement = document.createElement("button");
  playerIsDeadButton2: HTMLElement = document.createElement("div");

  // MENU
  menuContainer: HTMLElement = document.createElement("div");
  menuMainDiv: HTMLElement = document.createElement("div");
  menuButton1: HTMLElement = document.createElement("button");
  menuButton2: HTMLElement = document.createElement("button2");
  menuNote: HTMLElement = document.createElement("h4");
  settingsMainDiv: HTMLElement = document.createElement("div");
  settingsBackButton: HTMLElement = document.createElement("button");
  inputBeingChanged: HTMLElement = document.createElement("div");

  constructor() {
    this.setHud();
  }

  setHud() {
    //hp bar
    document.body.appendChild(this.hpBarContainer);
    this.hpBarContainer.className = "player-hp-bar-container";
    this.hpBarContainer.appendChild(this.hpBar);
    this.hpBar.appendChild(this.hpBarFillerContainer);
    this.hpBarFillerContainer.appendChild(this.hpBarFiller);
    this.hpBar.className = "player-hp-bar";
    this.hpBarFillerContainer.className = "player-hp-bar-filler-container";
    this.hpBarFiller.className = "player-hp-bar-filler";

    // energy bar
    this.hpBarContainer.appendChild(this.energyBar);
    this.energyBar.appendChild(this.energyBarFillerContainer);
    this.energyBarFillerContainer.appendChild(this.energyBarFiller);
    this.energyBar.className = "player-energy-bar";
    this.energyBarFillerContainer.className = "player-energy-filler-container";
    this.energyBarFiller.className = "player-energy-filler";

    // spell bar
    document.body.appendChild(this.playerSpellBarContainer);
    this.playerSpellBarContainer.appendChild(this.playerSpellBar);
    this.playerSpellBarContainer.className = "player-spell-bar-container";
    this.playerSpellBar.className = "player-spell-bar";

    // exp bar
    document.body.appendChild(this.playerExpBarContainer);
    this.playerExpBarContainer.className = "player-exp-bar-container";
    this.playerExpBarContainer.appendChild(this.playerExpBarHeading);
    this.playerExpBarHeading.innerText = "Lvl 1";
    this.playerExpBarHeading.className = "sixtyfour-myapp";
    this.playerExpBarHeading.id = "player-exp-bar-heading";
    this.playerExpBarContainer.appendChild(this.playerExpBar);
    this.playerExpBar.className = "player-exp-bar";
    this.playerExpBar.appendChild(this.playerExpBarFiller);
    this.playerExpBarFiller.className = "player-exp-bar-filler";

    //spell 1
    this.playerSpellBar.appendChild(this.playerSpell1);
    this.playerSpell1Image.src = "../public/sprites/spells/spellShield.png";
    this.playerSpell1.appendChild(this.playerSpell1Image);
    this.playerSpell1.appendChild(this.playerSpell1Keybind);
    this.playerSpell1.appendChild(this.playerSpell1Cooldown);
    this.playerSpell1Image.className = "player-spell-img";
    this.playerSpell1Keybind.className = "sixtyfour-myapp";
    this.playerSpell1Keybind.id = "player-spell-keybind";
    this.playerSpell1Cooldown.className = "cooldown1";
    this.playerSpell1Keybind.textContent =
      player.playerSpells.spell1.value.slice(3);

    //spell 2
    this.playerSpellBar.appendChild(this.playerSpell2);
    this.playerSpell2Image.src = "../public/sprites/spells/spellWalls.png";
    this.playerSpell2.appendChild(this.playerSpell2Image);
    this.playerSpell2.appendChild(this.playerSpell2Keybind);
    this.playerSpell2.appendChild(this.playerSpell2Cooldown);
    this.playerSpell2Image.className = "player-spell-img";
    this.playerSpell2Keybind.className = "sixtyfour-myapp";
    this.playerSpell2Keybind.id = "player-spell-keybind";
    this.playerSpell2Cooldown.className = "cooldown1";
    this.playerSpell2Keybind.textContent =
      player.playerSpells.spell2.value.slice(3);

    //spell 3
    this.playerSpellBar.appendChild(this.playerSpell3);
    this.playerSpell3Image.src = "../public/sprites/spells/spellExplosion.png";
    this.playerSpell3.appendChild(this.playerSpell3Image);
    this.playerSpell3.appendChild(this.playerSpell3Keybind);
    this.playerSpell3.appendChild(this.playerSpell3Cooldown);
    this.playerSpell3Image.className = "player-spell-img";
    this.playerSpell3Keybind.className = "sixtyfour-myapp";
    this.playerSpell3Keybind.id = "player-spell-keybind";
    this.playerSpell3Cooldown.className = "cooldown1";
    this.playerSpell3Keybind.textContent =
      player.playerSpells.spell3.value.slice(3);

    this.playerSpell1.className = "player-spell";
    this.playerSpell2.className = "player-spell";
    this.playerSpell3.className = "player-spell";
  }

  renderGainedExp() {
    const expNeededForLvlUp = player.playerExpNeeded;
    const currentPlayerExp = player.playerExp;

    const increaseWidthBy = (currentPlayerExp / expNeededForLvlUp) * 100;
    this.playerExpBarFiller.style.width = `${increaseWidthBy}%`;
  }

  resetExpBarAfterLevelUp() {
    this.playerExpBarHeading.textContent = `Lvl ${player.playerLevel}`;
    this.playerExpBarFiller.style.width = "0%";
  }

  renderPlayerTakenDamageInHpBar(enemyDamage: number) {
    const damageTaken = (enemyDamage / player.playerMaxHP) * 100;
    player.playerHpBar.style.width = `${
      player.playerHpBarPercentage - damageTaken
    }%`;
    player.playerHpBarPercentage = player.playerHpBarPercentage - damageTaken;
  }

  createPlayerDiedPopup() {
    document.body.appendChild(this.playerIsDeadContainer);
    this.playerIsDeadContainer.className = "player-is-dead-container";
    this.playerIsDeadContainer.appendChild(this.playerIsDeadMainDiv);
    this.playerIsDeadMainDiv.className = "player-is-dead-main-div";
    this.playerIsDeadMainDiv.appendChild(this.playerIsDeadHeadingContainer);
    this.playerIsDeadHeadingContainer.className =
      "player-is-dead-heading-container";
    this.playerIsDeadHeadingContainer.appendChild(this.playerIsDeadHeading);
    this.playerIsDeadHeadingContainer.appendChild(this.playerIsDeadSubheading);
    this.playerIsDeadSubheading.className = "sixtyfour-myapp";
    this.playerIsDeadSubheading.id = "player-is-dead-subheading";
    this.playerIsDeadSubheading.textContent = "Your score: ";
    this.playerIsDeadHeading.id = "player-is-dead-heading";
    this.playerIsDeadHeading.className = "sixtyfour-myapp";
    this.playerIsDeadHeading.textContent = "You have died";
    this.playerIsDeadMainDiv.appendChild(this.playerIsDeadButtonContainer);
    this.playerIsDeadButtonContainer.appendChild(this.playerIsDeadButton1);
    this.playerIsDeadButtonContainer.appendChild(this.playerIsDeadButton2);
    this.playerIsDeadButtonContainer.className =
      "player-is-dead-button-container";
    this.playerIsDeadButton1.id = "player-is-dead-button";
    this.playerIsDeadButton1.className = "sixtyfour-myapp";
    this.playerIsDeadButton1.textContent = "Retry";
    this.playerIsDeadButton1.id = "player-is-dead-button";
    this.playerIsDeadButton2.id = "player-is-dead-button";
    this.playerIsDeadButton2.className = "sixtyfour-myapp";
    this.playerIsDeadButton2.textContent = "Exit";

    this.playerDiedScreenButtonActions();
    player.playerInput.removeEventListener();
    player.playerSpells.removeEventListener();
  }

  playerDiedScreenButtonActions() {
    this.playerIsDeadButton1.addEventListener("click", () => {
      this.resetHud();
      player.resetPlayer();
      enemySpawner.resetEnemies();
      projectiles.resetProjectile();
      player.playerInput.resetInput();
      player.playerSpells.resetSpells();
      this.playerIsDeadContainer.remove();
    });
  }

  resetHud() {
    this.hpBarFiller.style.width = "100%";
    document.querySelectorAll(".enemy-hp-bar-container").forEach((hpBar) => {
      hpBar.remove();
    });
    this.energyBarFiller.style.width = "100%";
    this.playerExpBarFiller.style.width = "0%";
    this.playerExpBarHeading.textContent = "Lvl 1";
  }
}
