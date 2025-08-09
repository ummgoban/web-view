import type { Meta } from "@storybook/react";

import { AppBar } from "./appbar";

import ChevronLeft from "@/assets/svg/chevron-left.svg";
import SettingIconSvg from "@/assets/svg/setting.svg";

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

const BackIcon = () => {
  return (
    <button aria-label="back-icon" className="cursor-pointer" onClick={() => alert("back")}>
      <ChevronLeft />
    </button>
  );
};

const SettingIcon = () => {
  return (
    <button aria-label="setting-icon" className="cursor-pointer" onClick={() => alert("setting")}>
      <SettingIconSvg />
    </button>
  );
};

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
      <AppBar title="AppBar" LeftContent={<BackIcon />} />
    </Template>
  );
};

export const HasHistory = () => {
  window.history.pushState(null, "", "");
  return (
    <Template>
      <AppBar title="AppBar" />
    </Template>
  );
};

export const WithRightContent = () => {
  return (
    <Template>
      <AppBar title="AppBar" RightContent={<SettingIcon />} />
    </Template>
  );
};

export const WithLeftAndRightContent = () => {
  return (
    <Template>
      <AppBar title="AppBar" LeftContent={<BackIcon />} RightContent={<SettingIcon />} />
    </Template>
  );
};

export const CustomAppBar = () => {
  return (
    <Template>
      <AppBar title="Custom AppBar" LeftContent={<BackIcon />} RightContent={<SettingIcon />} className="bg-red-500" />
    </Template>
  );
};

export default meta;
