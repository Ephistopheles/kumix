import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Strength",
  description:
    "Check the strength of your passwords. Ensure your passwords are strong and secure.",
};

const PasswordStrengthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default PasswordStrengthLayout;
