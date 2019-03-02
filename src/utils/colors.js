/*
 * Takes a 3 or 6-digit hex color code, and an optional 0-255 numeric alpha value
 * https://stackoverflow.com/a/50282399/10979781
 */
export function hexToRGB(hex, alpha) {
  if (typeof hex !== "string" || hex[0] !== "#") return null; // or return 'transparent'

  const stringValues =
    hex.length === 4
      ? [hex.slice(1, 2), hex.slice(2, 3), hex.slice(3, 4)].map(n => `${n}${n}`)
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
  const intValues = stringValues.map(n => parseInt(n, 16));

  return typeof alpha === "number"
    ? `rgba(${intValues.join(", ")}, ${alpha})`
    : `rgb(${intValues.join(", ")})`;
}

const colors = [
  "#F44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
  "#3f51b5",
  "#2196F3",
  "#00bcd4",
  "#009688",
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
  "#4CAF50",
  "#ffeb3b",
  "#ffc107"
];

/**
 * Generates hash from substr 0 <= 6 letters of name param.
 * returns a color from the colors list based on that hash.
 */
export function getColorHash(name) {
  name = name.substr(0, 6);

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = 31 * hash + name.charCodeAt(i);
  }
  let index = Math.abs(hash % colors.length);
  return colors[index];
}
