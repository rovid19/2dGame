import { toLoadType } from "./TsTypes";

class Resources {
  toLoad: toLoadType;
  images: { [key: string]: any };

  constructor() {
    this.toLoad = {
      sky: "./public/sprites/sky.jpg",
      ground: "./public/sprites/ground.png",
      hero: "./public/sprites/hero-sheet.png",
      shadow: "./public/sprites/shadow.png",
    };
    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();

      img.src = this.toLoad[key];

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const levelResources = new Resources();
