import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { IconButton, Collapse, Link, Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { History } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Icon({ stateHandler }) {
  return (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={stateHandler}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );
}

function HyperLink({ link = "Download", link_to = "/" }) {
  const redirectUrl = (link_to) => History.push(link_to);

  return (
    <Link
      component="button"
      variant="body2"
      color="inherit"
      onClick={() => {
        redirectUrl(link_to);
      }}
    >
      {link}
    </Link>
  );
}

function Type({ type, onClickFunc, msg, link, link_to }) {
  const stateHandler = () => onClickFunc(false);

  const actionHandler = () =>
  link_to ? (
      <Box display="flex">
        <Box p={1} flexGrow={1}>
          <HyperLink link={link} link_to={link_to} />
        </Box>

        <Box p={1}>
          <Icon stateHandler={stateHandler} />
        </Box>
      </Box>
    ) : (
      <Icon stateHandler={stateHandler} />
    );

  const severity = { success: "success", warning: "warning", error: "error" };

  return (
    <Alert severity={severity[type]} action={actionHandler()}>
      {msg}
    </Alert>
  );
}

/* the component receives props with the value of ALERT MESSAGE, ALERT TYPE, FUNCTION STATE. */
export default function AlertMessage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Collapse in={props.open}>
        <Type {...props} />
      </Collapse>
    </div>
  );
}