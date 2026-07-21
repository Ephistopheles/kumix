import { ToolLayout } from "@/shared/ui";
import { PingTool } from "@/features/web";

export default function PingPage() {
  return (
    <ToolLayout
      title="Ping"
      description="Check website reachability and measure response time from your browser."
      badge="new"
      breadcrumbs={[{ label: "Web" }, { label: "Ping" }]}
      slug="ping"
    >
      <PingTool />
    </ToolLayout>
  );
}
