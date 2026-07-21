import { ToolLayout } from "@/shared/ui";
import { SplitPdf } from "@/features/pdf";

export default function SplitPdfPage() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Split a PDF into multiple files by page ranges. Select which pages to extract."
      badge="new"
      breadcrumbs={[{ label: "Documents" }, { label: "Split PDF" }]}
      slug="split-pdf"
    >
      <SplitPdf />
    </ToolLayout>
  );
}
