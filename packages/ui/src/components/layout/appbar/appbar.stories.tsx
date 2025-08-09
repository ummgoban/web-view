import type { Meta, StoryObj } from "@storybook/react";

import AppBar, { AppBarProps } from "./appbar";

import BackIconSvg from "../../../assets/svg/back-arrow.svg";
import SettingIconSvg from "../../../assets/svg/setting.svg";

const meta: Meta<typeof AppBar> = {
  title: "layout/AppBar",
  component: AppBar,
  parameters: {},
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

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-screen">
      {children}
      <div className="flex-1 p-2">
        <ul className="flex flex-col gap-2">
          {Array.from({ length: 20 }).map((_, index) => (
            <li key={index} className="p-2 border border-gray-200">
              {`[${index}] content`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Default = () => {
  return (
    <Template>
      <AppBar title="AppBar" />
    </Template>
  );
};

export const WithLeftContent = () => {
  return (
    <Template>
      <AppBar
        title="AppBar"
        LeftContent={
          <div aria-label="back-icon">
            <img className="w-6 h-6" src={BackIconSvg} alt="back-icon" />
          </div>
        }
      />
    </Template>
  );
};

export const WithRightContent = () => {
  return (
    <Template>
      <AppBar
        title="AppBar"
        RightContent={
          <div aria-label="setting-icon">
            <img className="w-6 h-6" src={SettingIconSvg} alt="setting-icon" />
          </div>
        }
      />
    </Template>
  );
};

export const WithLeftAndRightContent = () => {
  return (
    <Template>
      <AppBar
        title="AppBar"
        LeftContent={
          <div aria-label="back-icon">
            <img className="w-6 h-6" src={BackIconSvg} alt="back-icon" />
          </div>
        }
        RightContent={
          <div aria-label="setting-icon">
            <img className="w-6 h-6" src={SettingIconSvg} alt="setting-icon" />
          </div>
        }
      />
    </Template>
  );
};

export default meta;
