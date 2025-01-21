import { toast } from "react-toastify";

interface createNotificationPropsI {
  type: "error" | "success";
  message: string;
}

export const createNotification = ({
  type,
  message,
}: createNotificationPropsI) =>
  toast(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: `${type}`,
    theme: "dark",
  });
