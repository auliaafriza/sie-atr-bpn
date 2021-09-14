import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ComposedChart,
  Line,
  Area,
  Scatter,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LineChart,
  AreaChart,
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
  const title = location.state.title;
  const columnTable = location.state.columnTable;
  const grafik = location.state.grafik;
  const nameColumn = location.state.nameColumn;
  const grafikView = location.state.grafikView;
  const axis = location.state.axis;

  useEffect(() => {
    let timer = setTimeout(() => window.print(), 2 * 1000);
    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let NamaBulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

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
          {nameColumn.map((item, i) => {
            return item.isLabel ? (
              <p className="label">
                {item.label} {label}
              </p>
            ) : (
              <p className="desc" style={{ color: payload[i - 1].color }}>
                {item.isFixed
                  ? `${item.label} : ${payload[0].value}`
                  : `${item.label} : Rp ${payload[i - 1].value
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
              </p>
            );
          })}
        </div>
      );
    }

    return null;
  };

  const CustomX = (data) => {
    return axis.xAxis == "bulan" && isFinite(data) ? NamaBulan[data + 1] : data;
  };
  const DataFormaterX = (value) => {
    return value.replace("Kantor Wilayah Provinsi ", "");
  };

  return (
    <div ref={inputRef}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {title}
      </h2>
      <div className={classes.barChart}>
        {" "}
        <ResponsiveContainer width="100%" height={250}>
          {grafik.toLowerCase() == "bar" ? (
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
              <XAxis dataKey={axis.xAxis}></XAxis>
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value={axis.yAxis}
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Legend />
              {grafikView.map((grafikItem, i) => {
                return (
                  <Bar dataKey={grafikItem.dataKey} fill={grafikItem.fill} />
                );
              })}
            </BarChart>
          ) : grafik == "barGroup" ? (
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
              <XAxis dataKey={axis.xAxis}></XAxis>
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value={axis.yAxis}
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Legend />
              {grafikView.map((grafikItem, i) => {
                return (
                  <Bar
                    dataKey={grafikItem.dataKey}
                    stackId="a"
                    fill={grafikItem.fill}
                  />
                );
              })}
            </BarChart>
          ) : grafik == "barStack" ? (
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
              <XAxis dataKey={axis.xAxis}></XAxis>
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value={axis.yAxis}
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Legend />
              {grafikView.map((grafikItem, i) => {
                return (
                  <Bar
                    dataKey={grafikItem.dataKey}
                    stackId="a"
                    fill={grafikItem.fill}
                  />
                );
              })}
            </BarChart>
          ) : grafik.toLowerCase() == "line" ? (
            <LineChart
              width={500}
              height={800}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={axis.xAxis}
                angle={60}
                interval={0}
                tick={{
                  // angle: 90,
                  transform: "rotate(-35)",
                  textAnchor: "start",
                  dominantBaseline: "ideographic",
                  fontSize: 14,
                }}
                height={100}
                tickFormatter={CustomX}
              />
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value={axis.yAxis}
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Legend />
              {grafikView.map((grafikItem, i) => {
                return (
                  <Line
                    type="monotone"
                    dataKey={grafikItem.dataKey}
                    stroke={grafikItem.fill}
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                );
              })}
            </LineChart>
          ) : grafik.toLowerCase() == "area" ? (
            <AreaChart
              width={500}
              height={800}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {" "}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={axis.xAxis}
                angle={60}
                interval={0}
                tick={{
                  // angle: 90,
                  transform: "rotate(-35)",
                  textAnchor: "start",
                  dominantBaseline: "ideographic",
                  fontSize: 14,
                }}
                height={100}
                tickFormatter={CustomX}
              />
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value={axis.yAxis}
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Legend />
              {grafikView.map((grafikItem, i) => {
                return (
                  <Area
                    type="monotone"
                    dataKey={grafikItem.dataKey}
                    stroke={grafikItem.fill}
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                );
              })}
            </AreaChart>
          ) : (
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="wilayah"
                scale="band"
                angle={60}
                interval={0}
                tick={{
                  // angle: 90,
                  transform: "rotate(-35)",
                  textAnchor: "start",
                  dominantBaseline: "ideographic",
                  fontSize: 8,
                }}
                height={100}
                tickFormatter={DataFormaterX}
              />
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value="Jumlah Nilai PNBP dan berkas"
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Legend />
              <Bar dataKey="pnbp" barSize={20} fill="#413ea0" />
              <Line
                type="jumlahberkas"
                dataKey="jumlahberkas"
                stroke="#ff7300"
              />
            </ComposedChart>
          )}
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
                {data.map((row, i) => (
                  <StyledTableRow key={i}>
                    {columnTable.map((item) => {
                      return item.isFixed ? (
                        <StyledTableCell align="center">
                          Rp{" "}
                          {row[item.label]
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </StyledTableCell>
                      ) : axis.xAxis == "bulan" && isFinite(item.label) ? (
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {NamaBulan[row[item.label] + 1]}
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row[item.label]}
                        </StyledTableCell>
                      );
                    })}
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
