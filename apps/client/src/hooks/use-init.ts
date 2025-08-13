import { useCallback, useEffect, useState } from "react";

import type { ReceivedMessagePayload } from "@packages/shared";

import { useNativeMessageStore } from "@/store";

type InitProps = {
  callback: (init: ReceivedMessagePayload<"INIT">["payload"]) => void;
  /**
   * autoTrigger가 true일 경우 useInit이 발생할 때 callback을 호출합니다.
   * @default true
   */
  autoTrigger?: boolean;
};

export const useInit = ({ callback, autoTrigger = true }: InitProps) => {
  const [triggered, setTriggered] = useState(false);
  const { init } = useNativeMessageStore();

  const triggerCallback = useCallback(() => {
    if (init) {
      callback(init);
    }
  }, [callback, init]);

  useEffect(() => {
    if (autoTrigger && !triggered) {
      triggerCallback();
      setTriggered(true);
    }
  }, [autoTrigger, triggerCallback, triggered]);

  return { trigger: triggerCallback };
};
