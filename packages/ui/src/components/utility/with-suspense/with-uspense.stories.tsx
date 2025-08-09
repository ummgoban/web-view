import { Meta, StoryObj } from "@storybook/react";
import WithSuspense from "./with-uspense";
import { lazy } from "react";

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
