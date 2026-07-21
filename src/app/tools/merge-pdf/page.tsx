import { ToolLayout } from "@/shared/ui";
import { MergePdf } from "@/features/pdf";

export default function MergePdfPage() {
  return (
    <ToolLayout
      title="Merge PDF"
      description="Merge multiple PDF files into one. Reorder and remove pages before merging. Everything happens in your browser."
      breadcrumbs={[{ label: "Documents" }, { label: "Merge PDF" }]}
      slug="merge-pdf"
    >
      <MergePdf />
    </ToolLayout>
  );
}
