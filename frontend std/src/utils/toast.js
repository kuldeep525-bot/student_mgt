import { toast } from "react-toastify";

// custom toast hooks
export const showSuccess = (message) =>
  toast.success(message);

export const showError = (message) =>
  toast.error(message);

export const showInfo = (message) =>
  toast.info(message);

export const showWarning = (message) =>
  toast.warning(message);
