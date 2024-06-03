import { menuStore } from "../../../../Stores/MenuStore";
import {
  downIcon,
  leftIcon,
  rightIcon,
  upIcon,
} from "../../../../Utils/IconsExports";
import { player } from "../mainLevelLogic";
import { DOWN, LEFT, RIGHT, UP } from "./PlayerInput";

export class Joystick {
  joystickContanier: HTMLElement = document.createElement("div");
  up: HTMLElement = document.createElement("div");
  left: HTMLElement = document.createElement("div");
  down: HTMLElement = document.createElement("div");
  right: HTMLElement = document.createElement("div");
  eventListener: (() => void)[] = [];

  constructor() {
    this.createJoystick();
  }

  createJoystick() {
    const isMobile = menuStore.get("mobile");

    if (isMobile) {
      document.body.appendChild(this.joystickContanier);
      this.joystickContanier.className = "joystick-container";

      for (let i = 0; i < 9; i++) {
        const joystickBlock = document.createElement("div");

        this.joystickContanier.appendChild(joystickBlock);

        if (i === 1) {
          joystickBlock.className = "joystick-block";
          joystickBlock.innerHTML = upIcon;
          this.up = joystickBlock;
        }
        if (i === 3) {
          joystickBlock.className = "joystick-block";
          joystickBlock.innerHTML = leftIcon;
          this.left = joystickBlock;
        }
        if (i === 5) {
          joystickBlock.className = "joystick-block";
          joystickBlock.innerHTML = rightIcon;
          this.right = joystickBlock;
        }
        if (i === 7) {
          joystickBlock.className = "joystick-block";
          joystickBlock.innerHTML = downIcon;
          this.down = joystickBlock;
        }
      }
    }

    this.joystickEventListener();
  }

  joystickEventListener() {
    console.log(this.up, this.left, this.down, this.right);
    const moveUp = () => {
      player.playerInput.direction = UP;
      player.playerInput.playerMovement();
    };
    const moveLeft = () => {
      player.playerInput.direction = LEFT;
      player.playerInput.playerMovement();
    };
    const moveDown = () => {
      player.playerInput.direction = DOWN;
      player.playerInput.playerMovement();
    };
    const moveRight = () => {
      player.playerInput.direction = RIGHT;
      player.playerInput.playerMovement();
    };

    this.eventListener.push(moveUp);
    this.eventListener.push(moveLeft);
    this.eventListener.push(moveDown);
    this.eventListener.push(moveRight);

    this.up.addEventListener("click", this.eventListener[0]);
    this.left.addEventListener("click", this.eventListener[1]);
    this.down.addEventListener("click", this.eventListener[2]);
    this.right.addEventListener("click", this.eventListener[3]);
  }

  removeJoystick() {
    document.querySelector(".joystick-container")?.remove();
    this.up.removeEventListener("click", this.eventListener[0]);
    this.left.removeEventListener("click", this.eventListener[1]);
    this.down.removeEventListener("click", this.eventListener[2]);
    this.right.removeEventListener("click", this.eventListener[3]);
  }
}
