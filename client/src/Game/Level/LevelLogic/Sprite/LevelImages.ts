import { levelAssetsPath, toLoadType } from "../../../../Utils/TsTypes";

export class LevelImages {
  toLoad: toLoadType;
  images: { [key: string]: any };

  constructor(path: levelAssetsPath) {
    this.toLoad = path;
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

        /*const loadedImages = levelStore.get("loadedImages") as boolean[];
        const levelImages = Object.keys(path);
        levelStore.push("loadedImages", true);

        if (loadedImages.length === levelImages.length) {
          drawLevel();
        }*/
      };
    });
  }
}
