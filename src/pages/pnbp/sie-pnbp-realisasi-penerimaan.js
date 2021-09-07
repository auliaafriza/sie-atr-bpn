import React, { useState, useEffect, createRef } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
} from "recharts";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Card,
  ButtonGroup,
  IconButton,
  Box,
  CardContent,
  Tooltip as TooltipMI,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TablePagination,
  Button,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { IoEye, IoPrint, IoCopySharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";
import axios from "axios";
import { useScreenshot } from "use-react-screenshot";
import html2canvas from "html2canvas";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
const dataTemp = [
  {
    bulan: "1",
    persentase_realisasi: 0,
  },
  {
    bulan: "2",
    persentase_realisasi: 0,
  },
];

let nameColumn = [
  {
    label: "Bulan",
    value: "bulan",
    isFixed: false,
    isLabel: true,
  },
  {
    label: "Persentase Realisasi",
    value: "persentase_realisasi",
    isFixed: false,
    isLabel: true,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Quicksand"',
      "Georgia",
      '"Times New Roman"',
      "Times",
      "serif",
    ].join(","),
  },
});

const tahunData = [
  { id: "2021", value: 2021 },
  { id: "2020", value: 2020 },
  { id: "2019", value: 2019 },
  { id: "2018", value: 2018 },
  { id: "2017", value: 2017 },
];

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

let url = "http://10.20.57.234/SIEBackEnd/";
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

