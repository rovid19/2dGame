export class Sounds {
  projectileSound: HTMLAudioElement = new Audio("sounds/laserSound.wav");
  powerUpOpen: HTMLAudioElement = new Audio("sounds/powerUpOpen.wav");
  powerUpSelected: HTMLAudioElement = new Audio("sounds/powerUpSelected.wav");
  explosionSound: HTMLAudioElement = new Audio("sounds/explosionSpell.wav");
  shieldSound: HTMLAudioElement = new Audio("sounds/shieldActivated.wav");
  windSound: HTMLAudioElement = new Audio("sounds/windSound.wav");
  gameOver: HTMLAudioElement = new Audio("sounds/gameOver.wav");

  soundsVolume: number = 30;

  constructor() {
    this.setAudio();
    this.changeSoundEffectsVolume(0.25);
  }

  setAudio() {
    document.body.appendChild(this.projectileSound);
    document.body.appendChild(this.powerUpOpen);
    document.body.appendChild(this.powerUpSelected);
    document.body.appendChild(this.gameOver);
    document.body.appendChild(this.shieldSound);
    document.body.appendChild(this.explosionSound);
    document.body.appendChild(this.windSound);

    this.projectileSound.playbackRate = 6;
  }

  playLaser() {
    this.projectileSound.play();
  }

  playPowerUpOpen() {
    this.powerUpOpen.play();
  }

  playPowerUpSelected() {
    this.powerUpSelected.play();
  }

  playGameOver() {
    this.gameOver.play();
  }

  playExplosion() {
    this.explosionSound.play();
  }

  playShield() {
    this.shieldSound.play();
  }

  playWind() {
    this.windSound.play();
  }

  changeSoundEffectsVolume(volume: number) {
    this.projectileSound.volume = volume;
    this.powerUpOpen.volume = volume;
    this.powerUpSelected.volume = volume;
    this.gameOver.volume = volume;
    this.explosionSound.volume = volume;
    this.shieldSound.volume = volume;
    this.windSound.volume = volume;

    this.soundsVolume = volume * 100;
  }
}
