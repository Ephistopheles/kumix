import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description:
    "Format, validate and minify JSON. Paste or upload your JSON to beautify, minify or validate it.",
};

const JsonFormatterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default JsonFormatterLayout;
