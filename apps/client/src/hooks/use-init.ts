import { useCallback, useEffect, useState } from "react";

import type { AppToWebPayload } from "@packages/shared";

import { useNativeMessageStore } from "@/store";

type InitCallback = (init: AppToWebPayload<"INIT">["payload"]) => void;
type InitOptions = {
  /**
   * autoTrigger가 true일 경우 useInit이 발생할 때 callback을 호출합니다.
   * @default true
   */
  autoTrigger?: boolean;
};

export const useInit = (callback: InitCallback, options: InitOptions = { autoTrigger: true }) => {
  const [triggered, setTriggered] = useState(false);
  const { init } = useNativeMessageStore();

  const trigger = useCallback(() => {
    if (init) {
      callback(init);
    }
  }, [callback, init]);

  useEffect(() => {
    if (options.autoTrigger && !triggered) {
      trigger();
      setTriggered(true);
    }
  }, [options.autoTrigger, trigger, triggered]);

  return { trigger };
};
