export const toRadians = deg => deg * Math.PI / 180;
export const toDegrees = rad => rad * 180 / Math.PI;

export const hour2deg = hour => hour * 30;

export const minute2deg = min => min * 6;

export const second2deg = minute2deg;

export const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`;

export const gray = grayLevel => rgb(grayLevel, grayLevel, grayLevel);

export function computeX(cx, r, rotation) {
  return cx + Math.sin(toRadians(rotation)) * r;
}

export function computeY(cy, r, rotation) {
  return cy - Math.cos(toRadians(rotation)) * r;
}

export function computeXY(cx, cy, r, rotation) {
  return {
    x: computeX(cx, r, rotation),
    y: computeY(cy, r, rotation)
  };
}

export function svgCmd(cx, cy, cmd, r, rotation) {
  return `${cmd} ${computeX(cx, r, rotation)} ${computeY(cy, r, rotation)}`
}

export function svgCmds(cx, cy, ...cmd_r_rotation) {
  const ret = [];
  for (let i = 0; i + 2 < cmd_r_rotation.length; i += 3) {
    const cmd = cmd_r_rotation[i];
    const r = cmd_r_rotation[i + 1];
    const rotation = cmd_r_rotation[i + 2];
    ret.push(svgCmd(cx, cy, cmd, r, rotation));
  }
  return ret.join(', ');
}

// Calculate percentage on an absolute value
export function perc(x, percentage = 100, natural = false) {
  const ret = x * percentage / 100;
  return natural ? Math.round(ret) : ret;
}

export function floor(x, resolution = 1, digits = 2) {
  const tenPows = 10 ** digits;
  return Math.floor(Math.floor(x / resolution) * tenPows * resolution) / tenPows;
}