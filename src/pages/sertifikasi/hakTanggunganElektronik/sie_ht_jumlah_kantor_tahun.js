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
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { IoEye, IoPrint, IoCopySharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./../styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  tahunDataV2,
  semesterData,
  bulanDataNumberic,
  deleteDuplicates,
} from "../../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
// import { getSatker } from "../../actions/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { generateOptions } from "../../../functionGlobal/generateOptionSelect";
import { BASE_URL } from "../../../config/embed_conf";
import { url } from "../../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CheckBoxOutlineBlank,
  CheckBox as CheckBoxIcon,
} from "@material-ui/icons/";
import { getWilayahPNBP } from "../../../actions/pnbpAction";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
import { getKantorPNBP } from "../../../actions/pnbpAction";
import { isMobile } from "react-device-detect";

const dataTemp = [
  {
    kantah: "",
    jumlah_ht: 0,
    nilai_ht: 0,
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

const listJenis = [
  { value: "kantah", label: "Kantah" },
  { value: "kanwil", label: "Kanwil" },
];

const listGroup = [
  { value: "Tanpa Berkas", label: "Tanpa Berkas" },
  { value: "Dengan Berkas", label: "Dengan Berkas" },
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

let nameColumn = [
  {
    label: "Kantah",
    value: "kantah",
    isLabel: true,
  },
  {
    label: "Jumlah Hak Tanggungan",
    value: "jumlah_ht",
  },
  {
    label: "Nilai Hak Tanggungan",
    value: "nilai_ht",
  },
];

let columnTable = [
  {
    label: "kantah",
    isFixed: false,
  },
  {
    label: "jumlah_ht",
    isFixed: false,
  },
  {
    label: "nilai_ht",
    isFixed: false,
  },
];

let grafikView = [
  {
    dataKey: "jumlah_ht",
    fill: "#8884d8",
    name: "Jumlah Hak Tanggungan",
  },
  {
    dataKey: "nilai_ht",
    fill: "#82ca9d",
    name: "Nilai Hak Tanggungan",
  },
];

let axis = {
  xAxis: "kantah",
  yAxis: "Hak Tanggungan",
};
const title = "Jumlah Hak Tanggungan Elektronik per Kantor";
const SieHtJumlahKantorTahun = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const berkasPnbpKantor = useSelector((state) => state.pnbp.kantorPnbp);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataFilterKantor, setDataFilterKantor] = useState([]);

  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);

  const [years, setYears] = useState({ label: "2021", name: 2021 });
  const [data, setData] = useState(dataTemp);
  const [semester, setSemester] = useState({
    value: "Tanpa Berkas",
    label: "Tanpa Berkas",
  });
  const [bulan, setBulan] = useState({ value: "kantah", label: "Kantah" });
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const [openTahun, setOpenTahun] = useState(false);
  const [openJenis, setOpenJenis] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
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

  const handleOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dataKantor, setDataKantor] = useState([]);

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

  const handleChangeFilter = (event) => {
    if (event.length != 0) {
      let temp = { kodeWilayah: [] };
      event.map((item) => temp.kodeWilayah.push(item.kode));
      getListKantor(temp);
      let res = deleteDuplicates(event, "kode");
      setDataFilter(res);
      setDataFilterKantor([]);
    } else {
      setDataFilter([]);
    }
  };

  const handleChangeFilterKantor = (event) => {
    if (event.length != 0) {
      let res = deleteDuplicates(event, "kode");
      setDataFilterKantor(res);
    } else {
      setDataFilterKantor([]);
    }
  };

  const getData = () => {
    let temp = { kantor: [], wilayah: [] };
    dataFilterKantor && dataFilterKantor.length != 0
      ? dataFilterKantor.map((item) => temp.kantor.push(item.kantor))
      : [];
    dataFilter && dataFilter.length != 0
      ? dataFilter.map((item) => temp.wilayah.push(item.kanwil))
      : [];

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Sertifikasi/HakTanggunganElektronik/sie_ht_jumlah_kantor_tahun?tahun=${
          years ? years.name : ""
        }&jenisGroup=${bulan ? bulan.balue : ""}&grupBerkas=${
          semester ? semester.value : ""
        }`,
        temp
      )
      .then(function (response) {
        setData(response.data.data);
        setComment(response.data);
        console.log(response.data);
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
    dispatch(getWilayahPNBP());
    let temp = { kodeWilayah: [] };
    dataFilter &&
      dataFilter.length &&
      dataFilter.map((item) => temp.kodeWilayah.push(item.kode));
    getListKantor(temp);
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event);
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
          <p className="label">{label}</p>
          {payload && payload.length > 1 ? (
            <>
              <p
                className="desc"
                style={{ color: payload[0].color }}
              >{`Jumlah Hak Tanggungan : ${payload[0].value
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</p>
              <p
                className="desc"
                style={{ color: payload[1].color }}
              >{`Nilai Hak Tanggungan : ${payload[1].value
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>{" "}
            </>
          ) : (
            <p className="desc" style={{ color: payload[0].color }}>{`${
              payload[0].dataKey == "jumlah_ht"
                ? "Jumlah Hak Tanggungan"
                : "Nilai Hak Tanggungan"
            } : ${payload[0].value
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
          )}
        </div>
      );
    }

    return null;
  };

  const exportData = () => {
    fileExport(loadDataColumnTable(nameColumn), title, data, ".xlsx");
  };

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
            <XAxis dataKey="kantah"></XAxis>
            <YAxis tickFormatter={DataFormater}>
              <Label
                value={axis.yAxis}
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {grafikView.map((e) => (
              <Bar dataKey={e.dataKey} fill={e.fill} name={e.name}></Bar>
            ))}
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
                    <StyledTableRow key={row.kantah}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.kantah}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.jumlah_ht
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.nilai_ht
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
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

  const handlePrint = () => {
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

  const handleChangeSemester = (event) => {
    setSemester(event);
  };
  const handleChangeBulan = (event) => {
    setBulan(event);
  };

  return (
    <div style={{ zIndex: "5" }}>
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
                  BASE_URL.path.sie_ht_jumlah_kantor_tahun +
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
                  BASE_URL.path.sie_ht_jumlah_kantor_tahun +
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
                BASE_URL.domain +
                "/embed/" +
                BASE_URL.path.sie_ht_jumlah_kantor_tahun
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
        <Grid item xs={isMobile ? 12 : 10}>
          <Typography className={classes.titleSection} variant="h2">
            {title}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent={isMobile ? "flex-start" : "flex-end"}
          alignItems={isMobile ? "flex-start" : "flex-end"}
          item
          xs={isMobile ? 12 : 2}
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
                    title,
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
        <Grid item xs={isMobile ? 12 : 4}>
          <div style={{ margin: 10, marginRight: 25 }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Tahun
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
                  style={{ width: "100%", height: 35 }}
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
                    if (reason == "input") setOpenTahun(true);
                    else {
                      setOpenTahun(false);
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
              <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Jenis Group
                </Typography>
                <Autocomplete
                  id="tahun"
                  open={openJenis}
                  onOpen={() => {
                    setOpenJenis(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenJenis(false)
                      : setOpenJenis(true)
                  }
                  name="tahun"
                  style={{ width: "100%", height: 35 }}
                  options={listJenis}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  onChange={(event, newValue) => {
                    handleChangeBulan(newValue);
                  }}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setOpenJenis(true);
                    else {
                      setOpenJenis(false);
                    }
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>{option.label}</React.Fragment>
                  )}
                  value={bulan}
                  defaultValue={bulan}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={"Pilih Jenis Group"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Group Berkas
                </Typography>
                <Autocomplete
                  id="tahun"
                  open={openGroup}
                  onOpen={() => {
                    setOpenGroup(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenGroup(false)
                      : setOpenGroup(true)
                  }
                  name="tahun"
                  style={{ width: "100%", height: 35 }}
                  options={listGroup}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  onChange={(event, newValue) => {
                    handleChangeSemester(newValue);
                  }}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setOpenGroup(true);
                    else {
                      setOpenGroup(false);
                    }
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>{option.label}</React.Fragment>
                  )}
                  value={semester}
                  defaultValue={semester}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={"Pilih Group Berkas"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Wilayah
                </Typography>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="kantor"
                  getOptionDisabled={(options) =>
                    dataFilter.length >= 32 ? true : false
                  }
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
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
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setHideText(true);
                    else {
                      setHideText(false);
                    }
                  }}
                  getOptionLabel={(option) => option.kanwil || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          dataFilter && dataFilter.length != 0
                            ? dataFilter
                                .map((item) => item.kanwil)
                                .indexOf(option.kanwil) > -1
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
                        : `${selected.length} Terpilih`
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
              <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kantor
                </Typography>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
                  getOptionDisabled={(options) =>
                    dataFilterKantor.length >= 32 ? true : false
                  }
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
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setHideTextKantor(true);
                    else {
                      setHideTextKantor(false);
                    }
                  }}
                  getOptionLabel={(option) => option.kantor || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          dataFilterKantor && dataFilterKantor.length != 0
                            ? dataFilterKantor
                                .map((item) => item.kantor)
                                .indexOf(option.kantor) > -1
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
                        : `${selected.length} Terpilih`
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
                style={{ paddingLeft: 15, paddingTop: 5 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getData()}
                  style={{ height: 35, width: "100%", fontSize: 12 }}
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
              comment.lastComment.analisisData.length > 500 ? (
                <Link
                  href="#"
                  onClick={() =>
                    handleOpen({
                      title,
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
        <Grid item xs={isMobile ? 12 : 8} style={{ margin: isMobile ? 20 : 0 }}>
          <Card
            className={isMobile ? classes.rootMobile : classes.root}
            variant="outlined"
          >
            {" "}
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
                    <XAxis dataKey="kantah"></XAxis>
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value={axis.yAxis}
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {grafikView.map((e) => (
                      <Bar
                        dataKey={e.dataKey}
                        fill={e.fill}
                        name={e.name}
                      ></Bar>
                    ))}
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

export default SieHtJumlahKantorTahun;
