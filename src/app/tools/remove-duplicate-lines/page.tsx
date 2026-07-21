import { ToolLayout } from "@/shared/ui";
import { RemoveDuplicateLines } from "@/features/text";

export default function RemoveDuplicateLinesPage() {
  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove duplicated lines from text. Optionally ignore case or preserve empty lines."
      breadcrumbs={[{ label: "Text" }, { label: "Remove Duplicate Lines" }]}
      slug="remove-duplicate-lines"
    >
      <RemoveDuplicateLines />
    </ToolLayout>
  );
}
