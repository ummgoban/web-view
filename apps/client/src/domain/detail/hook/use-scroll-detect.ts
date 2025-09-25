import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Options = {
  /** 스크롤 컨테이너. 기본값: window */
  container?: HTMLElement | null;
  /** 탭 컨테이너. 기본값: null */
  tabContainer?: HTMLElement | null;
  /** 상단 고정 헤더 높이 등 오프셋(px) */
  offset?: number; // e.g., 64
  /** 탭 컨테이너 오프셋(px) */
  tabOffset?: number;
  /** 가시 판정 임계값 (0~1). 기본 0.6 */
  threshold?: number;
};

type ScrollDetect = {
  /** 현재 활성 섹션 id */
  activeId: string | null;
  /** 섹션 ref 등록용 콜백: <section ref={register('id')}> */
  register: (id: string) => (el: HTMLElement | null) => void;
  /** 탭 클릭 시 해당 섹션으로 스크롤 */
  scrollTo: (id: string) => void;
};

export function useScrollDetect(ids: string[], opts: Options = {}): ScrollDetect {
  const {
    container = null,
    tabContainer = null,
    offset = 0,
    tabOffset = 0,
    threshold = 0.6,
  } = opts;

  // id -> element 매핑
  const nodeMapRef = useRef<Record<string, HTMLElement | null>>({});
  const register = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      nodeMapRef.current[id] = el;
    },
    [],
  );

  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  // 스크롤 컨테이너 객체/옵션 메모
  const root: Element | null = useMemo(() => container ?? null, [container]);

  // IntersectionObserver로 활성 섹션 판정
  useEffect(() => {
    const nodes = ids.map((id) => nodeMapRef.current[id]).filter((el): el is HTMLElement => !!el);

    if (!nodes.length) return;

    // offset 보정: 상단 고정바가 있으면 그 높이만큼 위로 margin
    const rootMargin = `-${offset}px 0px 0px 0px`;

    // 가시 비율이 가장 높은 섹션을 활성화
    const visible: { id: string; ratio: number }[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.scrolltabsId;
          if (!id) continue;

          const idx = visible.findIndex((v) => v.id === id);
          const next = { id, ratio: entry.isIntersecting ? entry.intersectionRatio : 0 };

          if (idx === -1) visible.push(next);
          else visible[idx] = next;
        }

        // 가장 많이 보이는 섹션 선택(동률이면 ids 순서 우선)
        const best = visible
          .slice()
          .sort((a, b) =>
            a.ratio === b.ratio ? ids.indexOf(a.id) - ids.indexOf(b.id) : b.ratio - a.ratio,
          )[0];

        if (best && best.id !== activeId) setActiveId(best.id);

        const horizontalBestEl = nodeMapRef.current[`tag-${best.id}`];
        if (!horizontalBestEl) return;
        const targetLeft = horizontalBestEl.getBoundingClientRect().left + window.scrollX;
        tabContainer?.scrollTo({ left: targetLeft - tabOffset, behavior: "smooth" });
      },
      {
        root,
        rootMargin,
        threshold: buildThresholds(threshold),
      },
    );

    nodes.forEach((el, i) => {
      el.dataset.scrolltabsId = ids[i];
      io.observe(el);
    });

    return () => {
      nodes.forEach((el) => io.unobserve(el));
      io.disconnect();
    };
  }, [ids, root, offset, threshold, tabContainer, activeId, tabOffset]);

  // 탭 클릭 시 부드러운 스크롤
  const scrollTo = useCallback(
    (id: string) => {
      const el = nodeMapRef.current[id];
      const horizontalEl = nodeMapRef.current[`tag-${id}`];

      if (!el || !horizontalEl) return;

      const containerTop = container ? container.getBoundingClientRect().top + window.scrollY : 0;
      const tabContainerLeft = tabContainer
        ? tabContainer.getBoundingClientRect().left + window.scrollX
        : 0;

      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY; // 문서 기준 위치
      const targetTop = absoluteTop - (container ? containerTop : 0) - offset;

      const horizontalRect = horizontalEl.getBoundingClientRect();
      const absoluteLeft = horizontalRect.left + window.scrollX;
      const targetLeft = absoluteLeft - (tabContainer ? tabContainerLeft : 0) - tabOffset;

      if (container) {
        container.scrollTo({ top: targetTop, behavior: "smooth" });
      } else {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
      if (tabContainer) {
        tabContainer.scrollTo({ left: targetLeft, behavior: "smooth" });
      }
    },
    [container, offset, tabContainer, tabOffset],
  );

  return { activeId, register, scrollTo };
}

// threshold 숫자 하나만 넣어도 부드럽게 감지되도록 분해
function buildThresholds(t: number) {
  const steps = 10;
  const arr = Array.from({ length: steps + 1 }, (_, i) => i / steps);
  // 관성 완화를 위해 0~1까지 고정 + 핵심 임계값 포함
  if (!arr.includes(t)) arr.push(t);
  return arr.sort((a, b) => a - b);
}
