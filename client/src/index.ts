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

menuStore.subscribe("currentMenuNav", redirectAfterSelectingInMenu);
