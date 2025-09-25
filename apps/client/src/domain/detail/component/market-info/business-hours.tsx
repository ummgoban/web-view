import { useEffect, useRef, useState } from "react";

import { dayMap, type MarketDetailType } from "@packages/shared";
import { cn } from "@packages/ui";

import ChevronRight from "@/lib/assets/icons/chevron-right.svg?react";

interface BusinessHoursProps {
  todayOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;
  tomorrowOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;
  marketOpenHour: MarketDetailType["marketOpenHour"];
  isOpen: boolean;
}

export const BusinessHours = ({
  marketOpenHour,
  todayOpenHour,
  tomorrowOpenHour,
  isOpen,
}: BusinessHoursProps) => {
  const [openMoreBusinessHours, setOpenMoreBusinessHours] = useState(false);
  const businessHoursRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".more-business-hours")) {
        setOpenMoreBusinessHours(false);
      }
    };

    document.addEventListener("click", clickOutsideHandler);

    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  useEffect(() => {
    // businessHoursRef 가 화면 밖으로 나가면 openMoreBusinessHours를 false로 변경
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setOpenMoreBusinessHours(false);
        }
      });
    });

    if (businessHoursRef.current) {
      observer.observe(businessHoursRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      onClick={() => setOpenMoreBusinessHours(!openMoreBusinessHours)}
      className={cn("more-business-hours", openMoreBusinessHours && "relative")}
      ref={businessHoursRef}
    >
      <div className="flex items-center mb-3 gap-2">
        <div className="flex items-center">
          {isOpen && todayOpenHour ? (
            <>
              <div className="text-sm">영업 시간: </div>
              <div className="text-sm font-bold ml-1 flex items-center gap-1">
                <div>{`${todayOpenHour.openTime}`}</div>
                <div>~</div>
                <div>{`${todayOpenHour.closeTime}`}</div>
              </div>
            </>
          ) : (
            <div className="text-sm w-full flex flex-row items-center gap-1">
              {tomorrowOpenHour ? (
                <>
                  <div className="text-black-600">영업 전</div>
                  <div className="text-gray-500">
                    {tomorrowOpenHour ? `${tomorrowOpenHour.openTime} 오픈` : ""}
                  </div>
                </>
              ) : (
                <div className="text-red-600">휴무일</div>
              )}
            </div>
          )}
        </div>

        <div className="text-gray-500">
          <ChevronRight
            className="transition-transform"
            style={{ transform: openMoreBusinessHours ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        </div>
      </div>
      {openMoreBusinessHours && (
        <div className="flex flex-col absolute top-full left-0 right-0 shadow-lg">
          <div className="flex flex-col bg-white border border-gray-200 rounded-lg w-full p-4 z-20">
            {marketOpenHour.map((openHour) => (
              <div key={openHour.dayOfWeek} className="flex items-center gap-1">
                <div className="text-sm w-12">{dayMap[openHour.dayOfWeek]}</div>
                <div className="text-sm font-bold flex items-center gap-1">
                  <div className="w-12 text-left">{`${openHour.openTime}`}</div>
                  <div>~</div>
                  <div className="w-12 text-right">{`${openHour.closeTime}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
