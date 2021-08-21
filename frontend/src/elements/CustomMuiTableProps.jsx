import { withStyles } from "@material-ui/core/styles";
import MuiTableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import MuiTableCell from "@material-ui/core/TableCell";

const TableHead = withStyles((theme) => ({
  root: {
    backgroundColor: "orange",
  },
}))(MuiTableHead);

const TableHeaderCell = withStyles((theme) => ({
  root: {
    color: "white",
    fontWeight: 900,
  },
}))(TableCell);

const TableRowCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

export { TableHead, TableHeaderCell, TableRowCell };
