import * as THREE from "three";
import { MainMenu } from "./MainMenu.ts";
import { Service } from "../../Services/MainService.ts";
import axios from "axios";
import { Keydown } from "../Level/LevelLogic/Other/Keydown.ts";
import { Leaderboards } from "./MenuScreens/Leaderboards.ts";
import { Settings } from "./MenuScreens/Settings.ts";

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

axios.defaults.baseURL = "http://localhost:3000";
export const mainMenu = new MainMenu(new Settings(), new Leaderboards());
export const keydown = new Keydown();
export const service = new Service();
