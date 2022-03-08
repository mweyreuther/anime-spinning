function toRGB([h, s, l]) {
  h = h % 360;
  s = s / 100;
  l = l / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const index = Math.floor(h / 60);
  const range = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];
  return range[index].map((v) => Math.round((v + m) * 255));

  // source: https://css-tricks.com/converting-color-spaces-in-javascript/
}
export { toRGB };
