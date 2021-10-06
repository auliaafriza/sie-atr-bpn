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
import { useDispatch, useSelector } from "react-redux";
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
  TextField,
  Checkbox,
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
import { useScreenshot } from "use-react-screenshot";
import html2canvas from "html2canvas";
import moment from "moment";
import {
  tipeData,
  DataFormater,
  deleteDuplicates,
} from "../../functionGlobal/globalDataAsset";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../config/embed_conf";
import { url } from "../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getKantorPNBP } from "../../actions/pnbpAction";
import { tahunData } from "../../functionGlobal/globalDataAsset";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataTemp = [
  {
    label: "Kantor",
    alokasi_anggaran: 0,
  },
];

let nameColumn = [
  {
    label: "Kantor",
    value: "label",
    isFixed: false,
    isLabel: true,
  },
  {
    label: "Alokasi Anggaran",
    value: "alokasi_anggaran",
    isFixed: true,
    isLabel: true,
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

const PaguMpOpsNon = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const berkasPnbpKantor = useSelector((state) => state.pnbp.kantorPnbp);

  const [dataFilter, setDataFilter] = useState([
    {
      kode: "09",
      kanwil: "Kantor Wilayah Provinsi DKI Jakarta",
    },
  ]);
  const [dataFilterKantor, setDataFilterKantor] = useState([
    {
      kode: "0903",
      kantor: "Kantor Pertanahan Kota Administrasi Jakarta Barat",
    },
    {
      kode: "0901",
      kantor: "Kantor Pertanahan Kota Administrasi Jakarta Pusat",
    },
  ]);

  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);
  const [tahunAwal, setTahunAwal] = useState("2017");
  const [years, setYears] = useState("2022");
  const [dataKantor, setDataKantor] = useState([]);
  const [tipe, setTipe] = useState("OPS");
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
    let temp = { kantor: [], kanwil: [] };
    dataFilterKantor && dataFilterKantor.length != 0
      ? dataFilterKantor.map((item) => temp.kantor.push(item.kantor))
      : [];
    dataFilter && dataFilter.length != 0
      ? dataFilter.map((item) => temp.kanwil.push(item.kanwil))
      : [];
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Aset&Keuangan/PNBP/sie_pnbp_pagu_mp_ops_non?tipe=${tipe}&tahunAwal=${tahunAwal}&tahunAkhir=${years}`,
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
    let temp = { kodeWilayah: [] };
    dataFilter &&
      dataFilter.length &&
      dataFilter.map((item) => temp.kodeWilayah.push(item.kode));
    getListKantor(temp);
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  const handleChangeAwal = (event) => {
    setTipe(event.target.value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">{label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Alokasi Anggaran : Rp ${payload[0].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
        </div>
      );
    }

    return null;
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Perbandingan Pagu vs MP OPS DAN NON OPS",
      data,
      ".xlsx"
    );
  };

  const DataFormaterX = (val) => {
    return val && val.indexOf("Kantor Pertanahan Kota Administrasi") > -1
      ? val.replace("Kantor Pertanahan Kota Administrasi ", "Adm ")
      : val && val.indexOf("Kantor Pertanahan") > -1
      ? val.replace("Kantor Pertanahan ", "")
      : val;
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
          <BarChart
            width={500}
            height={800}
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
            <XAxis
              dataKey="label"
              // angle={60}
              // interval={0}
              tick={{
                // angle: 90,
                // transform: "rotate(-35)",
                // textAnchor: "start",
                // dominantBaseline: "ideographic",
                fontSize: 8,
              }}
              height={100}
              tickFormatter={DataFormaterX}
            ></XAxis>
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Alokasi Anggaran"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Bar dataKey="alokasi_anggaran" fill="#8884d8" />
          </BarChart>
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
                    <StyledTableCell align="center">{item}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataModal.grafik
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.label}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.label}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Rp{" "}
                        {row.alokasi_anggaran
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

  let columnTable = [
    {
      label: data,
      isFixed: false,
    },
    {
      label: "alokasi_anggaran",
      isFixed: true,
    },
  ];

  let grafikView = [
    {
      dataKey: "alokasi_anggaran",
      fill: "#8884d8",
    },
  ];

  let axis = {
    xAxis: data,
    yAxis: "Alokasi Anggaran",
  };
  const title = "Perbandingan Pagu vs MP OPS DAN NON OPS";
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
                  BASE_URL.path.pnbp_pagu_mp_ops_non +
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
                  BASE_URL.path.pnbp_pagu_mp_ops_non +
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
                BASE_URL.domain + "/embed/" + BASE_URL.path.pnbp_pagu_mp_ops_non
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
      <Box
        style={{
          backgroundColor: "rgb(244, 245, 250)",
          paddingTop: 20,
          paddingBottom: 20,
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
              {title}
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
                      title: "Perbandingan Pagu vs MP OPS DAN NON OPS",
                      grafik: data,
                      dataTable: "",
                      analisis:
                        comment && comment.lastComment
                          ? comment.lastComment.analisisData.replace(
                              /<[^>]+>/g,
                              ""
                            )
                          : "",
                      type: "Line",
                      nameColumn: ["Kantor", "Alokasi Anggaran"],

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
        <Grid container>
          <Grid item xs={7}>
            <Card className={classes.rootOdd} variant="outlined">
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      width={500}
                      height={800}
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
                      <XAxis
                        dataKey="label"
                        // angle={60}
                        // interval={0}
                        tick={{
                          // angle: 90,
                          // transform: "rotate(-35)",
                          // textAnchor: "start",
                          // dominantBaseline: "ideographic",
                          fontSize: 8,
                        }}
                        height={100}
                        tickFormatter={DataFormaterX}
                      ></XAxis>
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Alokasi Anggaran"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      {/* <Legend /> */}
                      <Bar dataKey="alokasi_anggaran" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ marginRight: 25 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
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
                      Tahun Awal
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={tahunAwal}
                        onChange={handleChangeAwal}
                        label="Tahun"
                        className={classes.selectStyle}
                        disableUnderline
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
                  <Grid item xs={6}>
                    <Typography
                      className={classes.isiTextStyle}
                      variant="h2"
                      style={{ fontSize: 12 }}
                    >
                      Tahun Akhir
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={years}
                        onChange={handleChange}
                        label="Tahun"
                        className={classes.selectStyle}
                        disableUnderline
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
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    className={classes.isiTextStyle}
                    variant="h2"
                    style={{ fontSize: 12 }}
                  >
                    Pilih Wilayah
                  </Typography>
                  <Autocomplete
                    multiple
                    getOptionDisabled={(options) =>
                      dataFilter.length >= 32 ? true : false
                    }
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
                <Grid item xs={6}>
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
                    onInputChange={(_event, value, reason) => {
                      if (reason == "input") {
                        setDataFilterKantor([]);
                        setHideTextKantor(true);
                      } else {
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
                    getOptionDisabled={(options) =>
                      dataFilterKantor.length >= 32 ? true : false
                    }
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
              </Grid>

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
                    Pilih Tipe
                  </Typography>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={tipe}
                      onChange={handleChangeAwal}
                      label="Tipe"
                      className={classes.selectStyle}
                      disableUnderline
                    >
                      {tipeData.map((item, i) => {
                        return (
                          <MenuItem value={item.id} key={i}>
                            {item.name}
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
                        title: "Perbandingan Pagu vs MP OPS DAN NON OPS",
                        grafik: data,
                        dataTable: "",
                        analisis:
                          comment && comment.lastComment
                            ? comment.lastComment.analisisData.replace(
                                /<[^>]+>/g,
                                ""
                              )
                            : "",
                        type: "Line",
                        nameColumn: ["Kantor", "Alokasi Anggaran"],
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

export default PaguMpOpsNon;
