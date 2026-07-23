import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAML Formatter",
  description:
    "Format your YAML files. Paste your YAML code and get a well-formatted version.",
};

const YamlFormatterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default YamlFormatterLayout;
