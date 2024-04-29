export class Sounds {
  projectileSound: HTMLAudioElement = new Audio(
    "../../../public/sounds/laserSound.wav"
  );
  powerUpOpen: HTMLAudioElement = new Audio(
    "../../../public/sounds/powerUpOpen.wav"
  );
  powerUpSelected: HTMLAudioElement = new Audio(
    "../../../public/sounds/powerUpSelected.wav"
  );
  explosionSound: HTMLAudioElement = new Audio(
    "../../../public/sounds/explosionSpell.wav"
  );
  shieldSound: HTMLAudioElement = new Audio(
    "../../../public/sounds/shieldActivated.wav"
  );
  windSound: HTMLAudioElement = new Audio(
    "../../../public/sounds/windSound.wav"
  );
  gameOver: HTMLAudioElement = new Audio("../../../public/sounds/gameOver.wav");

  constructor() {
    this.setAudio();
  }

  setAudio() {
    document.body.appendChild(this.projectileSound);
    document.body.appendChild(this.powerUpOpen);
    document.body.appendChild(this.powerUpSelected);
    document.body.appendChild(this.gameOver);
    document.body.appendChild(this.shieldSound);
    document.body.appendChild(this.explosionSound);
    document.body.appendChild(this.windSound);

    this.projectileSound.playbackRate = 10;
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
}
