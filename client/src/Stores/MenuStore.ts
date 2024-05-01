type InitialState = {
  [key: string]: any;
  currentMenuNav: string;
  audioPlaying: boolean;
  menuAnimation: boolean;
  soundtrack: HTMLAudioElement;
};
type Listener = (key: any, value: any) => void;

const initialState = {
  currentMenuNav: "mainMenu",
  audioPlaying: false,
  menuAnimation: false,
  soundtrack: new Audio(),
};
class MenuStore {
  state: InitialState;
  listeners: { [key: string]: Listener[] };

  constructor(newStore: InitialState = initialState) {
    this.state = { ...newStore };
    this.listeners = {};
  }

  get(key: string): string | undefined | number | boolean | HTMLAudioElement {
    return this.state[key];
  }

  set(key: string, value: string | number | boolean | HTMLAudioElement): void {
    if (this.state[key] !== value) {
      this.state[key] = value;
      this.notify(key, value);
    }
  }

  notify(
    key: string,
    value: string | number | boolean | HTMLAudioElement
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

export const menuStore = new MenuStore();
