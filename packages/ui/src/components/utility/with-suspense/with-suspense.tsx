import { Suspense } from "react";

export const WithSuspense = ({ fallback, children }: { fallback: React.ReactNode; children: React.ReactNode }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
