import { isOutside } from "../Utils/TsTypes";

type InitialState = {
  [key: string]: any;
  isOutside: {
    isOutside: boolean;
    position: string;
    onWhichSide: string;
  };
  isCanvasReady: boolean;
};
type Listener = (key: any, value: any) => void;

const initialState = {
  isOutside: {
    isOutside: false,
    position: "",
    onWhichSide: "",
  },
  isCanvasReady: false,
};
class levelsStore {
  state: InitialState;
  listeners: { [key: string]: Listener[] };

  constructor(newStore: InitialState = initialState) {
    this.state = { ...newStore };
    this.listeners = {};
  }

  get(
    key: string
  ): string | undefined | number | boolean | boolean[] | isOutside {
    return this.state[key];
  }

  set(
    key: string,
    value: string | number | boolean | CanvasRenderingContext2D | isOutside
  ): void {
    if (this.state[key] !== value) {
      this.state[key] = value;
      this.notify(key, value);
    }
  }
  push(key: string, value: string | number | boolean) {
    this.state[key].push(value);
  }

  notify(
    key: string,
    value: string | number | boolean | CanvasRenderingContext2D | isOutside
  ): void {
    if (this.listeners[key]) {
      this.listeners[key].forEach((listener) => listener(key, value));
    }
  }

  subscribe(key: string, func: Listener) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }

    this.listeners[key].push(func);
  }
}

export const levelStore = new levelsStore();
