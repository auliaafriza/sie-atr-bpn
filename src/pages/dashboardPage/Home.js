import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
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
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { IoEye, IoPrint } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";
import { getPaguMp, getAnggaranRealisasi } from "../../actions/dashActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const dataTempAsset = [
  {
    tahun: "2021",
    anggaran: 0,
    relasisasi: 0,
  },
  {
    tahun: "2020",
    anggaran: 0,
    relasisasi: 0,
  },
];

const dataTempPagu = [
  {
    tahun: "2021",
    pagu: 0,
    mp: 0,
  },
  {
    tahun: "2020",
    pagu: 0,
    mp: 0,
  },
];

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

const DashHome = () => {
  const classes = styles();
  const [years, setYears] = useState("");
  const [anggaranRealisasi, setAanggaranRealisasi] = useState(dataTempAsset);
  const [paguMp, setPaguMp] = useState(dataTempPagu);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    grafik: "",
    dataTable: "",
    analisis: "",
    type: "",
    nameColumn: [],
  });

  const handleOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const dispatch = useDispatch();
  // const paguMpRed = useSelector((state) => state.dashReducer.paguMp);
  // const anggaranRealisasiRed = useSelector(
  //   (state) => state.dashReducer.anggaranRealisasi
  // );

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}Aset&Keuangan/PNBP/1.1.8`)
      .then(function (response) {
        setPaguMp(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(`${url}Aset&Keuangan/PNBP/1.1.3`)
      .then(function (response) {
        setAanggaranRealisasi(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(
        `${url}api/Comment/GetLastCommantByReportId?reportId=4169f628-00ab-4307-a715-f838eac47983`
      )
      .then(function (response) {
        setComment(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
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

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {dataModal.title}
      </h2>
      {dataModal.type ? (
        <div className={classes.barChart}>
          <ResponsiveContainer width="100%" height={250}>
            {dataModal.type == "Bar" ? (
              <BarChart
                width={500}
                height={300}
                data={dataModal.grafik}
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
                <XAxis dataKey="tahun" />
                <YAxis tickFormatter={DataFormater}>
                  <Label
                    value="Nilai Satuan 1 Juta"
                    angle={-90}
                    position="insideBottomLeft"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="anggaran" fill="#8884d8" />
                <Bar dataKey="realisasi" fill="#82ca9d" />
              </BarChart>
            ) : (
              <LineChart
                width={500}
                height={300}
                data={dataModal.grafik}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tahun" />
                <YAxis tickFormatter={DataFormater}>
                  <Label
                    value="Nilai Satuan 1 Juta"
                    angle={-90}
                    position="insideBottomLeft"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pagu"
                  stroke="#6EB5FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="mp"
                  stroke="#FCB9AA"
                  strokeWidth={3}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : null}
      {dataModal.nameColumn && dataModal.nameColumn.length != 0 ? (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {dataModal.nameColumn.map((item) => (
                  <StyledTableCell align="center">{item}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataModal.grafik.map((row) => (
                <StyledTableRow key={row.tahun}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.tahun}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rp{" "}
                    {row.anggaran
                      ? row.anggaran
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : row.pagu.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rp{" "}
                    {row.realisasi
                      ? row.realisasi
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : row.mp.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <p id="simple-modal-description">{dataModal.analisis}</p>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
        <Grid item xs={6}>
          <Typography className={classes.titleSection} variant="h2">
            Anggaran & Realisasi (Satuan 1 Juta)
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          item
          xs={6}
        >
          <ButtonGroup
            aria-label="outlined button group"
            className={classes.buttonGroupStyle}
            variant="contained"
          >
            <TooltipMI title="Lihat Detail" placement="top">
              <IconButton
                size="small"
                onClick={() =>
                  handleOpen({
                    title: "Anggaran & Realisasi (Satuan 1 Juta)",
                    grafik: anggaranRealisasi,
                    dataTable: "",
                    analisis: comment ? comment.analisisData : "",
                    type: "Bar",
                    nameColumn: ["Tahun", "Anggaran", "Realisasi"],
                  })
                }
              >
                <IoEye />
              </IconButton>
            </TooltipMI>
            <TooltipMI
              title="Print Data"
              placement="top"
              onClick={() => window.print()}
            >
              <IconButton aria-label="delete" size="small">
                <IoPrint />
              </IconButton>
            </TooltipMI>
            <TooltipMI title="Unduh Data" placement="top">
              <IconButton aria-label="delete" size="small">
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
            <Typography className={classes.isiTextStyle} variant="h2">
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
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
            >
              {comment ? comment.analisisData : ""}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    width={500}
                    height={300}
                    data={anggaranRealisasi}
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
                    <XAxis dataKey="tahun" />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Nilai Satuan 1 Juta"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="anggaran" fill="#8884d8" />
                    <Bar dataKey="realisasi" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box
        style={{
          backgroundColor: "rgba(107,111,130,0.2)",
          marginTop: 20,
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 5,
          }}
        >
          <Grid item xs={6}>
            <Typography className={classes.titleSection} variant="h2">
              Pagu & MP PNBP (Satuan 1 Juta)
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            item
            xs={6}
          >
            <ButtonGroup
              aria-label="outlined button group"
              className={classes.buttonGroupStyle}
              variant="contained"
            >
              <TooltipMI title="Lihat Detail" placement="top">
                <IconButton
                  size="small"
                  onClick={() =>
                    handleOpen({
                      title: "Pagu & MP PNBP (Satuan 1 Juta)",
                      grafik: paguMp,
                      dataTable: "",
                      analisis: comment ? comment.analisisData : "",
                      type: "Line",
                      nameColumn: ["Tahun", "Pagu", "MP"],
                    })
                  }
                >
                  <IoEye />
                </IconButton>
              </TooltipMI>
              <TooltipMI
                title="Print Data"
                placement="top"
                onClick={() => window.print()}
              >
                <IconButton aria-label="delete" size="small">
                  <IoPrint />
                </IconButton>
              </TooltipMI>
              <TooltipMI title="Unduh Data" placement="top">
                <IconButton aria-label="delete" size="small">
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
        <Grid container>
          <Grid item xs={7}>
            <Card className={classes.rootOdd} variant="outlined">
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      width={500}
                      height={300}
                      data={paguMp}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Nilai Satuan 1 Juta"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pagu"
                        stroke="#6EB5FF"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="mp"
                        stroke="#FCB9AA"
                        strokeWidth={3}
                      />
                    </LineChart>
                    {/* <LineChart
                      width={500}
                      height={300}
                      data={paguMp}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis yAxisId="left" tickFormatter={DataFormater}>
                        <Label
                          value="Nilai Satuan 1 Juta"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={DataFormater}
                        label="Nilai"
                      >
                        <Label
                          value="Nilai Satuan 1 Juta"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={0}
                        />
                      </YAxis>
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="pagu"
                        stroke="#6EB5FF"
                        activeDot={{ strokeWidth: 3, r: 5 }}
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="mp"
                        stroke="#FCB9AA"
                        activeDot={{ strokeWidth: 3 }}
                        strokeWidth={3}
                      />
                    </LineChart> */}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ marginRight: 25 }}>
              <Typography className={classes.isiTextStyle} variant="h2">
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
              <Typography
                className={classes.isiContentTextStyle}
                variant="h2"
                wrap
              >
                {comment ? comment.analisisData : ""}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashHome;
