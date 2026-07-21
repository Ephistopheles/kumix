import { ToolLayout } from "@/shared/ui";
import { XmlFormatter } from "@/features/xml";

export default function XmlFormatterPage() {
  return (
    <ToolLayout
      title="XML Formatter"
      description="Format, validate and minify XML. Paste or upload your XML to beautify, minify or validate it."
      badge="new"
      breadcrumbs={[{ label: "Development" }, { label: "XML Formatter" }]}
      slug="xml-formatter"
    >
      <XmlFormatter />
    </ToolLayout>
  );
}
