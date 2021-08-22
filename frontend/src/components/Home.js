import React, { Component } from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Slide,
  Button,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";

import axios from "axios";

import {
  TableHead,
  TableHeaderCell,
  TableRowCell as TableCell,
} from "../elements/CustomMuiTableProps";
import { HttpHelper as Http } from "../helpers";
import { ResponsiveDialog, ActionBtn, CustomizedRatings } from "../elements";
import { History } from "../utils";
import SignUp from "./SignUp";

const tableInitialState = {
  rows: [],
  onEdit: false,
  onDelete: false,
  interposed: false,
  previous: {},
  addNew: false,
};

class Home extends Component {
  state = { ...tableInitialState };

  componentDidMount = () => {
    this.callForRows();
  };

  callForRows = async () => {
    const { match } = this.props;
    const { data } = await axios
      .get(`${Http.Link()}/${match.params.who}/${match.params.id}`)
      .then(({ data }) => data);

    if (data !== undefined) {
      this.setRows(Array.isArray(data) ? data : [data]);
      this.setTableInitialState();
    } else {
      this.setState((prevState) => ({
        ...prevState,
        ...tableInitialState,
      }));
    }
  };

  setPage = (page) => this.setState((prevState) => ({ ...prevState, page }));

  setRowsPerPage = (rowsPerPage) =>
    this.setState((prevState) => ({ ...prevState, rowsPerPage }));

  setRows = (rows) => this.setState((prevState) => ({ ...prevState, rows }));

  setInterposed = (interposed) =>
    this.setState((prevState) => ({ ...prevState, interposed }));

  setTableInitialState = () =>
    this.setState((prevState) => ({
      ...prevState,
      ...tableInitialState,
      rows: prevState.rows,
    }));

  setOnEdit = (onEdit) =>
    this.setState({
      onEdit,
    });

  setOnDelete = (onDelete) =>
    this.setState({
      onDelete,
    });

  setPrevious = (previous) =>
    this.setState((prevState) => ({
      previous: { ...prevState.previous, ...previous },
    }));

  tackleOnEdit = () =>
    this.setState((prevState) => ({
      onEdit: !prevState.onEdit,
    }));

  tackleOnDelete = () =>
    this.setState((prevState) => ({
      onDelete: !prevState.onDelete,
    }));

  onToggleEditMode = (id) => {
    this.isPrevious(id);
    this.setOnEdit(true);
  };

  onToggleDeleteMode = (id) => {
    this.isPrevious(id);
    this.setOnDelete(true);
  };

  onEditRevert = () => {
    const { previous } = this.state;

    if (Object.keys(previous).length) {
      this.setState({ previous: {} });
    }

    this.setOnEdit(false);
    this.setOnDelete(false);
  };

  isPrevious = (id) => {
    const { previous } = this.state;

    if (!Object.keys(previous).length) {
      const row = this.findRow(id);
      this.setPrevious(row);
    }
  };

  onPreviousChange = ({ target: { name, value } }) => {
    this.setPrevious({ [name]: value });
  };

  editAction = (text, func) => {
    const { interposed } = this.state;

    return (
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        {interposed ? (
          <Box p={1}>
            <ActionBtn
              actionBtnText={text.slice(0, -1) + "ing..."}
              variant="contained"
              size="small"
              style={{ backgroundColor: "#800000" }}
            />
          </Box>
        ) : (
          <>
            <Box p={1}>
              <ActionBtn
                actionBtnText="cancel"
                variant="contained"
                size="small"
                color="secondary"
                actionBtnFunc={this.onEditRevert}
              />
            </Box>
            <Box p={1}>
              <ActionBtn
                actionBtnText={text}
                variant="contained"
                size="small"
                actionBtnFunc={func}
              />
            </Box>
          </>
        )}
      </Box>
    );
  };

