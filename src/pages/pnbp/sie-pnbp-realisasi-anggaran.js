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
  OutlinedInput,
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
import { useSelector, useDispatch } from "react-redux";
import { IoEye, IoPrint, IoCopySharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "../dashboardPage/styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { tahunData } from "../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory, Link as LinkPrint } from "react-router-dom";
import { BASE_URL } from "../../config/embed_conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getKantorPNBP } from "../../actions/pnbpAction";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataTemp = [
  {
    label: "Kantor Pertanahan Kabupaten",
    anggaran: 0,
    realisasi: 10,
  },
  {
    label: "Kantor Pertanahan Kabupaten ",
    anggaran: 0,
    realisasi: 10,
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
    label: "Kantor",
    value: "label",
    isFixed: false,
    isLabel: true,
  },
  {
    label: "Anggaran",
    value: "anggaran",
    isFixed: true,
    isLabel: false,
  },
  {
    label: "Realisasi",
    value: "realisasi",
    isFixed: true,
    isLabel: false,
  },
];

let columnTable = [
  {
    label: "label",
    isFixed: false,
  },
  {
    label: "anggaran",
    isFixed: true,
  },
  {
    label: "realisasi",
    isFixed: true,
  },
];

let grafikView = [
  {
    dataKey: "anggaran",
    fill: "#8884d8",
  },
  {
    dataKey: "realisasi",
    fill: "#82ca9d",
  },
];

let axis = {
  xAxis: "label",
  yAxis: "Nilai Satuan 1 Juta",
};

const RealisasiAnggaran = () => {
  const classes = styles();

  const dispatch = useDispatch();
  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const berkasPnbpKantor = useSelector((state) => state.pnbp.kantorPnbp);

  const [years, setYears] = useState("2022");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [tahunAwal, setTahunAwal] = useState("2017");
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
  const [dataFilter, setDataFilter] = useState([
    {
      kode: "28",
      kanwil: "Kantor Wilayah Provinsi Banten",
    },
    {
      kode: "10",
      kanwil: "Kantor Wilayah Provinsi Jawa Barat",
    },
  ]);
  const [dataFilterKantor, setDataFilterKantor] = useState([
    {
      kode: "2801",
      kantor: "Kantor Pertanahan Kabupaten Serang",
    },
  ]);

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

  const handleChangeFilter = (event) => {
    if (event.length != 0) {
      let temp = { kodeWilayah: [] };
      event.map((item) => temp.kodeWilayah.push(item.kode));
      dispatch(getKantorPNBP(temp));
      setDataFilter([
        ...dataFilter,
        ...event.filter((option) => dataFilter.indexOf(option) === -1),
      ]);
    } else {
      setDataFilter([]);
    }
  };

  const handleChangeFilterKantor = (event) => {
    if (event.length != 0) {
      setDataFilterKantor([
        ...dataFilterKantor,
        ...event.filter((option) => dataFilterKantor.indexOf(option) === -1),
      ]);
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
        `${url}Aset&Keuangan/PNBP/sie_pnbp_realisasi_anggaran?tahunAwal=${tahunAwal}&tahunAkhir=${years}`,
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

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Nilai Anggaran dan Realisasi Belanja anggaran PNBP",
      data,
      ".xlsx"
    );
  };

  const grafik = (
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
        <XAxis dataKey="label"></XAxis>
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
  );

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {dataModal.title}
      </h2>
      <div className={classes.barChart}>{grafik}</div>
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
        backgroundColor: "rgb(244, 245, 250)",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        marginTop: 20,
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
                  BASE_URL.path.realisasi_anggaran +
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
                  BASE_URL.path.realisasi_anggaran +
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
                BASE_URL.domain + "/embed/" + BASE_URL.path.realisasi_anggaran
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
      <Box>
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
                      title: "Anggaran & Realisasi (Satuan 1 Juta)",
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
              <TooltipMI
                title="Print Data"
                placement="top"
                onClick={() =>
                  handlePrintData(
                    "Anggaran & Realisasi (Satuan 1 Juta)",
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
                      <XAxis dataKey="label" />
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
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={5}>
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
                      return `${selected.length} Terpilih`;
                    }}
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
                <Grid item xs={5}>
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
                    options={berkasPnbpKantor}
                    classes={{
                      option: classes.option,
                    }}
                    disableUnderline
                    className={classes.formControl}
                    autoHighlight
                    onChange={(event, newValue) => {
                      handleChangeFilterKantor(newValue);
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
                      return `${selected.length} Terpilih`;
                    }}
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
                  xs={2}
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
                        title: "Anggaran & Realisasi (Satuan 1 Juta)",
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
        </Grid>
      </Box>
    </div>
  );
};

export default RealisasiAnggaran;
