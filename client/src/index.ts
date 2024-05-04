import { MainMenu } from "./Game/MainMenu/MainMenu.ts";
import {
  generateMainMenu,
  generateMainMenuNav,
  redirectAfterSelectingInMenu,
  renderThreeScene,
  threeSetup,
} from "./Game/MainMenu/MainMenuLogic.ts";
import { menuStore } from "./Stores/MenuStore";

renderThreeScene();
threeSetup();
//generateMainMenu();
//generateMainMenuNav();

menuStore.subscribe("currentMenuNav", redirectAfterSelectingInMenu);
