import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';


interface ConfirmDialogProps {
  children: React.ReactNode;
  header: string;
  description?: string;
  disabled?: boolean;
  onConfirm: () => void;
}

export const ConfirmModal = (props: ConfirmDialogProps) => {
  const handleConfirm = () => {
    props.onConfirm();
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {props.children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {props.header}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {props.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={props.disabled}
            onClick={handleConfirm}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
