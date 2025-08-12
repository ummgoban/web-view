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
  trigger?: React.ReactNode;
};

export const Alert = ({ title, description, cancel, confirm, open, onOpenChange, trigger }: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancel && <AlertDialogCancel onClick={cancel.action}>{cancel.label ?? "취소"}</AlertDialogCancel>}
          {confirm && <AlertDialogAction onClick={confirm.action}>{confirm.label ?? "확인"}</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
