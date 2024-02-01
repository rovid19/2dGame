import {
  generateMainMenu,
  redirectAfterSelectingInMenu,
} from "./MainMenu/MainMenuLogic.ts";
import { menuStore } from "./Stores/MenuStore";

generateMainMenu();
menuStore.subscribe("currentMenuNav", redirectAfterSelectingInMenu);
