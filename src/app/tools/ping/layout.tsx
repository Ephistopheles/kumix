import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ping",
  description:
    "Check the availability and response time of your servers. Enter a URL or IP address to ping.",
};

const PingLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PingLayout;
