import {
  generateMainMenu,
  redirectAfterSelectingInMenu,
  renderThreeScene,
  threeSetup,
} from "./MainMenu/MainMenuLogic.ts";
import { menuStore } from "./Stores/MenuStore";

renderThreeScene();
threeSetup();
generateMainMenu();
menuStore.subscribe("currentMenuNav", redirectAfterSelectingInMenu);
