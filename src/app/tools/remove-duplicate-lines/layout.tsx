import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines",
  description:
    "Remove duplicate lines from your text. Paste or upload your text to remove duplicates and keep only unique lines.",
};

const RemoveDuplicateLinesLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export default RemoveDuplicateLinesLayout;
