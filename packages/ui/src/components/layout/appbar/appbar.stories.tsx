import type { Meta } from "@storybook/react";

import AppBar from "./appbar";

import BackIconSvg from "@/assets/svg/back-arrow.svg";
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
      <img className="w-6 h-6" src={BackIconSvg} alt="back-icon" />
    </button>
  );
};

const SettingIcon = () => {
  return (
    <button aria-label="setting-icon" className="cursor-pointer" onClick={() => alert("setting")}>
      <img className="w-6 h-6" src={SettingIconSvg} alt="setting-icon" />
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
