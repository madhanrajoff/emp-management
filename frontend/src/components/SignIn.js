import React, { Component } from "react";
import {
  Button,
  CssBaseline,
  Container,
  Grow,
  Grid,
  Link,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import axios from "axios";

import { AlertMessage, CircularIndeterminate } from "../elements";
import { HttpHelper as Http, AlertHelper as AlertHp } from "../helpers";
import { Logo } from "../assets";

const signInFormInitialState = {
  email: "",
  password: "",
  hasError: false,
  message: "",
};

class SignIn extends Component {
  state = { ...signInFormInitialState, ...AlertHp.initialState };

  onInput = ({ target: { name, value } }) => {
    const { open } = this.state;
    if (open) {
      this.setState((prevState) => ({
        open: !prevState.open,
      }));
    }
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    // activate the CircularProgress.
    this.setState({ progress: true });

    try {
      const { fine, msg, error } = await axios
        .get(`${Http.Link()}/verify`, {
          params: this.state,
        })
        .then(({ data }) => data);

      if (error) {
        const { message } = error;
        this.setState({ hasError: true, message });
      } else {
        if (!fine) {
          this.setState({
            msg,
            type: "error",
            progress: false, // deActivate the CircularProgress and Open Alert.
            open: true,
          });
        } else {
          History.push("/home");
        }
      }
    } catch (error) {
      const { message } = error;
      this.setState({ hasError: true, message });
    }
  };

  tackleAlertMessage = (open) => this.setState({ open });

  tackleHasError = () =>
    this.setState((prevState) => ({
      hasError: !prevState.hasError,
      ...AlertHp.initialState,
    }));

  render() {
    const { classes } = this.props;
    const { email, password, open, msg, type, progress } =
      this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Grow in={true} timeout={3000}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </Grow>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              autoFocus
              value={email}
              onInput={this.onInput}
              InputProps={{
                classes: {
                  root: classes.outlinedInput,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  focused: classes.focused,
                },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onInput={this.onInput}
              InputProps={{
                classes: {
                  root: classes.outlinedInput,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  focused: classes.focused,
                },
              }}
            />
            {progress ? (
              <CircularIndeterminate />
            ) : (
              <AlertMessage
                onClickFunc={this.tackleAlertMessage}
                open={open}
                type={type}
                msg={msg}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#bf360c",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "orange",
    color: "#FFFFFF",
    "&:hover": {
      color: "#000000",
    },
  },
  link: {
    color: "orange",
  },
  outlinedInput: {
    "&$focused $notchedOutline": {
      border: "2px solid orange",
    },
  },
  focused: {},
  notchedOutline: {},
  label: {
    "&$focused": {
      color: "orange",
    },
  },
  logo: {
    height: 70,
  },
});

export default withStyles(useStyles)(SignIn);
