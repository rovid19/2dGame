export class GameLoop {
  update: any;
  drawLevel: any;
  lastTimeFrame: number;
  accumulatedTime: number;
  timeStep: number;
  rafId: any;
  isRunning: boolean;
  constructor(update: () => void, drawLevel: () => void) {
    this.update = update;
    this.drawLevel = drawLevel;

    this.lastTimeFrame = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; // frames per second - 60

    this.rafId = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp: number): void => {
    if (!this.isRunning) return;

    let deltaTime = timestamp - this.lastTimeFrame;
    this.lastTimeFrame = timestamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep);
      this.accumulatedTime -= this.timeStep;
    }

    // render
    this.drawLevel();

    this.rafId = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.mainLoop);
    }
  }
}
