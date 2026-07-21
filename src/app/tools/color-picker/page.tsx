import { ToolLayout } from "@/shared/ui";
import { ColorPicker } from "@/features/color";

export default function ColorPickerPage() {
  return (
    <ToolLayout
      title="Color Picker"
      description="Pick, convert and explore colors. View HEX, RGB, HSL and HSV values. Generate harmonious palettes."
      breadcrumbs={[{ label: "Web" }, { label: "Color Picker" }]}
      slug="color-picker"
    >
      <ColorPicker />
    </ToolLayout>
  );
}
