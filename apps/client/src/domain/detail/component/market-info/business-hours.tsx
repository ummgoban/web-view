import { dayMap } from "@packages/shared";
import { type MarketDetailType } from "@packages/shared";

import ChevronRight from "@/lib/assets/icons/chevron-right.svg?react";
import { useState } from "react";

interface BusinessHoursProps {
  todayOpenHour: MarketDetailType["marketOpenHour"][number] | undefined;
  marketOpenHour: MarketDetailType["marketOpenHour"];
}

export const BusinessHours = ({ marketOpenHour, todayOpenHour }: BusinessHoursProps) => {
  const [openMoreBusinessHours, setOpenMoreBusinessHours] = useState(false);

  return (
    <div onClick={() => setOpenMoreBusinessHours(!openMoreBusinessHours)}>
      <div className="flex items-center mb-3 gap-2">
        <div className="flex items-center">
          {todayOpenHour ? (
            <>
              <span className="text-sm">영업 시간: </span>
              <span className="text-sm font-bold ml-1">{`${todayOpenHour.openTime} ~ ${todayOpenHour.closeTime}`}</span>
            </>
          ) : (
            <span className="text-sm text-red-500">영업이 종료되었습니다.</span>
          )}
        </div>

        <div className="text-gray-500">
          <ChevronRight className="transition-transform" style={{ transform: openMoreBusinessHours ? "rotate(90deg)" : "rotate(0deg)" }} />
        </div>
      </div>
      <div className="flex flex-col">
        {openMoreBusinessHours && (
          <div className="flex flex-col">
            {marketOpenHour.map((openHour) => (
              <div key={openHour.dayOfWeek} className="flex items-center">
                <span className="text-sm">{dayMap[openHour.dayOfWeek]}</span>
                <span className="text-sm font-bold ml-1">{`${openHour.openTime} ~ ${openHour.closeTime}`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
