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

// Calculate percentage on an absolute value
export function perc(x, percentage = 100, natural = false) {
  const ret = x * percentage / 100;
  return natural ? Math.round(ret) : ret;
}

export function floor(x, resolution = 1, digits = 2) {
  const tenPows = 10 ** digits;
  return Math.floor(Math.floor(x / resolution) * tenPows * resolution) / tenPows;
}

// This is not used yet but is an idea that can make things easier in the future
export class Poly {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  perc(rPerc = 100) {
    return this.r * rPerc / 100;
  }

  comX(rotDeg, rPerc = 100) {
    return computeX(this.cx, perc(rPerc), rotDeg)
  }

  comY(rotDeg, rPerc = 100) {
    return computeY(this.cy, perc(rPerc), rotDeg)
  }

  comXY(rotDeg, rPerc = 100) {
    return this.comX(this.cx, rPerc, rotDeg) + ' ' + this.comY(this.cx, rPerc, rotDeg);
  }

  svgCmd(cmdChar, rotDev, rPerc) {
    return cmdChar + ' ' + comXY(rotDeg, rPerc);
  }

}
