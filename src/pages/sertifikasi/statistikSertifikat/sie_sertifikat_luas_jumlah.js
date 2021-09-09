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
  tahunData,
  semesterData,
  bulanDataNumberic,
} from "../../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
// import { getSatker } from "../../actions/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { generateOptions } from "../../../functionGlobal/generateOptionSelect";
import { BASE_URL } from "../../../config/embed_conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const dataTemp = [{ kantah: "", luaspersil: 0 }];
let axis = {
  xAxis: "Kantah",
  yAxis: "",
};
const title = "Luas Bidang Berdasarkan Jenis Sertifikat";
const SieSertifikatLuasJumlah = () => {
  const classes = styles();
  const [years, setYears] = useState("2017");
  const [tahunAkhir, setTahunAkhir] = useState("2019");

  const [semester, setSemester] = useState(2);
  const [bulan, setBulan] = useState("07");
  const [comment, setComment] = useState("");
  const [dataFilterKanwil, setDataFilterKanwil] = useState(["", "Aceh"]);
  const [listKanwil, setListKanwil] = useState([]);
  const [dataFilterKantah, setDataFilterKantah] = useState(["", "Kab. Pidie"]);
  const [listKantah, setListKantah] = useState([]);
  const [dataFilterTipeHak, setDataFilterTipeHak] = useState(["", "Hak Milik"]);
  const [listtipeHak, setListTipeHak] = useState([]);
  const [dataFilterTipePemilik, setDataFilterTipePemilik] = useState([
    "",
    "PERORANGAN",
  ]);
  const [listTipePemilik, setListTipePemilik] = useState([]);
  const [dataFilterProduk, setDataFilterProduk] = useState(["", "Rutin"]);
  const [listProduk, setListProduk] = useState([]);

  const [dataFilterOutput, setDataFilterOutput] = useState(["", "luaspersil"]);
  const [listOutput, setListOutput] = useState([
    {
      nama: "luaspersil",
      label: "Luas Persil",
      color: "#d53515",
    },
    {
      nama: "luaspeta",
      label: "Luas Peta",
      color: "#2acaea",
    },
    {
      nama: "luastertulis",
      label: "Luas Tertulis",
      color: "#ff84a3",
    },
    {
      nama: "bataspersil",
      label: "Batas Persil",
      color: "#93a689",
    },
    {
      nama: "persil",
      label: "Persil",
      color: "#7a4fa1",
    },
  ]);

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

  const [data, setData] = useState(dataTemp);
  const [nameColumn, setColumn] = useState([
    {
      label: "Kantah",
      value: "kantah",
      isLabel: true,
    },
    { label: "Luas Persil", isFixed: false, value: "luaspersil" },
  ]);
  const [grafikView, setGrafikView] = useState([
    { dataKey: "luaspersil", name: "Luas Persil", fill: "#d53515" },
  ]);
  const [columnTable, setColumnTable] = useState(
    {
      label: "kantah",
      isFixed: false,
    },
    {
      label: "luaspersil",
      isFixed: false,
    }
  );
  const updateGrafik = () => {
    let nameColumn = dataFilterOutput.reduce(
      (acc, e) => {
        const selectedOutput = listOutput.find((lo) => lo.nama === e);
        if (selectedOutput)
          acc.push({ value: e, isFixed: false, label: selectedOutput.label });
        return acc;
      },
      [
        {
          label: "Kantah",
          value: "kantah",
          isLabel: true,
        },
      ]
    );

    let grafikView = dataFilterOutput.reduce((acc, e) => {
      const selectedOutput = listOutput.find((lo) => lo.nama === e);
      if (selectedOutput)
        acc.push({
          dataKey: e,
          name: selectedOutput.label,
          fill: selectedOutput.color,
        });
      return acc;
    }, []);

    let columnTable = dataFilterOutput.reduce(
      (acc, e) => {
        acc.push({ label: e, isFixed: false });
        return acc;
      },
      [
        {
          label: "kantah",
          isFixed: false,
        },
      ]
    );
    setColumn(nameColumn);
    setGrafikView(grafikView);
    setColumnTable(columnTable);
  };
  // const dispatch = useDispatch();
  // const satkerRed = useSelector((state) => state.globalReducer.satker);

  console.log({ columnTable });
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

  const getKanwil = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_luas_jumlah_filter_kanwil`
      )
      .then(function (response) {
        const listKanwilApi = response.data.data;

        setListKanwil(listKanwilApi);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getKantah = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_luas_jumlah_filter_kantah`
      )
      .then(function (response) {
        const listKantahApi = response.data.data;

        setListKantah(listKantahApi);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getTipeHak = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_luas_jumlah_filter_tipehak`
      )
      .then(function (response) {
        const listTipeHakApi = response.data.data;

        setListTipeHak(listTipeHakApi);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const getTipePemilik = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_luas_jumlah_filter_tipepemilik`
      )
      .then(function (response) {
        const listTipePemilikApi = response.data.data;

        setListTipePemilik(listTipePemilikApi);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getProduk = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_luas_jumlah_filter_produk`
      )
      .then(function (response) {
        const listProdukApi = response.data.data;

        setListProduk(listProdukApi);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getData = () => {
    let temp = {
      kanwil: dataFilterKanwil,
      kantah: dataFilterKantah,
      tipehak: dataFilterTipeHak,
      tipepemilik: dataFilterTipePemilik,
      produk: dataFilterProduk,
    };

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Sertifikasi/StatistikSertifikat/sie_sertifikat_luas_jumlah?tahunAwal=${years}&tahunAkhir=${tahunAkhir}`,
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
    // dispatch(getSatker());
    getKanwil();
    getKantah();
    getTipeHak();
    getTipePemilik();
    getProduk();
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  const handleChangeTahunAkhir = (event) => {
    setTahunAkhir(event.target.value);
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
          <p className="label">Kantah {label}</p>
          {grafikView.map((e, i) => (
            <p
              className="desc"
              style={{ color: payload[i].color }}
            >{`${e.name} : ${payload[i].value}`}</p>
          ))}
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
              <Bar dataKey={e.dataKey} fill={e.fill}></Bar>
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
                  <StyledTableCell align="center" component="th" scope="row">
                    kantah
                  </StyledTableCell>
                  {grafikView.map((item, i) => {
                    return (
                      <StyledTableCell align="center">
                        {item.name}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataModal.grafik
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.kantah}
                      </StyledTableCell>
                      {grafikView.map((nc, inc) => (
                        <StyledTableCell align="center">
                          {row[nc.dataKey]}
                        </StyledTableCell>
                      ))}
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

  const handleChangeFilterKanwil = (event) => {
    setDataFilterKanwil(event.target.value);
  };
  const handleChangeFilterKantah = (event) => {
    setDataFilterKantah(event.target.value);
  };
  const handleChangeFilterTipeHak = (event) => {
    setDataFilterTipeHak(event.target.value);
  };
  const handleChangeFilterTipePemilk = (event) => {
    setDataFilterTipePemilik(event.target.value);
  };
  const handleChangeFilterProduk = (event) => {
    setDataFilterProduk(event.target.value);
  };
  const handleChangeFilterOutput = (event) => {
    setDataFilterOutput(event.target.value);
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
                  BASE_URL.path.sie_sertifikasi_luas_jumlah +
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
                  BASE_URL.path.sie_sertifikasi_luas_jumlah +
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
                BASE_URL.path.sie_sertifikasi_luas_jumlah
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
                  Tahun Awal
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
              <Grid item xs={4}>
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
                    value={tahunAkhir}
                    onChange={handleChangeTahunAkhir}
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
                  Kanwil
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterKanwil}
                    onChange={handleChangeFilterKanwil}
                    label="Kanwil"
                    className={classes.selectStyle}
                    renderValue={(selected) => {
                      if (selected.length > 1)
                        return `${selected.length - 1} Terpilih`;
                      else if (selected[0] == "") return "Kanwil";
                    }}
                    disableUnderline
                  >
                    <MenuItem value="" disabled>
                      Kanwil
                    </MenuItem>

                    {listKanwil.map((item, i) => {
                      return (
                        <MenuItem value={item.kanwil} key={i}>
                          <Checkbox
                            checked={dataFilterKanwil.indexOf(item.kanwil) > -1}
                          />
                          <ListItemText primary={item.kanwil} />
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
                  Kantah
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterKantah}
                    onChange={handleChangeFilterKantah}
                    label="Kantah"
                    className={classes.selectStyle}
                    renderValue={(selected) => `${selected.length} Terpilih`}
                    disableUnderline
                  >
                    {listKantah.map((item, i) => {
                      return (
                        <MenuItem value={item.kantah} key={i}>
                          <Checkbox
                            checked={dataFilterKantah.indexOf(item.kantah) > -1}
                          />
                          <ListItemText primary={item.kantah} />
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
                  Tipe Hak
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterTipeHak}
                    onChange={handleChangeFilterTipeHak}
                    label="TipeHak"
                    className={classes.selectStyle}
                    renderValue={(selected) => {
                      if (selected.length > 1)
                        return `${selected.length - 1} Terpilih`;
                      else if (selected[0] == "") return "Tipe Hak";
                    }}
                    disableUnderline
                  >
                    <MenuItem value="" disabled>
                      Tipe Hak
                    </MenuItem>
                    {listtipeHak.map((item, i) => {
                      return (
                        <MenuItem value={item.tipehak} key={i}>
                          <Checkbox
                            checked={
                              dataFilterTipeHak.indexOf(item.tipehak) > -1
                            }
                          />
                          <ListItemText primary={item.tipehak} />
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
                  Tipe Pemilik
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterTipePemilik}
                    onChange={handleChangeFilterTipePemilk}
                    label="TipePemilik"
                    className={classes.selectStyle}
                    renderValue={(selected) => {
                      if (selected.length > 1)
                        return `${selected.length - 1} Terpilih`;
                      else if (selected[0] == "") return "Tipe Pemilik";
                    }}
                    disableUnderline
                  >
                    <MenuItem value="" disabled>
                      Tipe Pemilik
                    </MenuItem>
                    {listTipePemilik.map((item, i) => {
                      return (
                        <MenuItem value={item.tipepemilik} key={i}>
                          <Checkbox
                            checked={
                              dataFilterTipePemilik.indexOf(item.tipepemilik) >
                              -1
                            }
                          />
                          <ListItemText primary={item.tipepemilik} />
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
                  Produk
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterProduk}
                    onChange={handleChangeFilterProduk}
                    label="produk"
                    className={classes.selectStyle}
                    renderValue={(selected) => {
                      if (selected.length > 1)
                        return `${selected.length - 1} Terpilih`;
                      else if (selected[0] == "") return "Produk";
                    }}
                    disableUnderline
                  >
                    <MenuItem value="" disabled>
                      Produk
                    </MenuItem>

                    {listProduk.map((item, i) => {
                      return (
                        <MenuItem value={item.produk} key={i}>
                          <Checkbox
                            checked={dataFilterProduk.indexOf(item.produk) > -1}
                          />
                          <ListItemText primary={item.produk} />
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
                  Grafik
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterOutput}
                    onChange={handleChangeFilterOutput}
                    label="output"
                    className={classes.selectStyle}
                    renderValue={(selected) => {
                      if (selected.length > 1)
                        return `${selected.length - 1} Terpilih`;
                      else if (selected[0] == "") return "Grafik";
                    }}
                    disableUnderline
                  >
                    <MenuItem value="" disabled>
                      Grafik
                    </MenuItem>

                    {listOutput.map((item, i) => {
                      return (
                        <MenuItem value={item.nama} key={i}>
                          <Checkbox
                            checked={dataFilterOutput.indexOf(item.nama) > -1}
                          />
                          <ListItemText primary={item.label} />
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
                xs={4}
                style={{ paddingLeft: 20, paddingTop: 40 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    getData();
                    updateGrafik();
                  }}
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
          <Card className={classes.root}>
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
                      <Bar dataKey={e.dataKey} fill={e.fill}></Bar>
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

export default SieSertifikatLuasJumlah;
