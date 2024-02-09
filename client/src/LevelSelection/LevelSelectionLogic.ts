import { mainMenuNavGenerator } from "../MainMenu/MainMenuGenerator";
import { menuStore } from "../Stores/MenuStore";
import { levelSelectionUiGenerator } from "./LevelSelectionGenerator";

export const generateLevelSelectionScreen = (): void => {
  const newEl = document.createElement("div");
  newEl.id = "level-container";

  document.body.appendChild(newEl).appendChild(levelSelectionUiGenerator());

  setTimeout(() => {
    levelSelectionMenuNavigation();
  }, 0);
};

const levelSelectionMenuNavigation = (): void => {
  const levelSelectMainDiv = document.querySelector(
    ".levelSelect"
  ) as HTMLElement;
  const backButton = document.querySelector(".buton") as HTMLElement;

  levelSelectMainDiv?.addEventListener("click", () => {});
  backButton.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "mainMenu");
  });
};
