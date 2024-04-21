export const backgroundGenerator = (): HTMLElement => {
  const canvas = document.createElement("canvas");

  canvas.className = "background-canvas";

  return canvas;
};

export const levelGenerator = (): HTMLElement => {
  const canvas = document.createElement("canvas");
  canvas.className = "level-canvas";

  return canvas;
};
