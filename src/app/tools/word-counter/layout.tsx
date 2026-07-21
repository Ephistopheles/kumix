import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter",
  description:
    "Count the number of words in your text. Paste your text and get an instant word count.",
};

const WordCounterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default WordCounterLayout;
