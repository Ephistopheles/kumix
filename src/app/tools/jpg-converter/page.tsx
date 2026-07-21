import { ToolLayout } from "@/shared/ui";
import { JpgConverter } from "@/features/image";

export default function JpgConverterPage() {
  return (
    <ToolLayout
      title="JPG Converter"
      description="Convert images to JPG format with adjustable quality. Supports PNG, WEBP, AVIF, BMP and TIFF."
      badge="new"
      breadcrumbs={[{ label: "Images" }, { label: "JPG Converter" }]}
      slug="jpg-converter"
    >
      <JpgConverter />
    </ToolLayout>
  );
}
