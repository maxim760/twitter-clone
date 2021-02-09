import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export const useAlertStyles = makeStyles(() => ({
  alert: {
    bottom: 0,
    position: "relative",
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 5,
  },
}));

interface MessageAlertProps {
  open: boolean;
  onClose(): void;
  severity: "success" | "info" | "warning" | "error" | undefined;
  text: string;
}

export const MessageAlert: React.FC<MessageAlertProps> = ({
  open,
  onClose,
  severity,
  text,
}): React.ReactElement => {
  const classes = useAlertStyles()
  return (
    <Snackbar
      data-testid="snackbar"
      open={open}
      onClose={onClose}
      // autoHideDuration={5000}
      className={classes.alert}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {text}
      </Alert>
    </Snackbar>
  );
};
