import { Suspense } from "react";

const withSuspense = ({ fallback, children }: { fallback: React.ReactNode; children: React.ReactNode }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default withSuspense;
