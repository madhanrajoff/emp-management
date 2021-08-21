import React, { Component } from "react";
import {
  Button,
  Container,
  Typography,
  CssBaseline,
  Checkbox,
  Link,
  Grid,
  Grow,
  TextField,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import axios from "axios";

import { AlertMessage, CircularIndeterminate } from "../elements";
import { HttpHelper as Http, AlertHelper as AlertHp } from "../helpers";
import { Logo } from "../assets";

const signUpFormInitialState = {
  email: "",
  password: "",
  rePassword: "",
  contact: "",
  hasError: false,
  message: "",
  is_superuser: false,
};

class SignUp extends Component {
  state = { ...signUpFormInitialState, ...AlertHp.initialState };

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

    // activate the CircularProgress
    this.setState({ progress: true });

    try {
      const { fine, msg, error } = await axios
        .post(`${Http.Link()}`, this.state, {})
        .then(({ data }) => data);

      if (error) {
        const { message } = error;
        this.setState({ hasError: true, message });
      } else {
        if (!fine) {
          this.setState({
            msg: msg,
            type: "error",
            progress: false, // deActivate the CircularProgress and Open Alert.
            open: true,
          });
        } else {
          this.setState({
            progress: false,
            open: true,
            msg: "You have successfully registered",
            type: "success",
            ...signUpFormInitialState,
          });
        }
      }
    } catch (error) {
      const { message } = error;
      this.setState({ hasError: true, message });
    }
  };

  tackleHasError = () =>
    this.setState((prevState) => ({
      hasError: !prevState.hasError,
      ...AlertHp.initialState,
    }));

  render() {
    const { classes } = this.props;

    const {
      email,
      password,
      rePassword,
      contact,
      open,
      msg,
      type,
      progress,
      is_superuser,
    } = this.state;

    const openOrClose = (state) => this.setState({ open: state });

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Grow in={true} timeout={3000}>
            <img src={Logo} alt="Logo" className={classes.logo} />
          </Grow>
          <ValidatorForm className={classes.form} onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
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
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.password}
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.password}
                  variant="outlined"
                  required
                  fullWidth
                  name="rePassword"
                  label="Re-Password"
                  type="password"
                  value={rePassword}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.password}
                  variant="outlined"
                  required
                  fullWidth
                  name="contact"
                  label="Contact"
                  value={contact}
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={is_superuser}
                      color="primary"
                      onInput={() =>
                        this.setState({ is_superuser: !is_superuser })
                      }
                    />
                  }
                  label={
                    <Typography variant="overline" display="block">
                      manager?
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {progress ? (
              <CircularIndeterminate />
            ) : (
              <AlertMessage
                onClickFunc={openOrClose}
                open={open}
                type={type}
                msg={msg}
                link={msg === "You have successfully registered" && "/"}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className={classes.link} href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
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
    marginTop: theme.spacing(3),
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
  password: {
    marginBottom: theme.spacing(1),
  },
  logo: {
    height: 70,
  },
});

const SignUpWithStyles = withStyles(useStyles)(SignUp);

export default SignUpWithStyles;
