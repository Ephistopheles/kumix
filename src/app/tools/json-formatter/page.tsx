import { ToolLayout } from "@/shared/ui";
import { JsonFormatter } from "@/features/json";

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate and minify JSON. Paste or upload your JSON to beautify, minify or validate it."
      breadcrumbs={[{ label: "Development" }, { label: "JSON Formatter" }]}
      slug="json-formatter"
    >
      <JsonFormatter />
    </ToolLayout>
  );
}
