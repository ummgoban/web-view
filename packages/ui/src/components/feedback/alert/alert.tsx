import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib";
import { useEffect, useRef } from "react";

export type AlertProps = {
  title?: string;
  description?: string;
  cancel?: {
    label?: string;
    action?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
  };
  confirm?: {
    label?: string;
    action?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  actionDirection?: "row" | "col" | "row-reverse" | "col-reverse";
  allowClickAway?: boolean;
};

export const Alert = ({
  title,
  description,
  cancel,
  confirm,
  open,
  onOpenChange,
  children,
  actionDirection = "row",
  allowClickAway = false,
}: AlertProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!allowClickAway) return;
    const handleClickOutside = (event: MouseEvent) => {
      const alertContent = ref.current;
      if (alertContent && !alertContent.contains(event.target as Node)) {
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [allowClickAway, onOpenChange]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent className="bg-white w-[calc(100%-32px)] rounded-md" ref={ref}>
        <AlertDialogHeader className="break-words whitespace-pre-line">
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter
          className={cn("flex justify-center items-center gap-2", `flex-${actionDirection}`)}
        >
          {confirm && (
            <AlertDialogAction
              className={cn(
                "m-0",
                actionDirection.startsWith("col") ? "w-full" : "flex-1",
                confirm.className,
              )}
              onClick={confirm.action}
            >
              {confirm.label ?? "확인"}
            </AlertDialogAction>
          )}
          {cancel && (
            <AlertDialogCancel
              className={cn(
                "m-0",
                actionDirection.startsWith("col") ? "w-full" : "flex-1",
                cancel.className,
              )}
              onClick={cancel.action}
            >
              {cancel.label ?? "취소"}
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
