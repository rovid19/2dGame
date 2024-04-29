import { MainMenu } from "./MainMenu/MainMenu.ts";
import {
  generateMainMenu,
  generateMainMenuNav,
  redirectAfterSelectingInMenu,
  renderThreeScene,
  threeSetup,
} from "./MainMenu/MainMenuLogic.ts";
import { menuStore } from "./Stores/MenuStore";

renderThreeScene();
threeSetup();
//generateMainMenu();
//generateMainMenuNav();
const mainMenu = new MainMenu();
menuStore.subscribe("currentMenuNav", redirectAfterSelectingInMenu);
