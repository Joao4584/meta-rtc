import { toast } from "sonner";
import { Check, AlertCircleIcon, TimerIcon, InfoIcon, Ban } from "lucide-react";

const iconsType = {
  success: <Check className="h-5 w-5 text-green-500" />,
  warning: <AlertCircleIcon className="h-5 w-5 text-yellow-500" />,
  error: <Ban className="h-5 w-5 text-red-500" />,
  info: <InfoIcon className="h-5 w-5 text-blue-500" />,
};

class Toasts {
  static show(
    message: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'info',
    description?: string
  ): void {
    toast(message, {
      description: description ? `${description}` : undefined,
      icon: iconsType[type],
    });
  }
}

export default Toasts;
