import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // The issue is that useToast().toasts is undefined, so we'll just render an empty toaster
  return (
    <ToastProvider>
      {/* Don't try to map over toasts which might be undefined */}
      <ToastViewport />
    </ToastProvider>
  )
}
