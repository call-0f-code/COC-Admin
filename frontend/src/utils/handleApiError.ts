import { globalToast as toast } from "./toast";

export const handleApiError = (error: any) => {
  const status = error?.response?.status;

  if (!status) {
    toast.error("Network error. Please check your connection.");
    return;
  }

  switch (status) {
    case 400:
      toast.error(error.response?.data?.message || "Bad Request.");
      break;

    case 401:
      toast.error("Unauthorized request.");
      break;

    case 403:
      toast.error("Access denied.");
      break;

    case 404:
      toast.error("Resource not found.");
      break;

    case 500:
    case 501:
    case 502:
    case 503:
      toast.error("Server error, please try later.");
      break;

    default:
      toast.error("Something went wrong.");
  }
};
