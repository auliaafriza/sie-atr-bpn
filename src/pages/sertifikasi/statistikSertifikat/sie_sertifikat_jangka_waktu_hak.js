import React, { useState, useEffect, createRef } from "react";
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
import styles from "../styles";
import axios from "axios";
import { useScreenshot } from "use-react-screenshot";
import html2canvas from "html2canvas";
import moment from "moment";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useDispatch, useSelector } from "react-redux";
import { generateOptions } from "../../../functionGlobal/generateOptionSelect";
import { getKanwil, getTipeHak } from "../../../actions/sertifikasiAction";
import {
  tahunDataV2,
  deleteDuplicates,
} from "../../../functionGlobal/globalDataAsset";

import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../config/embed_conf";
import { url } from "../../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CheckBoxOutlineBlank,
  CheckBox as CheckBoxIcon,
} from "@material-ui/icons/";
import { isMobile } from "react-device-detect";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import { getKantorPNBP, getWilayahPNBP } from "../../../actions/pnbpAction";

// Pagu & MP PNBP (Satuan 1 Juta)
const dataTemp = [
  {
    kantah: "kantah",
    satu_th: 0,
    satutiga_th: 0,
    tiga_th: 0,
  },
  {
    kantah: "kantah 2",
    satu_th: 0,
    satutiga_th: 0,
    tiga_th: 0,
  },
];

let nameColumn = [
  {
    label: "Kantah",
    value: "label",
    isLabel: true,
  },
  {
    label: "Tipe Hak",
    value: "tipehak",
    isLabel: false,
  },
  {
    label: "Kurang dari 1 tahun",
    value: "satu_th",
  },
  {
    label: "1 sampai 3 tahun",
    value: "satutiga_th",
  },
  {
    label: "lebih dari 3 tahun",
    value: "tiga_th",
  },
];

let columnTable = [
  {
    label: "label",
    isFixed: false,
  },
  {
    label: "tipehak",
    isFixed: false,
  },
  {
    label: "satu_th",
    isFixed: false,
  },
  {
    label: "satutiga_th",
    isFixed: false,
  },
  {
    label: "tiga_th",
    isFixed: false,
  },
];

let grafikView = [
  {
    dataKey: "satu_th",
    fill: "#FFA07A",
    name: "< 1 tahun",
  },
  {
    dataKey: "satutiga_th",
    fill: "#20B2AA",
    name: "1-3 tahun",
  },
  {
    dataKey: "tiga_th",
    fill: "#E54F6E",
    name: ">3tahun",
  },
];

