import { generateLevelSelectionScreen } from "../LevelSelection/LevelSelectionLogic.ts";
import { menuStore } from "../Stores/MenuStore";
import { mainMenuGenerator } from "./MainMenuGenerator.ts";

export const generateMainMenu = () => {
  const newEl = document.createElement("div");
  newEl.id = "main-container";

  document.body.appendChild(newEl).appendChild(mainMenuGenerator());

  setTimeout(() => {
    mainMenuNavigation();
  }, 0);
};

export const mainMenuNavigation = (): void => {
  const play = document.getElementById("play");
  const selectLevel = document.getElementById("select");
  console.log(play, selectLevel);
  play?.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "play");
  });

  selectLevel?.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "selectLevel");
  });
};

export const redirectAfterSelectingInMenu = (): void => {
  const currentSelection = menuStore.get("currentMenuNav") as string;
  console.log(currentSelection);
  if (currentSelection === "selectLevel") {
    document.getElementById("main-container")?.remove();
    generateLevelSelectionScreen();
  } else if (currentSelection === "mainMenu") {
    document.getElementById("level-container")?.remove();
    generateMainMenu();
  }
};
