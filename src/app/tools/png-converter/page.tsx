import { ToolLayout } from "@/shared/ui";
import { PngConverter } from "@/features/image";

export default function PngConverterPage() {
  return (
    <ToolLayout
      title="PNG Converter"
      description="Convert images to PNG format. Supports JPG, JPEG, WEBP and AVIF. Everything happens in your browser."
      breadcrumbs={[{ label: "Images" }, { label: "PNG Converter" }]}
      slug="png-converter"
    >
      <PngConverter />
    </ToolLayout>
  );
}
