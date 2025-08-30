import { useCallback, useEffect, useRef } from "react";

import type { AppToWebPayload } from "@packages/shared";

import { useNativeMessageStore } from "@/store";

type InitCallback = (init: AppToWebPayload<"INIT">["payload"]) => void;
type InitOptions = {
  /**
   * @description autoTrigger가 true일 경우 useInit이 발생할 때 callback을 호출합니다.
   * @default true
   */
  autoTrigger?: boolean;
};

/**
 * @description
 * useInit은 init이 발생할 때 callback을 호출합니다.
 * autoTrigger가 true일 경우 useInit이 발생할 때 callback을 호출합니다.
 * @param callback
 * @param options
 * @returns
 */
export const useInit = (callback: InitCallback, options: InitOptions = { autoTrigger: true }) => {
  const called = useRef(false);

  const { init } = useNativeMessageStore();

  const trigger = useCallback(() => {
    if (init) {
      callback(init);
    }
  }, [callback, init]);

  useEffect(() => {
    if (options.autoTrigger && !called.current) {
      trigger();
      called.current = true;
    }
  }, [options.autoTrigger, trigger]);

  return { trigger };
};
