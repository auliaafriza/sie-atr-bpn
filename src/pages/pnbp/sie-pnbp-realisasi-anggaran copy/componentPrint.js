import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  TablePagination,
  Button,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import styles from "./styles";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { render, createPortal } from "react-dom";

const ComponentPrint = () => {
  const inputRef = useRef();
  const classes = styles();
  const location = useLocation();

  const data = location.state.data;
  const comment = location.state.comment;

  useEffect(() => {
    let timer = setTimeout(() => window.print(), 2 * 1000);
    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "M";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "Jt";
    } else if (number > 1000) {
      return (number / 1000).toString() + "Rb";
    } else {
      return number.toString();
    }
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#FF7E5A",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">Tahun {label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Anggaran : Rp ${payload[0].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
          <p
            className="desc"
            style={{ color: payload[1].color }}
          >{`Realisasi : Rp ${payload[1].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
        </div>
      );
    }

    return null;
  };
  let nameColumn = [
    {
      label: "Tahun",
      value: "tahun",
    },
    {
      label: "Anggaran",
      value: "anggaran",
    },
    {
      label: "Realisasi",
      value: "realisasi",
    },
  ];
  return (
    <div ref={inputRef}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        Anggaran & Realisasi (Satuan 1 Juta)
      </h2>
      <div className={classes.barChart}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            padding={{
              top: 15,
              right: 10,
              left: 10,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun"></XAxis>
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai Satuan 1 Juta"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="anggaran" fill="#8884d8" />
            <Bar dataKey="realisasi" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {nameColumn && nameColumn.length != 0 ? (
        <>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {nameColumn.map((item, i) => {
                    return (
                      <StyledTableCell align="center">
                        {item.label}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.tahun}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.tahun}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Rp{" "}
                      {row.anggaran
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Rp{" "}
                      {row.realisasi
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
      <Typography
        className={classes.isiContentTextStyle}
        variant="h2"
        wrap
        style={{ paddingTop: 20 }}
      >
        {comment && comment.lastComment ? comment.lastComment.analisisData : ""}
      </Typography>
      <Typography
        className={classes.isiContentTextStyle}
        variant="h2"
        wrap
        style={{ paddingTop: 20, fontSize: 18, fontWeight: "600" }}
      >
        Histori Analisis Data
      </Typography>
      <List className={classes.rootList}>
        {comment.listTop10Comment && comment.listTop10Comment.length != 0
          ? comment.listTop10Comment.map((history, i) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={moment(new Date(history.commentDate)).format(
                        "DD MMM YYYY - HH:mm"
                      )}
                      secondary={
                        <React.Fragment>
                          {history.analisisData.replace(/<[^>]+>/g, "")}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider
                    component="li"
                    style={{ marginLeft: 20, marginRight: 20 }}
                  />
                </>
              );
            })
          : null}
      </List>
    </div>
  );
};

ComponentPrint.propTypes = {
  data: PropTypes.array,
  comment: PropTypes.object,
};

export default ComponentPrint;
