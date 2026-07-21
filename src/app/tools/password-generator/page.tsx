import { ToolLayout } from "@/shared/ui";
import { PasswordGenerator } from "@/features/security";

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords with customizable options. Everything happens in your browser."
      breadcrumbs={[{ label: "Security" }, { label: "Password Generator" }]}
      slug="password-generator"
    >
      <PasswordGenerator />
    </ToolLayout>
  );
}
