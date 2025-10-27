import { Alert } from "@packages/ui";

import { ANDROID_APP_URL, IOS_APP_URL } from "@/lib/constants";

export type SuggestionInstallAppModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  /**
   * @default "앱을 설치하고 이용해보세요"
   */
  title?: string;
  /**
   * @default "맘찬픽 앱에서 예약하고\n찜한 가게의 할인 알림을 받아보세요。"
   */
  description?: string;
  /**
   * @default "오늘은 그냥 볼게요"
   */
  cancelLabel?: string;
  /**
   * @default "앱에서 보기"
   */
  confirmLabel?: string;
};

export const SuggestionInstallAppModal = ({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title = "앱을 설치하고 이용해보세요",
  description = "맘찬픽 앱에서 예약하고\n찜한 가게의 할인 알림을 받아보세요。",
  cancelLabel = "오늘은 그냥 볼게요",
  confirmLabel = "앱에서 보기",
}: SuggestionInstallAppModalProps) => {
  return (
    <Alert
      open={open}
      onOpenChange={onOpenChange}
      allowClickAway
      title={title}
      description={description}
      actionDirection="col"
      cancel={{
        label: cancelLabel,
        action: () => {
          onOpenChange(false);
          onCancel?.();
        },
        className: "border-none text-gray-400 shadow-none",
      }}
      confirm={{
        label: confirmLabel,
        action: () => {
          onOpenChange(false);
          onConfirm?.();

          const varUA = navigator.userAgent.toLowerCase();

          if (varUA.indexOf("android") > -1) {
            window.open(ANDROID_APP_URL, "_blank");
          } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
            window.open(IOS_APP_URL, "_blank");
          }
        },
        className: "bg-primary text-white font-bold",
      }}
    />
  );
};
