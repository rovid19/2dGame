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
  gameOver: HTMLAudioElement = new Audio("../../../public/sounds/gameOver.wav");

  constructor() {
    this.setAudio();
  }

  setAudio() {
    document.body.appendChild(this.projectileSound);
    document.body.appendChild(this.powerUpOpen);
    document.body.appendChild(this.powerUpSelected);
    document.body.appendChild(this.gameOver);

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
}
