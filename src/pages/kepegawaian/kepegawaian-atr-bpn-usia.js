import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { IoEye, IoPrint } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { tahunData } from "../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const dataTemp = [
  {
    usia: "",
    jml_pegawai: 0,
  },
  {
    usia: "",
    jml_pegawai: 0,
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

let nameColumn = [
  {
    label: "Usia",
    value: "usia",
  },
  {
    label: "Jumlah Pegawai",
    value: "jml_pegawai",
  },
];

const KepegawaianBpnUsia = () => {
  const classes = styles();
  const [years, setYears] = useState("2022");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [tahunAwal, setTahunAwal] = useState("2017");
  const [kanwil, setKanwil] = useState("");
  const [kantor, setKantor] = useState("");
  const [satker, setSatker] = useState("");
  const [kanwilDis, setKanwilDis] = useState("");
  const [kantorDis, setKantorDis] = useState("");
  const [satkerDis, setSatkerDis] = useState("");

  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    grafik: [],
    dataTable: "",
    analisis: "",
    type: "",
    listTop10Comment: [],
  });
  const inputRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const satkerRed = useSelector((state) => state.globalReducer.satker);
  const kantorRed = useSelector((state) => state.globalReducer.kantor);
  const kanwilRed = useSelector((state) => state.globalReducer.kanwil);

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
        `${url}Kepegawaian/Pegawai/sie_pegawai_atr_bpn_usia?tahunAwal=${tahunAwal}&tahunAkhir=${years}&kantor=${kantor}&kanwil=${kanwil}&satker=${satker}`
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

  const handleChangeAwal = (event) => {
    setTahunAwal(event.target.value);
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">Usia {label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Jumlah Pegawai : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Jumlah Pegawai berdasarkan Usia",
      data,
      ".xlsx"
    );
  };

  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
  });

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {dataModal.title}
      </h2>
      <div className={classes.barChart}>
        <ResponsiveContainer width="100%" height={250}>
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
            <XAxis dataKey="usia"></XAxis>
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
            <Bar dataKey="jml_pegawai" fill="#F0E68C" />
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
                {dataModal.grafik
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.usia}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.usia}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.jml_pegawai}
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

  const testbla = () => {
    // window.open("/PrintPNBPJumlah PegawaiRealisasi")
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
      },
      target: "_blank",
    });
  };

  const handleChangeKantor = (event) => {
    let temp =
      event.target.value.length > 10
        ? event.target.value.slice(0, 10)
        : event.target.value;
    setKantorDis(temp);
    setKantor(event.target.value);
  };

  const handleChangeKanwil = (event) => {
    setKanwilDis(
      event.target.value.length > 10
        ? event.target.value.slice(0, 10)
        : event.target.value
    );
    setKanwil(event.target.value);
  };

  const handleChangeSatket = (event) => {
    setSatkerDis(
      event.target.value.length > 10
        ? event.target.value.slice(0, 10)
        : event.target.value
    );
    setSatker(event.target.value);
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
        <Grid item xs={6}>
          <Typography className={classes.titleSection} variant="h2">
            Jumlah Pegawai berdasarkan Usia
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
          {/* <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => inputRef.current}
          /> */}
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
                    title: "Jumlah Pegawai berdasarkan Usia ",
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
                    listTop10Comment: comment.listTop10Comment,
                  })
                }
              >
                <IoEye />
              </IconButton>
            </TooltipMI>
            {/* <ReactToPrint
              trigger={() => (
                <TooltipMI title="Print Data" placement="top">
                  <IconButton aria-label="delete" size="small">
                    <IoPrint />
                  </IconButton>
                </TooltipMI>
              )}
              content={inputRef.current}
            > */}
            <TooltipMI
              title="Print Data"
              placement="top"
              onClick={() => testbla()}
            >
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
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Tahun Awal
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tahun Awal
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={tahunAwal}
                    onChange={handleChangeAwal}
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
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Tahun Akhir
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tahun Akhir
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={years}
                    onChange={handleChange}
                    label="Bulan"
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
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Satker
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Satker
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={satkerDis}
                    onChange={handleChangeSatket}
                    label="Satker"
                    className={classes.selectStyle}
                  >
                    {satkerRed && satkerRed.length != 0
                      ? satkerRed.map((item, i) => {
                          return (
                            <MenuItem value={item.satker} key={i}>
                              {item.satker}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kantor
                </Typography>
                {/* <Autocomplete
                  id="combo-box-demo"
                  options={kantorRed}
                  getOptionLabel={(option) => option.kantor}
                  className={classes.selectStyle}
                  renderInput={(params) => (
                    <TextField {...params} label="Kantor" variant="outlined" />
                  )}
                /> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Kantor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={kantorDis}
                    onChange={handleChangeKantor}
                    label="Kantor"
                    className={classes.selectStyle}
                  >
                    {kantorRed && kantorRed.length != 0
                      ? kantorRed.map((item, i) => {
                          return (
                            <MenuItem value={item.kantor} key={i}>
                              {item.kantor}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kanwil
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Kanwil
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={kanwilDis}
                    onChange={handleChangeKanwil}
                    label="Kanwil"
                    className={classes.selectStyle}
                  >
                    {kanwilRed && kanwilRed.length != 0
                      ? kanwilRed.map((item, i) => {
                          return (
                            <MenuItem value={item.kanwil} key={i}>
                              {item.kanwil}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={4}
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
                      title: "Jumlah Pegawai berdasarkan Usia ",
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
                    <XAxis dataKey="usia" />
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
                    <Bar dataKey="jml_pegawai" fill="#F0E68C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default KepegawaianBpnUsia;