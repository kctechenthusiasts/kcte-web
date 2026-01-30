import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("PUBLIC_CONVEX_URL environment variable is not set");
}

const convex = new ConvexReactClient(convexUrl);

interface Props {
  children: ReactNode;
}

export function ConvexClientProvider({ children }: Props) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
