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
  Checkbox,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { IoEye, IoPrint, IoCopySharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  tahunDataV2,
  DataFormater,
  deleteDuplicates,
} from "../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../config/embed_conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../../api/apiClient";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getKantorPNBP, getWilayahPNBP } from "../../actions/pnbpAction";
import { isMobile } from "react-device-detect";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataTemp = [
  {
    golongan: "",
    jumlah: 0,
  },
  {
    golongan: "",
    jumlah: 0,
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

let nameColumn = [
  {
    label: "Golongan",
    value: "golongan",
    isFixed: false,
    isLabel: false,
  },
  {
    label: "Jumlah Pegawai",
    value: "jumlah",
    isFixed: false,
    isLabel: false,
  },
];

let columnTable = [
  {
    label: "golongan",
    isFixed: false,
  },
  {
    label: "jumlah",
    isFixed: false,
  },
];

let grafikView = [
  {
    dataKey: "jumlah",
    fill: "#C71585",
  },
];

let axis = {
  xAxis: "golongan",
  yAxis: "Jumlah Pegawai",
};

const KepegawaianBpnGol = () => {
  const classes = styles();
  const [years, setYears] = useState({ label: "2022", name: 2022 });
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [tahunAwal, setTahunAwal] = useState({ label: "2017", name: 2017 });
  const [kanwil, setKanwil] = useState({ kanwil: "" });
  const [kantor, setKantor] = useState({ kantor: "" });
  const [satker, setSatker] = useState({ satker: "" });
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    grafik: [],
    dataTable: "",
    analisis: "",
    type: "",
    listTop10Comment: [],
  });

  const [openWilayah, setOpenWilayah] = useState(false);
  const [openKantah, setOpenKantah] = useState(false);
  const [openTahunAkhir, setOpenTahunAkhir] = useState(false);
  const [openTahun, setOpenTahun] = useState(false);
  const inputRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataKantor, setDataKantor] = useState([]);
  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const berkasPnbpKantor = useSelector((state) => state.pnbp.kantorPnbp);
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState([]);
  const [dataFilterKantor, setDataFilterKantor] = useState([]);

  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getListKantor = (temp) => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(`${url}MasterData/filter_kantor`, temp)
      .then(function (response) {
        setDataKantor(response.data.data.length != 0 ? response.data.data : []);
      })
      .catch(function (error) {
        setDataKantor([]);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const findAll = (data, index) => {
    let found = data.find(
      (element) =>
        element[index] &&
        (element[index].toLowerCase() == "pilih semua" || element[index] == "-")
    );
    return found ? false : true;
  };

  const findIndex = (data, index) => {
    let found =
      data && data.length != 0
        ? data.findIndex(
            (element) =>
              element[index] &&
              (element[index].toLowerCase() == "pilih semua" ||
                element[index] == "-")
          )
        : -1;
    return found;
  };

  const handleChangeFilter = (event) => {
    if (event.length != 0) {
      let temp = { kodeWilayah: [] };
      let findTemp =
        event && event.length != 0 ? findAll(event, "kanwil") : false;
      let indexTemp = findIndex(event, "kanwil");
      findTemp
        ? event.map((item) => temp.kodeWilayah.push(item.kode))
        : temp.kodeWilayah.push(event[indexTemp]);
      getListKantor(findTemp ? temp : []);
      let res = findTemp ? deleteDuplicates(event, "kode") : [event[indexTemp]];
      setDataFilter(res);
      setDataFilterKantor([]);
    } else {
      setDataFilter([]);
    }
  };

  const handleChangeFilterKantor = (event) => {
    if (event.length != 0) {
      let findTemp =
        event && event.length != 0 ? findAll(event, "kantor") : false;
      let indexTemp = findIndex(event, "kantor");
      let res = findTemp ? deleteDuplicates(event, "kode") : [event[indexTemp]];
      setDataFilterKantor(res);
    } else {
      setDataFilterKantor([]);
    }
  };

  const getData = () => {
    let temp = { kantor: [], kanwil: [] };
    let foundData =
      dataFilterKantor && dataFilterKantor.length != 0
        ? findAll(dataFilterKantor, "kantor")
        : false;
    foundData
      ? dataFilterKantor.map((item) => temp.kantor.push(item.kantor))
      : [];
    let foundDataKanwil =
      dataFilter && dataFilter.length != 0
        ? findAll(dataFilter, "kanwil")
        : false;
    foundDataKanwil
      ? dataFilter.map((item) => temp.kanwil.push(item.kanwil))
      : [];

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Kepegawaian/Pegawai/sie_pegawai_atr_bpn_golongan?tahunAwal=${
          tahunAwal ? tahunAwal.name : ""
        }&tahunAkhir=${years ? years.name : ""}`,
        temp
      )
      .then(function (response) {
        setData(response.data.data);
        setComment(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        setData([]);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    dispatch(getWilayahPNBP());
    let temp = { kodeWilayah: [] };
    dataFilter &&
      dataFilter.length != 0 &&
      dataFilter.map((item) => temp.kodeWilayah.push(item.kode));
    getListKantor(temp);
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event);
  };

  const handleChangeAwal = (event) => {
    setTahunAwal(event);
  };

  const handleChangeKantor = (event) => {
    setKantor(event);
  };

  const handleChangeKanwil = (event) => {
    setKanwil(event);
  };

  const handleChangeSatket = (event) => {
    setSatker(event);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">Golongan {label}</p>
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
      "Jumlah Pegawai berdasarkan Golongan ",
      data,
      ".xlsx"
    );
  };

  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
  });

  const [iframeIsOpen, setOpenIframe] = useState(false);
  const [iframeWidth, setIframeWidth] = useState(600);
  const [iframeHeight, setIframeHeight] = useState(600);

  function handleIframe(status) {
    setOpenIframe(status);
  }

  function handleIframeWidth(e) {
    // alert(e.target.value + "");
    setIframeWidth(e.target.value);
  }

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
            <XAxis dataKey="golongan"></XAxis>
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Jumlah Pegawaai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="jumlah" fill="#C71585" name="Jumlah Pegawai" />
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
                    <StyledTableRow key={row.golongan}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.golongan}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.jumlah}
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
                          {history.analisisData.replace(
                            /<[^>]+>|&amp|&amp!|&nbsp/g,
                            ""
                          )}
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
  const handlePrintData = (title, columnTable) => {
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
        columnTable: columnTable,
        title: title,
        grafik: "bar",
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
        open={iframeIsOpen}
        // onClose={handleClose}
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
        <div className={classes.paper}>
          <Grid
            container
            spacing={2}
            direction="row"
            style={
              {
                // padding: 10,
                // paddingTop: 20,
                // paddingBottom: 5,
              }
            }
          >
            <Grid
              container
              direction="row"
              // justifyContent="flex-center"
              alignItems="flex-start"
              item
              xs={10}
            >
              <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
                Embeded Code Generator
              </h2>
            </Grid>
            <Grid
              container
              direction="row"
              // justifyContent="flex-center"
              alignItems="flex-start"
              item
              xs={1}
            >
              <CopyToClipboard
                text={
                  '<iframe width="' +
                  iframeWidth +
                  '" height="' +
                  iframeHeight +
                  '"' +
                  ' src="' +
                  BASE_URL.domain +
                  "/embed/" +
                  BASE_URL.path.kepegawaian_bpn_gol +
                  '"></iframe>'
                }
                onCopy={() => toast.success("success copied to clipboard!")}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: 30, width: "100%" }}
                >
                  Copy
                </Button>
              </CopyToClipboard>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Grid>
            <Grid
              container
              direction="row"
              // justifyContent="flex-center"
              alignItems="flex-start"
              item
              xs={1}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenIframe(false)}
                style={{ height: 30, width: "100%" }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            style={{
              // padding: 10,
              // paddingTop: 20,
              paddingBottom: 5,
            }}
          >
            <Grid
              container
              direction="row"
              // justifyContent="flex-center"
              alignItems="flex-start"
              item
              xs={10}
            >
              <textarea
                style={{ width: "100%" }}
                rows={3}
                value={
                  '<iframe width="' +
                  iframeWidth +
                  '" height="' +
                  iframeHeight +
                  '"' +
                  ' src="' +
                  BASE_URL.domain +
                  "/embed/" +
                  BASE_URL.path.kepegawaian_bpn_gol +
                  '"></iframe>'
                }
              />
            </Grid>
            <Grid
              container
              direction="row"
              // justifyContent="flex-start"
              alignItems="flex-start"
              item
              xs={2}
            >
              <Grid
                container
                direction="row"
                // justifyContent="flex-start"
                alignItems="flex-start"
                item
              >
                <Grid
                  direction="row"
                  // justifyContent="flex-end"
                  alignItems="flex-center"
                  item
                  xs={4}
                >
                  width
                </Grid>
                <Grid
                  direction="row"
                  // justifyContent="flex-end"
                  alignItems="flex-center"
                  item
                  xs={8}
                >
                  <input
                    type="number"
                    value={iframeWidth}
                    style={{ width: "100%" }}
                    onChange={(e) => setIframeWidth(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                // justifyContent="flex-start"
                alignItems="flex-start"
                item
              >
                <Grid
                  direction="row"
                  // justifyContent="flex-end"
                  alignItems="flex-center"
                  item
                  xs={4}
                >
                  height
                </Grid>
                <Grid
                  direction="row"
                  // justifyContent="flex-end"
                  alignItems="flex-center"
                  item
                  xs={8}
                >
                  <input
                    type="number"
                    value={iframeHeight}
                    style={{ width: "100%" }}
                    onChange={(e) => setIframeHeight(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction="row"
            style={{
              // padding: 10,
              // paddingTop: 20,
              paddingBottom: 5,
            }}
          >
            <iframe
              width={iframeWidth}
              height={iframeHeight}
              src={
                BASE_URL.domain + "/embed/" + BASE_URL.path.kepegawaian_bpn_gol
              }
            ></iframe>
          </Grid>
        </div>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        // className={classes.modalStyle1}
        style={{
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
        <Grid item xs={isMobile ? 12 : 6}>
          <Typography className={classes.titleSection} variant="h2">
            Jumlah Pegawai berdasarkan Golongan
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent={isMobile ? "flex-start" : "flex-end"}
          alignItems={isMobile ? "flex-start" : "flex-end"}
          item
          xs={isMobile ? 12 : 6}
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
            <TooltipMI title="Embed Iframe" placement="top">
              <IconButton
                size="small"
                onClick={() => {
                  handleIframe(true);
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
                    title: "Jumlah Pegawai berdasarkan Golongan ",
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
              onClick={() =>
                handlePrintData(
                  "Jumlah Pegawai berdasarkan Golongan",
                  columnTable
                )
              }
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
        <Grid item xs={isMobile ? 12 : 3}>
          <div style={{ margin: 10, marginRight: 25 }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Tahun Awal
                </Typography>
                <Autocomplete
                  id="tahun"
                  open={openTahun}
                  onOpen={() => {
                    setOpenTahun(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenTahun(false)
                      : setOpenTahun(true)
                  }
                  name="tahun"
                  style={{ width: "100%", height: 50 }}
                  options={tahunDataV2}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  onChange={(event, newValue) => {
                    handleChangeAwal(newValue);
                  }}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setOpenTahun(true);
                    else {
                      setOpenTahun(false);
                    }
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>{option.label}</React.Fragment>
                  )}
                  value={tahunAwal}
                  defaultValue={tahunAwal}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={"Pilih Tahun"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Tahun Akhir
                </Typography>
                <Autocomplete
                  id="tahun"
                  open={openTahunAkhir}
                  onOpen={() => {
                    setOpenTahunAkhir(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenTahunAkhir(false)
                      : setOpenTahunAkhir(true)
                  }
                  name="tahun"
                  style={{ width: "100%", height: 50 }}
                  options={tahunDataV2}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  onChange={(event, newValue) => {
                    handleChange(newValue);
                  }}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setOpenTahunAkhir(true);
                    else {
                      setOpenTahunAkhir(false);
                    }
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>{option.label}</React.Fragment>
                  )}
                  value={years}
                  defaultValue={years}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={"Pilih Tahun"}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Satker
                </Typography>
                <Autocomplete
                  id="satker"
                  name="satker"
                  style={{ width: "100%", height: 50 }}
                  options={satkerRed}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeSatket(newValue);
                  }}
                  getOptionLabel={(option) => option.satker || ""}
                  defaultValue={satker}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={satker ? "" : "Satker"}
                    />
                  )}
                />
              </Grid> */}

              <Grid item xs={12}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Wilayah
                </Typography>
                <Autocomplete
                  multiple
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 50 }}
                  options={berkasPnbpWilayah}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeFilter(newValue);
                  }}
                  open={openWilayah}
                  onOpen={() => {
                    setOpenWilayah(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenWilayah(false)
                      : setOpenWilayah(true)
                  }
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") {
                      setOpenWilayah(true);
                      setHideText(true);
                    } else {
                      setOpenWilayah(false);
                      setHideText(false);
                    }
                  }}
                  getOptionDisabled={(options) =>
                    dataFilter.length >= 32 ? true : false
                  }
                  getOptionLabel={(option) => option.kanwil || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          dataFilter && dataFilter.length != 0
                            ? findAll(dataFilterKantor, "kanwil")
                              ? dataFilter
                                  .map((item) => item.kanwil)
                                  .indexOf(option.kanwil) > -1
                              : true
                            : false
                        }
                      />
                      {option.kode}
                      {"  "}
                      {option.kanwil}
                    </React.Fragment>
                  )}
                  renderTags={(selected) => {
                    return selected.length != 0
                      ? hideText
                        ? ""
                        : findAll(selected, "kanwil")
                        ? `${selected.length} Terpilih`
                        : "Semua Terpilih"
                      : "";
                  }}
                  value={dataFilter}
                  defaultValue={dataFilter}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={
                        dataFilter.length != 0 ? "" : "Pilih Wilayah"
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kantor
                </Typography>
                <Autocomplete
                  multiple
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 50 }}
                  options={dataKantor}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeFilterKantor(newValue);
                  }}
                  open={openKantah}
                  onOpen={() => {
                    setOpenKantah(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenKantah(false)
                      : setOpenKantah(true)
                  }
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") {
                      setOpenKantah(true);
                      setHideTextKantor(true);
                    } else {
                      setOpenKantah(false);
                      setHideTextKantor(false);
                    }
                  }}
                  getOptionDisabled={(options) =>
                    dataFilterKantor.length >= 32 ? true : false
                  }
                  getOptionLabel={(option) => option.kantor || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          dataFilterKantor && dataFilterKantor.length != 0
                            ? findAll(dataFilter, "kantor")
                              ? dataFilterKantor
                                  .map((item) => item.kantor)
                                  .indexOf(option.kantor) > -1
                              : true
                            : false
                        }
                      />
                      {option.kode}
                      {"  "}
                      {option.kantor}
                    </React.Fragment>
                  )}
                  renderTags={(selected) => {
                    return selected.length != 0
                      ? hideTextKantor
                        ? ""
                        : findAll(selected, "kantor")
                        ? `${selected.length} Terpilih`
                        : "Semua Terpilih"
                      : "";
                  }}
                  value={dataFilterKantor}
                  defaultValue={dataFilterKantor}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={
                        dataFilterKantor.length != 0 ? "" : "Pilih Kantor"
                      }
                    />
                  )}
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={12}
                style={{ paddingLeft: 20 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getData()}
                  style={{ height: 57, width: "100%", fontSize: 12 }}
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
                    .replace(/<[^>]+>|&amp|&amp!|&nbsp/g, "")
                    .slice(0, 500)
                : ""}
              {comment &&
              comment.lastComment &&
              comment.lastComment.analisisData.length > 100 ? (
                <Link
                  href="#"
                  onClick={() =>
                    handleOpen({
                      title: "Jumlah Pegawai berdasarkan Golongan ",
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
        <Grid item xs={isMobile ? 12 : 9} style={{ margin: isMobile ? 20 : 0 }}>
          <Card
            className={isMobile ? classes.rootMobile : classes.root}
            variant="outlined"
          >
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
                    <XAxis dataKey="golongan" />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Jumlah Pegawaai"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="jumlah"
                      fill="#C71585"
                      name="Jumlah Pegawai"
                    />
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

export default KepegawaianBpnGol;
