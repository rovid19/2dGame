import { mainMenuGenerator } from "./MainMenu/MainMenuGenerator";
import {
  mainMenuNavigation,
  redirectAfterSelectingInMenu,
} from "./MainMenu/MainMenuLogic.ts";
import { menuStore } from "./Stores/MenuStore";

export const generateMainMenu = () => {
  const newEl = document.createElement("div");
  newEl.id = "main-container";

  document.body.appendChild(newEl).appendChild(mainMenuGenerator());

  setTimeout(() => {
    mainMenuNavigation();
  }, 0);
};
generateMainMenu();

menuStore.subscribe("currentMenuNav", redirectAfterSelectingInMenu);
