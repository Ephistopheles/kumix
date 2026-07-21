import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "Generate strong and secure passwords. Customize the length and character types to suit your needs.",
};

const PasswordGeneratorLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default PasswordGeneratorLayout;
