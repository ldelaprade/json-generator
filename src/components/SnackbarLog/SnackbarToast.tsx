import { useState, useEffect, useCallback } from "react";
import { Alert, AlertTitle, Grow } from "@mui/material";
import { useSnackStack, ToastProps } from "./SnackStackProvider"

type SnackbarToastProps = {
  toast: ToastProps;
};

const TIMEOUT = 300;

const SnackbarToast: React.FC<SnackbarToastProps> = ({ toast }) => {
  const [open, setOpen] = useState(true);
  const { removeToast } = useSnackStack();

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      removeToast(toast.key);
    }, TIMEOUT);
  }, [toast.key, removeToast]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    if (toast?.onClose) {
      toast.onClose();
    }
    close();
  };

  useEffect(() => {
    if (toast.duration !== 0) {
      setTimeout(() => {
        close();
      }, toast.duration || 6000);
    }
  }, [close, toast.duration]);

  return (
    <Grow in={open} timeout={TIMEOUT}>
      <Alert
        key={toast.key}
        severity={toast?.severity || "info"}
        onClose={handleClose}
        variant="filled"
        sx={{
          minWidth: 280,
          width: { xs: 1, md: "auto" },
          mb: 1
        }}
      >
        {toast?.title && <AlertTitle>{toast.title}</AlertTitle>}
        {toast?.message}
        {toast?.children}
      </Alert>
    </Grow>
  );
};

export default SnackbarToast;
