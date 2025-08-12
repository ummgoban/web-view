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

export type AlertProps = {
  title?: string;
  description?: string;
  cancel?: {
    label?: string;
    action?: React.MouseEventHandler<HTMLButtonElement>;
  };
  confirm?: {
    label?: string;
    action?: React.MouseEventHandler<HTMLButtonElement>;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

export const Alert = ({ title, description, cancel, confirm, open, onOpenChange, children }: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent className="bg-white w-[calc(100%-32px)] rounded-md">
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center items-center gap-2">
          {confirm && (
            <AlertDialogAction className="flex-1" onClick={confirm.action}>
              {confirm.label ?? "확인"}
            </AlertDialogAction>
          )}
          {cancel && (
            <AlertDialogCancel className="flex-1" onClick={cancel.action}>
              {cancel.label ?? "취소"}
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
