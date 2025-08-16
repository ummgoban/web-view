import { Meta } from "@storybook/react";
import { lazy } from "react";
import { WithSuspense } from "./with-suspense";

const meta: Meta<typeof WithSuspense> = {
  title: "Utility/WithSuspense",
};

export default meta;

const LazyComponent = lazy(() => import("./lazy-component"));

export const Default = () => {
  return (
    <WithSuspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </WithSuspense>
  );
};

export const Fallback = () => {
  return (
    <WithSuspense fallback={<div className="font-subtitle1 text-black">Fallback Loading...</div>}>
      <LazyComponent />
    </WithSuspense>
  );
};
