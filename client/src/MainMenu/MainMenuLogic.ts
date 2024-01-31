import { generateLevelSelectionScreen } from "../LevelSelection/LevelSelectionLogic.ts";
import { menuStore } from "../Stores/MenuStore";
import { generateMainMenu } from "../index.ts";

export const mainMenuNavigation = (): void => {
  const play = document.querySelector(".play");
  const selectLevel = document.querySelector(".select");
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
  if (currentSelection === "selectLevel") {
    console.log("da");
    document.getElementById("main-container")?.remove();
    generateLevelSelectionScreen();
  } /*else if (currentSelection === "play") {
    document.getElementById("level-container")?.remove();
    generateMainMenu();
  }*/
};
