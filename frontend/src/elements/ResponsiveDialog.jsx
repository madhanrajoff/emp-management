import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function ResponsiveDialog({
  screen,
  title,
  text,
  blipOpen,
  tackleBlip,
  blipAction,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(screen));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={blipOpen}
      onClose={tackleBlip}
      maxWidth="md"
      aria-labelledby="responsive-dialog-title"
    >
      {title && <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>}
      {text && (
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      )}
      {blipAction && <DialogActions>{blipAction}</DialogActions>}
    </Dialog>
  );
}