let axis = {
  xAxis: "tipehak",
  yAxis: "Jumlah Sertipikat",
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

const title = "Jangka Waktu Hak Sertipikat";
const Sie_sertifikat_jangka_waktu_hak = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const history = useHistory();
  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const berkasPnbpKantor = useSelector((state) => state.pnbp.kantorPnbp);
  const [dataFilter, setDataFilter] = useState([]);
  const [dataFilterKantor, setDataFilterKantor] = useState([]);

  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);

  const [openWilayah, setOpenWilayah] = useState(false);
  const [openKantah, setOpenKantah] = useState(false);
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

  const exportData = () => {
    fileExport(loadDataColumnTable(nameColumn), title, data, ".xlsx");
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
    let temp = { kantah: [], kanwil: [] };
    let foundData =
      dataFilterKantor && dataFilterKantor.length != 0
        ? findAll(dataFilterKantor, "kantor")
        : false;
    foundData
      ? dataFilterKantor.map((item) => temp.kantah.push(item.kantor))
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
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_jangka_waktu_hak`,
        temp
      )
      .then(function (response) {
        setData(response.data.data);
        setComment(response.data);
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
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Kurang dari 1 tahun : ${payload[0].value
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</p>
          <p
            className="desc"
            style={{ color: payload[1].color }}
          >{`1 sampai 3 tahun : ${payload[1].value
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</p>
          <p
            className="desc"
            style={{ color: payload[2].color }}
          >{`lebih dari 3 tahun : ${payload[2].value
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</p>
        </div>
      );
    }

    return null;
  };
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
            height={300}
            data={dataModal.grafik}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 3" />
            <XAxis
              dataKey="tipehak"
              interval={0}
              tick={{
                angle: 60,
                transform: "rotate(-35)",
                textAnchor: "start",
                dominantBaseline: "ideographic",
                fontSize: 8,
              }}
              height={100}
            />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Jumlah Sertipikat"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="satu_th"
              stroke="#FFA07A"
              activeDot={{ r: 8 }}
              strokeWidth={3}
              name="<1 tahun"
            />
            <Line
              type="monotone"
              dataKey="satutiga_th"
              stroke="#20B2AA"
              activeDot={{ r: 8 }}
              strokeWidth={3}
              name="1-3 tahun"
            />
            <Line
              type="monotone"
              dataKey="tiga_th"
              stroke="#E54F6E"
              activeDot={{ r: 8 }}
              strokeWidth={3}
              name=">3 tahun"
            />
          </LineChart>
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
                {data && data.length != 0
                  ? data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, i) => (
                        <StyledTableRow key={i}>
                          {columnTable.map((item) => {
                            return item.isFixed ? (
                              <StyledTableCell align="center">
                                {row[item.label]
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
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
                      ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
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

  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      }}
    >
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
                  BASE_URL.path.sie_sertifikasi_jangka_waktu_hak +
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
                  BASE_URL.path.sie_sertifikasi_jangka_waktu_hak +
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
                BASE_URL.path.sie_sertifikasi_jangka_waktu_hak
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
      <Box>
        <Grid
          container
          spacing={2}
          direction="row"
          style={{ padding: 10, paddingTop: 20, paddingBottom: 5 }}
        >
          <Grid item xs={isMobile ? 12 : 6}>
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
            xs={isMobile ? 12 : 6}
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
                      title: title,
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
                      nameColumn: [
                        "Kantah",
                        "Kurang dari 1 tahun",
                        "1 sampai 3 tahun",
                        "Lebih dari 3 tahun",
                      ],
                      listTop10Comment: comment.listTop10Comment,
                    })
                  }
                >
                  <IoEye />
                </IconButton>
              </TooltipMI>
              <TooltipMI
                title="Print Data"
                placement="top"
                onClick={handlePrint}
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
          <Grid item xs={isMobile ? 12 : 9}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
            >
              <Typography
                className={classes.isiContentTextStyle}
                variant="h2"
                wrap
              >
                Jangka Waktu Hak Sertipikat
              </Typography>
            </Grid>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3 3" />
                      <XAxis
                        dataKey="tipehak"
                        interval={0}
                        tick={{
                          angle: 60,
                          transform: "rotate(-35)",
                          textAnchor: "start",
                          dominantBaseline: "ideographic",
                          fontSize: 8,
                        }}
                        height={100}
                      />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Jumlah Sertipikat"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="satu_th"
                        stroke="#FFA07A"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                        name="<1 tahun"
                      />
                      <Line
                        type="monotone"
                        dataKey="satutiga_th"
                        stroke="#20B2AA"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                        name="1-3 tahun"
                      />
                      <Line
                        type="monotone"
                        dataKey="tiga_th"
                        stroke="#E54F6E"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                        name=">3 tahun"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={isMobile ? 12 : 3}>
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
                    Pilih Wilayah
                  </Typography>
                  <Autocomplete
                    multiple
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
                    getOptionLabel={(option) => option.kanwil || ""}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={
                            dataFilter && dataFilter.length != 0
                              ? findAll(dataFilter, "kanwil")
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
                <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                  <Typography
                    className={classes.isiTextStyle}
                    variant="h2"
                    style={{ fontSize: 12 }}
                  >
                    Pilih Kantah
                  </Typography>
                  <Autocomplete
                    multiple
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
                    getOptionLabel={(option) => option.kantor || ""}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={
                            dataFilterKantor && dataFilterKantor.length != 0
                              ? findAll(dataFilterKantor, "kantor")
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
                          dataFilterKantor.length != 0 ? "" : "Pilih Kantah"
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingLeft: 15, paddingTop: 5 }}>
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
                        title: title,
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
                        nameColumn: [
                          "Kantah",
                          "Kurang dari 1 tahun",
                          "1 sampai 3 tahun",
                          "Lebih dari 3 tahun",
                        ],
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
        </Grid>
      </Box>
    </div>
  );
};

export default Sie_sertifikat_jangka_waktu_hak;
