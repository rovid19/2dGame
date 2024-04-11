export class Hud {
  hpBarContainer: HTMLElement = document.createElement("div");
  hpBar: HTMLElement = document.createElement("div");
  hpBarFillerContainer: HTMLElement = document.createElement("div");
  hpBarFiller: HTMLElement = document.createElement("div");
  energyBar: HTMLElement = document.createElement("div");
  energyBarFillerContainer: HTMLElement = document.createElement("div");
  energyBarFiller: HTMLElement = document.createElement("div");
  playerReloadBarContainer: HTMLElement = document.createElement("div");
  playerReloadBar: HTMLElement = document.createElement("div");
  playerReloadBarFiller: HTMLElement = document.createElement("div");
  playerSpellBarContainer: HTMLElement = document.createElement("div");
  playerSpellBar: HTMLElement = document.createElement("div");
  playerSpell1: HTMLElement = document.createElement("div");
  playerSpell1Cooldown: HTMLElement = document.createElement("div");
  playerSpell1Image: HTMLImageElement = document.createElement("img");
  playerSpell1Keybind: HTMLElement = document.createElement("h3");
  playerSpell2: HTMLElement = document.createElement("div");
  playerSpell2Image: HTMLImageElement = document.createElement("img");
  playerSpell2Keybind: HTMLElement = document.createElement("h3");
  playerSpell3: HTMLElement = document.createElement("div");
  playerSpell3Image: HTMLImageElement = document.createElement("img");
  playerSpell3Keybind: HTMLElement = document.createElement("h3");

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

    // reload bar
    document.body.appendChild(this.playerReloadBarContainer);
    this.playerReloadBarContainer.className = "player-reload-bar-container";
    this.playerReloadBarContainer.appendChild(this.playerReloadBar);
    this.playerReloadBar.className = "player-reload-bar";
    this.playerReloadBar.appendChild(this.playerReloadBarFiller);
    this.playerReloadBarFiller.className = "player-reload-bar-filler";

    //spell 1
    this.playerSpellBar.appendChild(this.playerSpell1);
    this.playerSpell1Image.src = "../public//sprites/shield-1.png";
    this.playerSpell1.appendChild(this.playerSpell1Image);
    this.playerSpell1.appendChild(this.playerSpell1Keybind);
    this.playerSpell1.appendChild(this.playerSpell1Cooldown);
    this.playerSpell1Image.className = "player-spell-img";
    this.playerSpell1Keybind.className = "sixtyfour-myapp";
    this.playerSpell1Keybind.id = "player-spell-keybind";
    this.playerSpell1Cooldown.className = "cooldown1";
    this.playerSpell1Keybind.textContent = "O";

    //spell 2
    this.playerSpellBar.appendChild(this.playerSpell2);
    this.playerSpell2Image.src = "../public//sprites/fx-6.png";
    this.playerSpell2.appendChild(this.playerSpell2Image);
    this.playerSpell2.appendChild(this.playerSpell2Keybind);
    this.playerSpell2Image.className = "player-spell-img";
    this.playerSpell2Keybind.className = "sixtyfour-myapp";
    this.playerSpell2Keybind.id = "player-spell-keybind";
    this.playerSpell2Keybind.textContent = "O";

    //spell 3
    this.playerSpellBar.appendChild(this.playerSpell3);
    this.playerSpell3Image.src = "../public//sprites/explosion.png";
    this.playerSpell3.appendChild(this.playerSpell3Image);
    this.playerSpell3.appendChild(this.playerSpell3Keybind);
    this.playerSpell3Image.className = "player-spell-img";
    this.playerSpell3Keybind.className = "sixtyfour-myapp";
    this.playerSpell3Keybind.id = "player-spell-keybind";
    this.playerSpell3Keybind.textContent = "Š";

    this.playerSpell1.className = "player-spell";
    this.playerSpell2.className = "player-spell";
    this.playerSpell3.className = "player-spell";
  }
}
