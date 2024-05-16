export class animationLoop {
  lastFrameTime: number = 0;
  accumulatedTime: number = 0;
  timeStep: number = 1000 / 60; // 60 fps
  update: any;
  render: any;

  isRunning: boolean;
  constructor(update: () => void, render: () => void) {
    this.update = update;
    this.render = render;

    this.isRunning = false;
  }

  mainLoop = (timestamp: number): void => {
    if (!this.isRunning) return;

    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    this.accumulatedTime += deltaTime;

    while (this.accumulatedTime > this.timeStep) {
      this.render();
      this.update();
      this.accumulatedTime -= this.timeStep;
    }

    // render

    requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    this.isRunning = false;
  }
}
