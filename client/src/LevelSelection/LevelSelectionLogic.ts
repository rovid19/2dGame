import { menuStore } from "../Stores/MenuStore";
import { levelSelectionGenerator } from "./LevelSelectionGenerator";

export const generateLevelSelectionScreen = (): void => {
  const newEl = document.createElement("div");
  newEl.id = "level-container";

  document.body.appendChild(newEl).appendChild(levelSelectionGenerator());

  setTimeout(() => {
    levelSelectionMenuNavigation();
  }, 0);
};

const levelSelectionMenuNavigation = (): void => {
  const levelSelectMainDiv = document.querySelector(".levelSelect");
  const backButton = document.querySelector(".buton") as HTMLElement;

  levelSelectMainDiv?.addEventListener("click", () => {});
  backButton.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "mainMenu");
  });
};
