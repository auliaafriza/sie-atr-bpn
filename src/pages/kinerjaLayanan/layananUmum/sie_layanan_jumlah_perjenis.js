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
  Label,
} from "recharts";
import {
  Typography,
  Grid,
  Card,
  ButtonGroup,
  IconButton,
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
  TablePagination,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  TextField,
} from "@material-ui/core";
import { createTheme, withStyles } from "@material-ui/core/styles";
import { IoEye, IoPrint, IoCopySharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./../styles";
import axios from "axios";
import moment from "moment";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../config/embed_conf";
import { url } from "../../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import {
  DataFormater,
  tahunData,
} from "../../../functionGlobal/globalDataAsset";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckBoxOutlineBlank,
  CheckBox as CheckBoxIcon,
} from "@material-ui/icons/";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const dataTemp = [
  {
    nama_layanan: "",
    jumlah_layanan: 0,
  },
  {
    nama_layanan: "",
    jumlah_layanan: 0,
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
    label: "Nama Layanan",
    value: "nama_layanan",
    isLabel: true,
  },
  {
    label: "Jumlah Layanan",
    value: "jumlah_layanan",
  },
];

let columnTable = [
  {
    label: "nama_layanan",
    isFixed: false,
  },
  {
    label: "jumlah_layanan",
    isFixed: false,
  },
];

let grafikView = [
  {
    dataKey: "jumlah_layanan",
    fill: "#C71585",
  },
];

