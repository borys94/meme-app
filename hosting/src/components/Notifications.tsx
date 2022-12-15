import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

import { useAppSelector, useAppDispatch } from "@stores/index";
import { closeNotification } from "@stores/notifications";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertColor | null>(null);
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    if (notifications[0]) {
      setMessage(notifications[0].message);
      setType(notifications[0].type);
    } else {
      setTimeout(() => {
        if (!notifications[0]) {
          setMessage("");
          setType(null);
        }
      }, 500);
    }
  }, [notifications]);

  const close = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      data-testid="notification-snackbar"
      open={!!notifications.length}
      autoHideDuration={6000}
      onClose={close}
    >
      <Alert
        data-testid="notification-alert"
        onClose={close}
        variant="filled"
        severity={type ? type : "info"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
