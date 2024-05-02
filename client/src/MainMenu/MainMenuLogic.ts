import { muteAudio, playAudio } from "../Utils/IconsExports.ts";
import { generateLevelSelectionScreen } from "./LevelSelection/LevelSelectionLogic.ts";
import { generateLevel, setHud } from "../Level/LevelLogic/mainLevelLogic.ts";
import { menuStore } from "../Stores/MenuStore";
import {
  mainMenuGenerator,
  mainMenuNavGenerator,
} from "./MainMenuGenerator.ts";
import * as THREE from "three";
import { MainMenu } from "./MainMenu.ts";
import { Settings } from "./Settings.ts";
import { Leaderboards } from "./Leaderboards.ts";

export const generateMainMenu = () => {
  const menuAni = menuStore.get("menuAnimation");
  const newEl = document.createElement("div");
  newEl.id = "main-container";

  //const newNavEl = document.createElement("div");
  //newNavEl.id = "mainMenuNav-container";

  if (!menuAni)
    document.body.appendChild(newEl).appendChild(mainMenuGenerator());
  //document.body.appendChild(newNavEl).appendChild(mainMenuNavGenerator());

  setTimeout(() => {
    mainMenuNavigation();
  }, 0);
};

export const generateMainMenuNav = () => {
  const newNavEl = document.createElement("div");
  newNavEl.id = "mainMenuNav-container";

  document.body.appendChild(newNavEl).appendChild(mainMenuNavGenerator());

  setTimeout(() => {
    mainMenuNavigation();
  }, 0);
};

export const mainMenuNavigation = (): void => {
  const play = document.getElementById("play");
  const selectLevel = document.getElementById("select");
  const audioButton = document.querySelector(".audioBtn") as HTMLElement;

  //generateLevel();

  play?.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "play");
    playAnimation();
    setTimeout(() => {
      generateLevel();
      setHud();
    }, 800);
  });

  selectLevel?.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "selectLevel");
  });

  audioButton.addEventListener("click", (): void => {
    playOrMuteSoundtrack();
  });
};

const playAnimation = () => {
  const mainNavContainer = document.getElementById(
    "mainMenuNav-container"
  ) as HTMLElement;
  const newDiv = document.createElement("div");
  newDiv.id = "playAnimation";

  const levelLoaderDiv = document.createElement("div");
  levelLoaderDiv.id = "levelLoaderDiv";

  mainNavContainer.appendChild(newDiv);

  setTimeout(() => {
    document.getElementById("main-container")?.remove();
    document.getElementById("mainMenuNav-container")?.remove();
    //document.querySelector(".three-container")?.remove();
    document.body.appendChild(levelLoaderDiv);
  }, 800);

  setTimeout(() => {
    levelLoaderDiv.remove();
  }, 1600);
};

export const redirectAfterSelectingInMenu = (): void => {
  const currentSelection = menuStore.get("currentMenuNav") as string;
  const mainNavNav = document.getElementById("mainMenuNav") as HTMLElement;
  const levelSelectMainDiv = document.querySelector(
    ".levelSelect"
  ) as HTMLElement;

  if (currentSelection === "selectLevel") {
    mainNavNav.className = "mainNavOut";
    setTimeout(() => {
      document.getElementById("mainMenuNav-container")?.remove();
      generateLevelSelectionScreen();
    }, 200);
  } else if (currentSelection === "mainMenu") {
    generateMainMenu();
    generateMainMenuNav();
    menuStore.set("menuAnimation", true);
    levelSelectMainDiv.id = "levelSelectionOut";

    setTimeout(() => {
      document.getElementById("level-container")?.remove();
    }, 200);
  }
};

export const playOrMuteSoundtrack = () => {
  const userNav = menuStore.get("currentMenuNav");

  const audioPlaying = menuStore.get("audioPlaying") as boolean;
  audioPlaying;
  const audioElement = document.querySelector(".audio") as HTMLAudioElement;
  const audioBtn =
    userNav === "mainMenu"
      ? (document.querySelector(".audioBtn") as HTMLElement)
      : (document.querySelector(".audioBtnLevel") as HTMLElement);

  if (audioPlaying) {
    audioElement.pause();
    menuStore.set("audioPlaying", false);
    audioBtn.innerHTML = muteAudio;
  } else {
    audioElement.play();
    menuStore.set("audioPlaying", true);
    audioBtn.innerHTML = playAudio;
  }
};

// THREE JS PARTICLE SYSTEM FOR MAIN MENU ˘˘¸

export const renderThreeScene = () => {
  const div = document.createElement("div");
  div.className = "three-container";
  document.body.appendChild(div);
};

export const threeSetup = (): void => {
  let scene: any,
    camera: any,
    renderer: any,
    starGeo: any,
    star: any,
    stars: any;
  let threeDiv = document.querySelector(".three-container") as HTMLElement;

  const vertices: any[] = [];
  const velocities: any[] = [];
  const accelerations: any[] = [];

  const Init = (): void => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    threeDiv.appendChild(renderer.domElement);

    starGeo = new THREE.BufferGeometry();

    for (let i = 0; i < 6000; i++) {
      star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      vertices.push(star.x, star.y, star.z);

      velocities[i] = 0;
      accelerations[i] = 0.02;
    }

    starGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices), 3)
    );

    let starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    animate();
  };

  function animate(): void {
    requestAnimationFrame(animate);

    const positions = starGeo.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      let index = i / 3;

      // Update the velocity
      velocities[index] += accelerations[index];

      // Update the position
      positions[i] += velocities[index]; // x
      positions[i + 1] += velocities[index]; // y
      positions[i + 2] += velocities[index]; // z

      // Check if the star has moved out of the viewable area
      // and reset its position if needed
      if (
        positions[i] < -300 ||
        positions[i] > 300 ||
        positions[i + 1] < -300 ||
        positions[i + 1] > 300 ||
        positions[i + 2] < -300 ||
        positions[i + 2] > 300
      ) {
        positions[i] = Math.random() * 600 - 300;
        positions[i + 1] = Math.random() * 600 - 300;
        positions[i + 2] = Math.random() * 600 - 300;

        // Optionally, reset velocity and acceleration
        velocities[index] = 0;
        accelerations[index] = 0.02; // Or any other value
      }
    }

    starGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  Init();
};

export const mainMenu = new MainMenu(new Settings(), new Leaderboards());
