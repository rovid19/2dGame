import { muteAudio, playAudio } from "../IconsExports.ts";
import { levelSelectionUiGenerator } from "../LevelSelection/LevelSelectionGenerator.ts";
import { generateLevelSelectionScreen } from "../LevelSelection/LevelSelectionLogic.ts";
import { menuStore } from "../Stores/MenuStore";
import {
  mainMenuGenerator,
  mainMenuNavGenerator,
} from "./MainMenuGenerator.ts";
import * as THREE from "three";

export const generateMainMenu = () => {
  const newEl = document.createElement("div");
  newEl.id = "main-container";

  const newNavEl = document.createElement("div");
  newNavEl.id = "mainMenuNav-container";

  document.body.appendChild(newEl).appendChild(mainMenuGenerator());
  document.body.appendChild(newNavEl).appendChild(mainMenuNavGenerator());

  setTimeout(() => {
    mainMenuNavigation();
  }, 0);
};

export const mainMenuNavigation = (): void => {
  const play = document.getElementById("play");
  const selectLevel = document.getElementById("select");
  const audioButton = document.querySelector(".audioBtn") as HTMLElement;

  play?.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "play");
  });

  selectLevel?.addEventListener("click", (): void => {
    menuStore.set("currentMenuNav", "selectLevel");

    console.log(menuStore.get("currentMenuNav"));
  });

  audioButton.addEventListener("click", (): void => {
    playOrMuteSoundtrack();
  });
};

export const redirectAfterSelectingInMenu = (): void => {
  const currentSelection = menuStore.get("currentMenuNav") as string;
  const mainNavNav = document.getElementById("mainMenuNav") as HTMLElement;
  const levelSelectMainDiv = document.querySelector(
    ".levelSelect"
  ) as HTMLElement;
  console.log("ok");
  if (currentSelection === "selectLevel") {
    mainNavNav.className = "mainNavOut";
    setTimeout(() => {
      document.getElementById("mainMenuNav-container")?.remove();
      generateLevelSelectionScreen();
    }, 200);
  } else if (currentSelection === "mainMenu") {
    menuStore.set("menuAnimation", true);
    levelSelectMainDiv.id = "levelSelectionOut";
    generateMainMenu();
    setTimeout(() => {
      document.getElementById("level-container")?.remove();
    }, 200);
  }
};

const playOrMuteSoundtrack = () => {
  const audioPlaying = menuStore.get("audioPlaying") as boolean;
  const audioElement = document.querySelector(".audio") as HTMLAudioElement;
  const audioBtn = document.querySelector(".audioBtn") as HTMLElement;

  if (audioPlaying) {
    audioElement.pause();
    menuStore.set("audioPlaying", false);
    audioBtn.innerHTML = muteAudio;
  } else {
    audioElement.play();
    menuStore.set("audioPlaying", true);
    audioBtn.innerHTML = playAudio;
  }

  console.log(audioPlaying);
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
