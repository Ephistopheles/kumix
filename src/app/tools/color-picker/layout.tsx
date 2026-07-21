import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker",
  description:
    "Pick, convert and explore colors. View HEX, RGB, HSL and HSV values. Generate harmonious palettes.",
};

const ColorPickerLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ColorPickerLayout;
