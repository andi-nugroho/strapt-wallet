import { toast as sonnerToast } from 'sonner';

// Export the toast function to be used in components
export const toast = (props: any) => {
  if (props.variant === 'destructive') {
    return sonnerToast.error(props.title, {
      description: props.description,
      action: props.action,
    });
  } else if (props.variant === 'success') {
    return sonnerToast.success(props.title, {
      description: props.description,
      action: props.action,
    });
  } else {
    return sonnerToast(props.title, {
      description: props.description,
      action: props.action,
    });
  }
};
