import type { Meta, StoryObj } from "@storybook/react";

import AppBar from "./appbar";

const meta: Meta<typeof AppBar> = {
  title: "layout/AppBar",
  component: AppBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "AppBar",
  },
  argTypes: {
    title: {
      control: "text",
    },
  },
} satisfies Meta<typeof AppBar>;

export const Default: StoryObj<typeof AppBar> = {
  args: {
    title: "AppBar",
  },
};

export default meta;
