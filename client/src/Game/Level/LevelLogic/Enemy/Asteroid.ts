import { returnArrayOfHitboxNumbers } from "../../../../Utils/OftenUsed";
import { ImageType, SpriteMethods, Vector } from "../../../../Utils/TsTypes";
import { height } from "../Other/canvasLogic";
import { Sprite } from "../Sprite/Sprite";
import { levelImages, player, shipPosition } from "../mainLevelLogic";

export class Asteroid {
  asteroidSprite: SpriteMethods;
  asteroidDamage: number = 30;
  asteroidSpeed: number = 5;
  asteroidOffScreen: boolean = false;
  asteroidHitTarget: boolean = false;
  asteroidHitboxArrayX: number[] = [];
  asteroidHitboxArrayY: number[] = [];

  constructor(
    asteroidImage: HTMLImageElement,
    asteroidFrameSize: Vector,
    scale: number,
    position: Vector
  ) {
    this.asteroidSprite = new Sprite(
      asteroidImage,
      asteroidFrameSize,
      scale,
      position
    );
  }

  renderAsteroidFromTopToBottom() {
    if (
      player.isPlayerAlive &&
      !this.asteroidOffScreen &&
      !this.asteroidHitTarget
    ) {
      if (!this.asteroidOffScreen) {
        this.checkIfMeteorHitPlayer();
        this.asteroidSprite.position.y += this.asteroidSpeed;

        if (this.asteroidSprite.position.y >= height) {
          this.asteroidOffScreen = true;
        }
      }
    }
  }

  setAsteroidHitboxArray() {
    this.asteroidHitboxArrayX = [];
    this.asteroidHitboxArrayY = [];
    returnArrayOfHitboxNumbers(
      Math.floor(this.asteroidSprite.position.x),
      this.asteroidSprite.frameSize.x,
      this.asteroidHitboxArrayX,
      Math.floor(this.asteroidSprite.position.x + 1)
    );

    returnArrayOfHitboxNumbers(
      Math.floor(this.asteroidSprite.position.y),
      this.asteroidSprite.frameSize.y,
      this.asteroidHitboxArrayY,
      Math.floor(this.asteroidSprite.position.y + 1)
    );
  }

  checkIfMeteorHitPlayer() {
    this.setAsteroidHitboxArray();

    if (this.asteroidHitboxArrayY.includes(Math.floor(shipPosition.y))) {
      if (this.asteroidHitboxArrayX.includes(Math.floor(shipPosition.x))) {
        player.takeDamage(this.asteroidDamage);
        this.asteroidHitTarget = true;
      }
    }
  }

  selectRandomAsteroidImage(): ImageType {
    const randomNumber = Math.floor(Math.random() * 4);

    const image = levelImages.images;
    const meteorArray = [
      image.meteor1,
      image.meteor2,
      image.meteor3,
      image.meteor4,
    ];

    return meteorArray[randomNumber];
  }

  increaseAsteroidStats() {
    const increaseDamageBy = Math.floor(this.asteroidDamage * 0.1) - 1;
    const increaseSpeedBy = Math.floor(this.asteroidSpeed * 0.1) + 1;

    this.asteroidDamage += increaseDamageBy;
    this.asteroidSpeed += increaseSpeedBy;
  }
}