const RealisasiPenerimaan = () => {
  const classes = styles();
  const [years, setYears] = useState("2021");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    grafik: "",
    dataTable: "",
    analisis: "",
    type: "",
    nameColumn: [],
    listTop10Comment: [],
  });
  const inputRef = createRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getImage = () => takeScreenshot(ref.current);
  const handleOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Aset&Keuangan/PNBP/sie_pnbp_persentase_realisasi_penerimaan?tahun=${years}`
      )
      .then(function (response) {
        setData(response.data.data);
        setComment(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
  };

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

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Persentase Realisasi penerimaan kumulatif bulanan",
      data,
      ".xlsx"
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    let bulan = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      " November",
      "Desember",
    ];
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">Bulan {bulan[payload[0].payload.bulan + 1]}</p>
          <p className="desc" style={{ color: payload[0].color }}>
            {`Persentase Realisasi : ${payload[0].value}`}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomX = (data) => {
    return NamaBulan[data + 1];
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {dataModal.title}
      </h2>
      {/* <Grid item xs={6}>
        <TooltipMI title="Screenshot modal" placement="top">
          <IconButton onClick={getImage}>
            <IoMdDownload />
          </IconButton>
        </TooltipMI>
      </Grid> */}

      <div className={classes.barChart}>
        {/* <img width={500} src={image} /> */}
        <ResponsiveContainer width="100%" height={250}>
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
              dataKey="bulan"
              // angle={60}
              // interval={0}
              tick={{
                // angle: 90,
                // transform: "rotate(-35)",
                // textAnchor: "start",
                // dominantBaseline: "ideographic",
                fontSize: 14,
              }}
              height={100}
              tickFormatter={CustomX}
            />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Persentase Realisasi"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Line
              type="monotone"
              dataKey="persentase_realisasi"
              stroke="#9EC1CF"
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {dataModal.nameColumn && dataModal.nameColumn.length != 0 ? (
        <>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {dataModal.nameColumn.map((item) => (
                    <StyledTableCell align="left">{item}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataModal.grafik
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.bulan}>
                      <StyledTableCell align="left" component="th" scope="row">
                        {NamaBulan[row.bulan + 1]}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.persentase_realisasi}%
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dataModal.grafik.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : null}
      <Typography
        className={classes.isiContentTextStyle}
        variant="h2"
        wrap
        style={{ paddingTop: 20 }}
      >
        {dataModal.analisis}
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
        {dataModal.listTop10Comment && dataModal.listTop10Comment.length != 0
          ? dataModal.listTop10Comment.map((history, i) => {
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

  const history = useHistory();

  let columnTable = [
    {
      label: "bulan",
      isFixed: false,
    },
    {
      label: "persentase_realisasi",
      isFixed: true,
    },
  ];

  let grafikView = [
    {
      dataKey: "persentase_realisasi",
      fill: "#9EC1CF",
    },
  ];

  let axis = {
    xAxis: "bulan",
    yAxis: "Persentase Realisasi",
  };
  const title = " Persentase Realisasi penerimaan kumulatif bulanan";
  const handlePrint = () => {
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
        columnTable: columnTable,
        title: title,
        grafik: "line",
        nameColumn: nameColumn,
        grafikView: grafikView,
        axis: axis,
      },
      target: "_blank",
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        // className={classes.modalStyle1}
        style={{
          // display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
          width: "90%",
          height: "98%",
          padding: "0 9em 0em 5em",
        }}
      >
        {body}
      </Modal>
      <Grid
        container
        spacing={2}
        direction="row"
        style={{ padding: 10, paddingTop: 20, paddingBottom: 5 }}
      >
        <Grid item xs={9}>
          <Typography className={classes.titleSection} variant="h2">
            Persentase Realisasi penerimaan kumulatif bulanan
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          item
          xs={3}
        >
          <ButtonGroup
            aria-label="outlined button group"
            className={classes.buttonGroupStyle}
            variant="contained"
          >
            <TooltipMI title="Embed Iframe" placement="top">
              <IconButton
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(
                    '<iframe width="500" height="500"' +
                      ' src="' +
                      BASE_URL.domain +
                      "/embed/" +
                      BASE_URL.path.pnbp_realisasi_anggaran +
                      '"></iframe>'
                  );
                  alert("code embeded berhasil dicopy");
                }}
              >
                <IoCopySharp />
              </IconButton>
            </TooltipMI>
            <TooltipMI title="Lihat Detail" placement="top">
              <IconButton
                size="small"
                onClick={() =>
                  handleOpen({
                    title: "Persentase Realisasi penerimaan kumulatif bulanan",
                    grafik: data,
                    dataTable: "",
                    analisis:
                      comment && comment.lastComment
                        ? comment.lastComment.analisisData.replace(
                            /<[^>]+>/g,
                            ""
                          )
                        : "",
                    type: "Bar",
                    nameColumn: ["Bulan", "Realisasi Persentase"],
                    listTop10Comment: comment.listTop10Comment,
                  })
                }
              >
                <IoEye />
              </IconButton>
            </TooltipMI>
            <TooltipMI title="Print Data" placement="top" onClick={handlePrint}>
              <IconButton aria-label="delete" size="small">
                <IoPrint />
              </IconButton>
            </TooltipMI>
            <TooltipMI
              title="Unduh Data"
              placement="top"
              onClick={() => exportData()}
            >
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => exportData()}
              >
                <IoMdDownload />
              </IconButton>
            </TooltipMI>
          </ButtonGroup>
        </Grid>
      </Grid>
      <div
        style={{
          borderTop: "0.5px solid #626e8261 ",
          width: "98%",
          margin: 10,
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{ margin: 10, marginRight: 25 }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Tahun
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tahun
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={years}
                    onChange={handleChange}
                    label="Tahun"
                    className={classes.selectStyle}
                  >
                    {tahunData.map((item, i) => {
                      return (
                        <MenuItem value={item.id} key={i}>
                          {item.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={6}
                style={{ paddingTop: 40, paddingLeft: 20 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getData()}
                  style={{ height: 57, width: "100%" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
            >
              {comment && comment.lastComment
                ? comment.lastComment.analisisData
                    .replace(/<[^>]+>/g, "")
                    .slice(0, 500)
                : ""}
              {comment &&
              comment.lastComment &&
              comment.lastComment.analisisData.length > 500 ? (
                <Link
                  href="#"
                  onClick={() =>
                    handleOpen({
                      title:
                        "Persentase Realisasi penerimaan kumulatif bulanan",
                      grafik: data,
                      dataTable: "",
                      analisis:
                        comment && comment.lastComment
                          ? comment.lastComment.analisisData.replace(
                              /<[^>]+>/g,
                              ""
                            )
                          : "",
                      type: "Bar",
                      nameColumn: ["Bulan", "Realisasi Persentase"],
                      listTop10Comment: comment.listTop10Comment,
                    })
                  }
                  variant="body2"
                >
                  {" "}
                  More
                </Link>
              ) : null}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
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
                      dataKey="bulan"
                      // angle={60}
                      // interval={0}
                      tick={{
                        // angle: 90,
                        // transform: "rotate(-35)",
                        // textAnchor: "start",
                        // dominantBaseline: "ideographic",
                        fontSize: 14,
                      }}
                      height={100}
                      tickFormatter={CustomX}
                    />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Persentase Realisasi"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Legend /> */}
                    <Line
                      type="monotone"
                      dataKey="persentase_realisasi"
                      stroke="#9EC1CF"
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RealisasiPenerimaan;
