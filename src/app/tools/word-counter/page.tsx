import { ToolLayout } from "@/shared/ui";
import { WordCounter } from "@/features/text";

export default function WordCounterPage() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs and estimate reading time."
      badge="new"
      breadcrumbs={[{ label: "Text" }, { label: "Word Counter" }]}
      slug="word-counter"
    >
      <WordCounter />
    </ToolLayout>
  );
}
