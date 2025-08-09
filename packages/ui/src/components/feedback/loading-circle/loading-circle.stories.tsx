import { Meta } from "@storybook/react";
import { useState } from "react";
import { LoadingCircle } from "./loading-circle";

const meta: Meta<typeof LoadingCircle> = {
  title: "Feedback/LoadingCircle",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-subtitle1 text-black">content</div>
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="p-2 border border-gray-200">
            {`[${index}] content`}
          </li>
        ))}
      </ul>
      <LoadingCircle animation />
    </div>
  );
};

export const Local = () => {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center h-[200px] w-[200px] bg-primary-500">
        <div className="font-subtitle1 text-black">content</div>
        <LoadingCircle position="local" animation />
      </div>
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="p-2 border border-gray-200">
            {`[${index}] content`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ControlVisibility = () => {
  const [animation, setAnimation] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex flex-col items-center justify-center h-[200px] w-[200px] border border-gray-200">
        <LoadingCircle position="local" animation={animation} />
        <div className="font-subtitle1 text-black">content</div>
      </div>
      <button className="border border-gray-200 p-2 rounded cursor-pointer font-subtitle1 text-black" onClick={() => setAnimation((prev) => !prev)}>
        Toggle
      </button>
    </div>
  );
};

export const Size = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] w-[200px] bg-primary-500">
      <div className="font-subtitle1 text-black">size 10</div>
      <LoadingCircle animation size={10} />
    </div>
  );
};

export const Color = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] w-[200px] bg-primary-500">
      <div className="font-subtitle1 text-black">color red</div>
      <LoadingCircle animation color="text-red-500" />
    </div>
  );
};
