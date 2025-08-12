import { Meta } from "@storybook/react";
import { useState } from "react";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setOpen(true)}>Open</button>
      <Alert
        title="title"
        description="description"
        cancel={{ label: "cancel", action: () => alert("cancel") }}
        confirm={{ label: "confirm", action: () => alert("confirm") }}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export const WithTrigger = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Alert title="title" description="description" cancel={{ label: "cancel", action: () => alert("cancel") }} confirm={{ label: "confirm", action: () => alert("confirm") }}>
        <div>Open Trigger</div>
      </Alert>
    </div>
  );
};

export const CustomMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Alert
        title="알림"
        description={`
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
        cancel={{ label: "취소", action: () => alert("cancel") }}
        confirm={{ label: "확인", action: () => alert("confirm") }}
      >
        <div>Open Trigger</div>
      </Alert>
    </div>
  );
};