let axis = {
  xAxis: "Nama Layanan",
  yAxis: "Jumlah Layanan",
};
const title = "Jumlah layanan berdasarkan jenis layanan";
const SieLayananJumlahPerjenis = () => {
  const classes = styles();
  const berkasPnbpWilayah = useSelector(
    (state) => state.pnbp.berkasPnbpWilayah
  );
  const berkasPnbpKantor = useSelector((state) => state.pnbp.berkasPnbpKantor);

  const [dataFilter, setDataFilter] = useState([
    { wilayah: "Kantor Wilayah Provinsi Jawa Barat" },
    { wilayah: "Kantor Wilayah Provinsi Jambi" },
  ]);
  const [dataFilterKantor, setDataFilterKantor] = useState([
    { kantor: "Kantor Pertanahan Kabupaten Bandung" },
  ]);
  const [years, setYears] = useState("2014");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    title: "",
    grafik: [],
    dataTable: "",
    analisis: "",
    type: "",
    listTop10Comment: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [namaLay, setNamaLayanan] = useState([
    { namaLayanan: "Analis Pendaftaran Hak Tanah Dan Ruang" },
  ]);
  const [jenisLay, setJenisLayanan] = useState([
    { jenislayanan: "Izin Pelepasan Sebagai HGU Badan Hukum" },
  ]);
  const [listNamaLayanan, setListNamaLayanan] = useState([]);
  const [listJenisLayanan, setListJenisLayanan] = useState([]);

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

  const handleChangeTahun = (event) => {
    setYears(event.target.value);
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
    let temp = { kantor: [], wilayah: [], jenisLayanan: [], namaLayanan: [] };
    dataFilterKantor && dataFilterKantor.length != 0
      ? dataFilterKantor.map((item) => temp.kantor.push(item.kantor))
      : [];
    dataFilter && dataFilter.length != 0
      ? dataFilter.map((item) => temp.wilayah.push(item.wilayah))
      : [];
    jenisLay && jenisLay.length != 0
      ? jenisLay.map((item) => temp.jenisLayanan.push(item.jenisLayanan))
      : [];

    namaLay && namaLay.length != 0
      ? namaLay.map((item) => temp.namaLayanan.push(item.namaLayanan))
      : [];
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}KinerjaLayanan/LayananUmum/sie_layanan_jumlah_perjenis`,
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

  const handleChange = (event) => {
    // setNamaLayanan(event.target.value);
    if (event.length != 0) {
      setNamaLayanan([
        ...namaLay,
        ...event.filter((option) => namaLay.indexOf(option) === -1),
      ]);
    } else {
      setNamaLayanan([]);
    }
  };

  const handleChangeJenis = (event) => {
    // setJenisLayanan(event.target.value);
    if (event.length != 0) {
      setJenisLayanan([
        ...jenisLay,
        ...event.filter((option) => jenisLay.indexOf(option) === -1),
      ]);
    } else {
      setJenisLayanan([]);
    }
  };

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}KinerjaLayanan/LayananUmum/filter_nama_layanan`)
      .then(function (response) {
        setListNamaLayanan(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}KinerjaLayanan/LayananUmum/filter_jenis_layanan`)
      .then(function (response) {
        setListJenisLayanan(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    getData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">{label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Jumlah Layanan : ${payload[0].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&.")}`}</p>
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
            <XAxis dataKey="nama_layanan"></XAxis>
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
            <Bar
              dataKey="jumlah_layanan"
              fill="#C71585"
              name="Jumlah Layanan"
            ></Bar>
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
                    <StyledTableRow key={row.nama_layanan}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.nama_layanan}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.jumlah_layanan
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
                  BASE_URL.path.sie_layanan_jumlah_perjenis +
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
                  BASE_URL.path.sie_layanan_jumlah_perjenis +
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
                BASE_URL.path.sie_layanan_jumlah_perjenis
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
        <Grid item xs={10}>
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
          xs={2}
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
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
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
                  Pilih Tahun
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={years}
                    onChange={handleChangeTahun}
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
              <Grid item xs={4}>
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
                  getOptionLabel={(option) => option.wilayah}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          dataFilter && dataFilter.length != 0
                            ? dataFilter
                                .map((item) => item.wilayah)
                                .indexOf(option.wilayah) > -1
                            : false
                        }
                      />
                      {option.wilayah}
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
                      placeholder={dataFilter.length != 0 ? "" : "Pilih Kantor"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
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
                  getOptionLabel={(option) => option.kantor}
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
                        dataFilterKantor.length != 0 ? "" : "Pilih Wilayah"
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
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Nama Layanan
                </Typography>
                <Autocomplete
                  multiple
                  id="namalayanan"
                  name="namalayanan"
                  style={{ width: "100%", height: 50 }}
                  options={listNamaLayanan}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChange(newValue);
                  }}
                  getOptionLabel={(option) => option.namalayanan}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          namaLay && namaLay.length != 0
                            ? namaLay
                                .map((item) => item.namalayanan)
                                .indexOf(option.namalayanan) > -1
                            : false
                        }
                      />
                      {option.namalayanan}
                    </React.Fragment>
                  )}
                  renderTags={(selected) => {
                    return `${selected.length} Terpilih`;
                  }}
                  defaultValue={namaLay}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={
                        namaLay.length != 0 ? "" : "Pilih namalayanan"
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Jenis Layanan
                </Typography>
                <Autocomplete
                  multiple
                  id="jenislayanan"
                  name="jenislayanan"
                  style={{ width: "100%", height: 50 }}
                  options={listJenisLayanan}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeJenis(newValue);
                  }}
                  getOptionLabel={(option) =>
                    option.jenislayanan !== null ? option.jenislayanan : ""
                  }
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          jenisLay && jenisLay.length != 0
                            ? jenisLay
                                .map((item) =>
                                  item.jenislayanan !== null
                                    ? item.jenislayanan
                                    : ""
                                )
                                .indexOf(option.jenislayanan) > -1
                            : false
                        }
                      />
                      {option.jenislayanan}
                    </React.Fragment>
                  )}
                  renderTags={(selected) => {
                    return `${selected.length} Terpilih`;
                  }}
                  defaultValue={jenisLay}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={
                        jenisLay.length != 0 ? "" : "Pilih jenis layanan"
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
                xs={4}
                style={{ paddingLeft: 20 }}
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
                    <XAxis dataKey="nama_layanan"></XAxis>
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
                    <Bar
                      dataKey="jumlah_layanan"
                      fill="#C71585"
                      name="Jumlah Layanan"
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

export default SieLayananJumlahPerjenis;