  editContent = () => {
    const { classes } = this.props;
    const { previous } = this.state;

    return (
      <Box m={4}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              margin="dense"
              variant="outlined"
              name="username"
              className={classes.filedWidth}
              value={previous.username}
              onChange={this.onPreviousChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              margin="dense"
              variant="outlined"
              name="email"
              className={classes.filedWidth}
              value={previous.email}
              onChange={this.onPreviousChange}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <CustomizedRatings
              value={previous.tech_stack}
              onChange={this.onPreviousChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  editDialog = () => {
    const { onEdit } = this.state;

    return (
      <ResponsiveDialog
        screen="sm"
        tackleBlip={this.tackleOnEdit}
        blipOpen={onEdit}
        text={this.editContent()}
        blipAction={this.editAction("update", this.refurbishRow)}
      />
    );
  };

  deleteDialog = () => {
    const { classes } = this.props;
    const { onDelete } = this.state;

    return (
      <ResponsiveDialog
        screen="sm"
        tackleBlip={this.tackleOnDelete}
        blipOpen={onDelete}
        title={
          <Box display="flex" justifyContent="flex-start">
            <Box p={1} m={1}>
              <WarningIcon style={{ color: "#800000", fontSize: 35 }} />
            </Box>
            <Box p={1} mt={1}>
              <Typography variant="h6" className={classes.deleteTitle}>
                Are you sure want to delete?
              </Typography>
            </Box>
          </Box>
        }
        blipAction={this.editAction("delete", this.removeRow)}
      />
    );
  };

  findRow = (id) => {
    const { rows } = this.state;
    return rows.find(({ id: row_id }) => row_id === id);
  };

  refurbishRow = async () => {
    const { previous } = this.state;

    this.setInterposed(true);

    if (Object.keys(previous).length) {
      const { fine } = await axios
        .put(`${Http.Link()}/emp/`, this.state.previous)
        .then(({ data }) => data);
      if (fine) {
        this.callForRows();
      }
    } else {
      this.setInterposed(false);
      this.setOnEdit(false);
    }
  };

  removeRow = async () => {
    const { previous } = this.state;

    this.setInterposed(true);

    if (Object.keys(previous).length) {
      const { fine } = await axios
        .delete(`${Http.Link()}/emp/${previous.id}/`)
        .then(({ data }) => data);

      console.log(fine);
      if (fine) {
        this.callForRows();
      }
    } else {
      this.setInterposed(false);
      this.setOnEdit(false);
    }
  };

  render() {
    const { classes, match } = this.props;
    const { rows, addNew } = this.state;

    const percentage = {
      1: "20%",
      2: "40%",
      3: "60%",
      4: "80%",
      5: "100%",
    };

    const columns = [
      { id: "username", label: "Username" },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "created_at",
        label: "CreatedAt",
      },
      {
        id: "updated_at",
        label: "UpdatedAt",
      },
      {
        id: "tech_stack",
        label: "Skills",
      },
      { id: "edit" },
      { id: "delete" },
    ];

    return !addNew ? (
      <Box m={6}>
        {match.params.who === "mgr" ? (
          <Box display="flex" m={3} mr={0} ml={0}>
            <Box flexGrow={1}>
              <Button
                variant="contained"
                style={{ color: "#800000" }}
                onClick={() => this.setState({ addNew: true })}
              >
                Add Employee
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                style={{ background: "#800000", color: "white" }}
                onClick={() => History.push("/")}
              >
                Logout
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="flex-end" m={3} mr={0}>
            <Button
              variant="contained"
              style={{ background: "#800000", color: "white" }}
              onClick={() => History.push("/")}
            >
              Logout
            </Button>
          </Box>
        )}
        {rows.length > 0 ? (
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <TableContainer elevation={10} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {columns.map(({ id, label, align = "left", minWidth }) => (
                      <TableHeaderCell
                        style={{ minWidth: minWidth }}
                        key={id}
                        align={align}
                      >
                        {label}
                      </TableHeaderCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.created_at}</TableCell>
                      <TableCell align="left">{row.updated_at}</TableCell>
                      <TableCell align="left">
                        {percentage[row.tech_stack]}
                      </TableCell>
                      <TableCell
                        align="right"
                        className={classes.selectTableCell}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => this.onToggleEditMode(row.id)}
                          className={classes.editBtn}
                          size="small"
                        >
                          Edit
                        </Button>
                      </TableCell>
                      {match.params.who !== "emp" && (
                        <TableCell
                          align="right"
                          className={classes.selectTableCell}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              this.onToggleDeleteMode(row.id);
                            }}
                            className={classes.deleteBtn}
                            size="small"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Slide>
        ) : (
          <Box display="flex" justifyContent="center">
            <Typography variant="h4">No Employees found!</Typography>
          </Box>
        )}
        {this.editDialog()}
        {this.deleteDialog()}
      </Box>
    ) : (
      <SignUp managerId={match.params.id} />
    );
  }
}

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  editBtn: {
    color: "#006400",
  },
  deleteBtn: {
    color: "#800000",
  },
  filedWidth: {
    width: "25ch",
    margin: theme.spacing(1.5),
  },
});

export default withStyles(useStyles)(Home);
