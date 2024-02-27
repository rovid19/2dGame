import { playOrMuteSoundtrack } from "../MainMenu/MainMenuLogic";
import { menuStore } from "../Stores/MenuStore";
import { levelSelectionUiGenerator } from "./LevelSelectionGenerator";

export const generateLevelSelectionScreen = (): void => {
  const newEl = document.createElement("div");
  newEl.id = "level-container";

  document.body.appendChild(newEl).appendChild(levelSelectionUiGenerator());

  console.log(menuStore.get("audioPlaying"));
  setTimeout(() => {
    levelSelectionMenuNavigation();
  }, 0);
};

const levelSelectionMenuNavigation = (): void => {
  const levelSelectMainDiv = document.querySelector(
    ".levelSelect"
  ) as HTMLElement;
  const backButton = document.querySelector(".buton") as HTMLElement;
  const audioBtn = document.querySelector(".audioBtnLevel") as HTMLElement;

  levelSelectMainDiv?.addEventListener("click", () => {});
  backButton.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "mainMenu");
    backButton.id = "backBtnOut";
    audioBtn.id = "audioBtnOut";

    setTimeout(() => {
      backButton.removeAttribute("id");
      audioBtn.removeAttribute("id");
    }, 200);
  });

  audioBtn.addEventListener("click", (): void => {
    playOrMuteSoundtrack();
  });
};
