export class animationLoop {
  update: any;
  render: any;

  isRunning: boolean;
  constructor(update: () => void, render: () => void) {
    this.update = update;
    this.render = render;

    this.isRunning = false;
  }

  mainLoop = (): void => {
    if (!this.isRunning) return;

    // render
    this.render();
    this.update();

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
