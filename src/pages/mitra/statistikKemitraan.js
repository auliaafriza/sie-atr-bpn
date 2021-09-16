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
  Checkbox,
  Avatar,
  TablePagination,
  Button,
  TextField,
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IoEye, IoPrint, IoCopySharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { tahunData, DataFormater } from "../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config/embed_conf";
import { url } from "../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getKantorPNBP } from "../../actions/pnbpAction";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataTemp = [
  {
    tahun: "",
    jumlah: 0,
  },
  {
    tahun: "",
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
    label: "Tahun",
    value: "tahun",
    isFixed: false,
    isLabel: false,
  },
  {
    label: "Jumlah",
    value: "jumlah",
    isFixed: false,
    isLabel: false,
  },
];

let columnTable = [
  {
    label: "tahun",
    isFixed: false,
  },
  {
    label: "kanwil",
    isFixed: false,
  },
  {
    label: "tahun",
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
    fill: "#FFA07A",
  },
];

let axis = {
  xAxis: "tahun",
  yAxis: "Jumlah",
};

let kantahTemp = [];

const KepegawaianOrganisasi = () => {
  const classes = styles();
  const [years, setYears] = useState("2022");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [tahunAwal, setTahunAwal] = useState("2017");
  const [kanwil, setKanwil] = useState([
    "Kantor Wilayah Provinsi Bali",
    "Kantor Wilayah Provinsi Sulawesi Tenggara",
  ]);
  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);
  const [kantor, setKantor] = useState([]);
  const [satker, setSatker] = useState("");
  const [kanwilDis, setKanwilDis] = useState("");
  const [kantorDis, setKantorDis] = useState("");
  const [satkerDis, setSatkerDis] = useState("");
  const [jenis, setJenis] = useState("PPAT");

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

  const tahunRed = useSelector((state) => state.globalReducer.tahun);
  const kantahRed = useSelector((state) => state.mitra.kantah);
  const kanwilRed = useSelector((state) => state.globalReducer.kanwil);

  const handleOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeKanwil = (event) => {
    if (event.length != 0) {
      setKanwil([
        ...kanwil,
        ...event.filter((option) => kanwil.indexOf(option) === -1),
      ]);
    } else {
      setKanwil([]);
    }
  };

  const handleChangeKantor = (event) => {
    if (event.length != 0) {
      setKantor([
        ...kantor,
        ...event.filter((option) => kantor.indexOf(option) === -1),
      ]);
    } else {
      setKantor([]);
    }
  };

  const getData = () => {
    let temp = { kantor: [], wilayah: [] };
    temp.kantah = kantor && kantor.length == 1 && kantor[0] == "" ? [] : kantor;
    temp.wilayah = kanwil;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Mitra/StatistikKemitraan/sie_mitra_statistik_kemitraan?type=${jenis}&tahunAwal=${tahunAwal}&tahunAkhir=${years}`,
        temp
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

  const handleChangeTipe = (event) => {
    setJenis(event.target.value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">Tahun {label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Jumlah : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Statistik Kemitraan",
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

  const DataFormaterX = (value) => {
    return (
      value.replace("Kantor Pertanahan Kabupaten ", "") ||
      value.replace("Kantor Pertanahan Provinsi ", "") ||
      value.replace("Kantor Wilayah ", "")
    );
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
            <XAxis
              // angle={60}
              // interval={0}
              // tick={{
              //   transform: "rotate(-35)",
              //   textAnchor: "start",
              //   dominantBaseline: "ideographic",
              //   fontSize: 8,
              // }}
              dataKey="tahun"
              // tickFormatter={DataFormaterX}
            />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai Satuan 1 Juta"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Bar dataKey="jumlah" fill="#FFA07A" />
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
                    <StyledTableRow key={row.tahun}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.tahun}
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

  const handleChangeSatket = (event) => {
    setSatkerDis(
      event.target.value.length > 10
        ? event.target.value.slice(0, 10)
        : event.target.value
    );
    setSatker(event.target.value);
  };

  return (
    <div
      style={{
        paddingLeft: 20,
        paddingBottom: 20,
        height: "90%",
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
                  BASE_URL.path.statistik_kemitraan +
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
                  BASE_URL.path.statistik_kemitraan +
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
                BASE_URL.domain + "/embed/" + BASE_URL.path.statistik_kemitraan
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

      <Grid
        container
        spacing={2}
        direction="row"
        style={{ padding: 10, paddingTop: 20, paddingBottom: 5 }}
      >
        <Grid item xs={9}>
          <Typography className={classes.titleSection} variant="h2">
            Statistik: jenis (ppat, surveryor berlisensi (mitra) dan jasa
            keuangan)
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
                    title:
                      "Statistik: jenis (ppat, surveryor berlisensi (mitra) dan jasa keuangan)",
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
                  "Statistik: jenis (ppat, surveryor berlisensi (mitra) dan jasa keuangan)",
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
                    <XAxis
                      // angle={60}
                      // interval={0}
                      // tick={{
                      //   transform: "rotate(-35)",
                      //   textAnchor: "start",
                      //   dominantBaseline: "ideographic",
                      //   fontSize: 8,
                      // }}
                      dataKey="tahun"
                      // tickFormatter={DataFormaterX}
                    />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Nilai Satuan 1 Juta"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Legend /> */}
                    <Bar dataKey="jumlah" fill="#FFA07A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
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
                    label="Tahun Akhir"
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
                  Pilih Kanwil
                </Typography>
                <Autocomplete
                  multiple
                  id="kanwil"
                  name="kanwil"
                  style={{ width: "100%", height: 50 }}
                  options={kanwilRed}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeKanwil(newValue);
                  }}
                  getOptionLabel={(option) => option.kanwil || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          kanwil && kanwil.length != 0
                            ? kanwil
                                .map((item) => item.kanwil)
                                .indexOf(option.kanwil) > -1
                            : false
                        }
                      />
                      {option.kanwil}
                    </React.Fragment>
                  )}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setHideTextKantor(true);
                    else {
                      setHideTextKantor(false);
                    }
                  }}
                  renderTags={(selected) => {
                    return selected.length != 0
                      ? hideTextKantor
                        ? ""
                        : `${selected.length} Terpilih`
                      : "";
                  }}
                  value={kanwil}
                  getOptionDisabled={(options) =>
                    kanwil.length >= 32 ? true : false
                  }
                  defaultValue={kanwil}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={kanwil.length != 0 ? "" : "Pilih Kanwil"}
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
                  Pilih Kantah
                </Typography>

                <Autocomplete
                  multiple
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 50 }}
                  options={kantahRed}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeKantor(newValue);
                  }}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setHideText(true);
                    else {
                      setHideText(false);
                    }
                  }}
                  getOptionLabel={(option) => option.kantah || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          kantor && kantor.length != 0
                            ? kantor
                                .map((item) => item.kantah)
                                .indexOf(option.kantah) > -1
                            : false
                        }
                      />
                      {option.kantah}
                    </React.Fragment>
                  )}
                  renderTags={(selected) => {
                    return selected.length != 0
                      ? hideText
                        ? ""
                        : `${selected.length} Terpilih`
                      : "";
                  }}
                  value={kantor}
                  getOptionDisabled={(options) =>
                    kantor.length >= 32 ? true : false
                  }
                  defaultValue={kantor}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={kantor.length != 0 ? "" : "Pilih Kantah"}
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
                  Pilih Jenis Statistik
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={jenis}
                    onChange={handleChangeTipe}
                    label="Jenis Statistik"
                    className={classes.selectStyle}
                    disableUnderline
                  >
                    <MenuItem value="PPAT">PPAT</MenuItem>
                    <MenuItem value="SURVEYOR">Surveyor</MenuItem>
                    <MenuItem value="BANK">Jasa Keuangan</MenuItem>
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
          </div>
        </Grid>
      </Grid>
      <Typography className={classes.isiContentTextStyle} variant="h2" wrap>
        {comment && comment.lastComment
          ? comment.lastComment.analisisData
              .replace(/<[^>]+>/g, "")
              .slice(0, 500)
          : ""}
        {comment &&
        comment.lastComment &&
        comment.lastComment.analisisData.length > 100 ? (
          <Link
            href="#"
            onClick={() =>
              handleOpen({
                title:
                  "Statistik: jenis (ppat, surveryor berlisensi (mitra) dan jasa keuangan)",
                grafik: data,
                dataTable: "",
                analisis:
                  comment && comment.lastComment
                    ? comment.lastComment.analisisData.replace(/<[^>]+>/g, "")
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
  );
};

export default KepegawaianOrganisasi;
