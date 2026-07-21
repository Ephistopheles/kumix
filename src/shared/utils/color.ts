export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type HSV = { h: number; s: number; v: number };

export function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace("#", "");
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rn = 0,
    gn = 0,
    bn = 0;
  if (h < 60) {
    rn = c;
    gn = x;
  } else if (h < 120) {
    rn = x;
    gn = c;
  } else if (h < 180) {
    gn = c;
    bn = x;
  } else if (h < 240) {
    gn = x;
    bn = c;
  } else if (h < 300) {
    rn = x;
    bn = c;
  } else {
    rn = c;
    bn = x;
  }
  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

export function rgbToHsv({ r, g, b }: RGB): HSV {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const v = Math.round(max * 100);
  const s = max === 0 ? 0 : Math.round((d / max) * 100);
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
    h = Math.round(h * 360);
  }
  return { h, s, v };
}

export function generatePalette(
  hex: string,
): { name: string; colors: string[] }[] {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);

  const shift = (hue: number) => ((hue % 360) + 360) % 360;

  const hslToHex = (h: number, s: number, l: number) =>
    rgbToHex(hslToRgb({ h: shift(h), s, l }));

  return [
    {
      name: "Complementary",
      colors: [hex, hslToHex(hsl.h + 180, hsl.s, hsl.l)],
    },
    {
      name: "Analogous",
      colors: [
        hslToHex(hsl.h - 30, hsl.s, hsl.l),
        hex,
        hslToHex(hsl.h + 30, hsl.s, hsl.l),
      ],
    },
    {
      name: "Triadic",
      colors: [
        hex,
        hslToHex(hsl.h + 120, hsl.s, hsl.l),
        hslToHex(hsl.h + 240, hsl.s, hsl.l),
      ],
    },
    {
      name: "Split Complementary",
      colors: [
        hex,
        hslToHex(hsl.h + 150, hsl.s, hsl.l),
        hslToHex(hsl.h + 210, hsl.s, hsl.l),
      ],
    },
  ];
}
