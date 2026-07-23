import { ToolLayout } from "@/shared/ui";
import { YamlFormatter } from "@/features/yaml";

export default function YamlFormatterPage() {
  return (
    <ToolLayout
      title="YAML Formatter"
      description="Format, validate and minify YAML. Paste or upload your YAML to beautify, minify or validate it."
      badge="new"
      breadcrumbs={[{ label: "Development" }, { label: "YAML Formatter" }]}
      slug="yaml-formatter"
    >
      <YamlFormatter />
    </ToolLayout>
  );
}
