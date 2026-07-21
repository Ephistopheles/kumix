import { ToolLayout } from "@/shared/ui";
import { PasswordStrength } from "@/features/security";

export default function PasswordStrengthPage() {
  return (
    <ToolLayout
      title="Password Strength"
      description="Check how strong your password is. Get entropy analysis and improvement suggestions."
      badge="new"
      breadcrumbs={[{ label: "Security" }, { label: "Password Strength" }]}
      slug="password-strength"
    >
      <PasswordStrength />
    </ToolLayout>
  );
}
