import React, { useState, useEffect, createRef } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
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
  Checkbox,
  TablePagination,
  Button,
} from "@material-ui/core";
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
  tahunData,
  bulanData,
  semesterData,
} from "../../functionGlobal/globalDataAsset";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBerkasPnbpWilayahFilter,
  getBerkasPnbpKantorFilter,
} from "../../actions/pnbpAction";
import { BASE_URL } from "../../config/embed_conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dataTemp = [
  {
    wilayah: "Kantor Wilayah Provinsi Jabar",
    jumlahberkas: 10,
    pnbp: 10,
  },
  {
    wilayah: "Kantor Wilayah Provinsi Jateng",
    jumlahberkas: 20,
    pnbp: 20,
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
    label: "Wilayah",
    value: "wilayah",
    isFixed: false,
    isLabel: true,
  },
  {
    label: "PNBP",
    value: "pnbp",
    isFixed: true,
    isLabel: true,
  },
  {
    label: "Jumlah Berkas",
    value: "jumlahberkas",
    isFixed: false,
    isLabel: true,
  },
];

const PnbpBerkasWilayah = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const berkasPnbpWilayah = useSelector(
    (state) => state.pnbp.berkasPnbpWilayah
  );
  const berkasPnbpKantor = useSelector((state) => state.pnbp.berkasPnbpKantor);
  const [years, setYears] = useState("2017");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [semester, setSemester] = useState(2);
  const [bulan, setBulan] = useState("Nov");
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
  const [dataFilter, setDataFilter] = useState([
    "Kantor Wilayah Provinsi Jawa Barat",
    "Kantor Wilayah Provinsi Jambi",
  ]);
  const [dataFilterKantor, setDataFilterKantor] = useState([
    "Kantor Pertanahan Kabupaten Bandung",
  ]);
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

  const handleChangeFilter = (event) => {
    setDataFilter(event.target.value);
  };

  const handleChangeFilterKantor = (event) => {
    setDataFilterKantor(event.target.value);
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "PNBP dan jumlah berkas per Kegiatan",
      data,
      ".xlsx"
    );
  };

  const getData = () => {
    let temp = { kantor: [], wilayah: [] };
    temp.kantor = dataFilterKantor;
    temp.wilayah = dataFilter;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Aset&Keuangan/PNBP/sie_pnbp_berkas?tahun=${years}&semeter=${semester}&bulan=${bulan}`,
        temp
      )
      .then(function (response) {
        setData(response.data.data.length != 0 ? response.data.data : dataTemp);
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
    dispatch(getBerkasPnbpWilayahFilter());
    dispatch(getBerkasPnbpKantorFilter());
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  const handleChangeBulan = (event) => {
    setBulan(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
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

  const DataFormaterX = (value) => {
    return value.includes("Kantor Pertanahan")
      ? value.replace("Kantor Pertanahan ", "")
      : value.replace("Kantor Wilayah Provinsi ", "");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">{label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`PNBP : Rp ${payload[0].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
          <p
            className="desc"
            style={{ color: payload[1].color }}
          >{`Jumlah Berkas : ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
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
          <ComposedChart
            width={500}
            height={400}
            data={dataModal.grafik}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              dataKey="wilayah"
              scale="band"
              // angle={60}
              interval={0}
              tick={{
                // angle: 90,
                // transform: "rotate(-35)",
                // textAnchor: "start",
                // dominantBaseline: "ideographic",
                fontSize: 8,
              }}
              height={100}
              tickFormatter={DataFormaterX}
            />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Jumlah Nilai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="pnbp" barSize={20} fill="#413ea0" />
            <Line type="jumlahberkas" dataKey="jumlahberkas" stroke="#ff7300" />
          </ComposedChart>
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
                    <StyledTableCell align="left">{item}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataModal.grafik
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.wilayah}>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.wilayah}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Rp{" "}
                        {row.pnbp
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.jumlahberkas}
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

  let columnTable = [
    {
      label: "wilayah",
      isFixed: false,
    },
    {
      label: "pnbp",
      isFixed: false,
    },
    {
      label: "jumlahberkas",
      isFixed: true,
    },
  ];

  let grafikView = [
    {
      dataKey: "pnbp",
      fill: "#413ea0",
    },
  ];

  let axis = {
    xAxis: "wilayah",
    yAxis: "Jumlah Nilai PNBP dan berkas",
  };
  const title = " PNBP dan jumlah berkas per Kegiatan";
  const handlePrint = () => {
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
        columnTable: columnTable,
        title: title,
        grafik: null,
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
                  BASE_URL.path.pnbp_berkas_wilayah +
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
                  BASE_URL.path.pnbp_berkas_wilayah +
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
                BASE_URL.domain + "/embed/" + BASE_URL.path.pnbp_berkas_wilayah
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
        <Grid item xs={6}>
          <Typography className={classes.titleSection} variant="h2">
            PNBP dan jumlah berkas per Kegiatan
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
                    title: "PNBP dan jumlah berkas per Kegiatan",
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
                    nameColumn: ["Wilayah", "PNBP", "Jumlah Berkas"],
                    listTop10Comment: comment.listTop10Comment,
                  })
                }
              >
                <IoEye />
              </IconButton>
            </TooltipMI>
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
        <Grid item xs={4}>
          <div style={{ margin: 10, marginRight: 25 }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={4}>
                {/* <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Tahun
                </Typography> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="demo-simple-select-outlined-label">
                    Tahun
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={years}
                    onChange={handleChange}
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
              <Grid item xs={12} sm={4}>
                {/* <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Bulan
                </Typography> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="demo-simple-select-outlined-label">
                    Bulan
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={bulan}
                    onChange={handleChangeBulan}
                    label="Bulan"
                    className={classes.selectStyle}
                  >
                    {bulanData.map((item, i) => {
                      return (
                        <MenuItem value={item.id} key={i}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Semester
                </Typography> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="demo-simple-select-outlined-label">
                    Semester
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={semester}
                    onChange={handleChangeSemester}
                    label="Semester"
                    className={classes.selectStyle}
                  >
                    {semesterData.map((item, i) => {
                      return (
                        <MenuItem value={item.id} key={i}>
                          {item.name}
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
              <Grid item xs={4}>
                {/* <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kantor
                </Typography> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                    htmlFor="outlined-Name"
                  >
                    Kantor
                  </InputLabel>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilterKantor}
                    onChange={handleChangeFilterKantor}
                    label="Kantor"
                    className={classes.selectStyle}
                    renderValue={(selected) => `${selected.length} Terpilih`}
                  >
                    {berkasPnbpKantor.map((item, i) => {
                      return (
                        <MenuItem value={item.kantor} key={i}>
                          <Checkbox
                            checked={dataFilterKantor.indexOf(item.kantor) > -1}
                          />
                          <ListItemText primary={item.kantor} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {/* <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Wilayah
                </Typography> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                    htmlFor="outlined-Name"
                  >
                    Wilayah
                  </InputLabel>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilter}
                    onChange={handleChangeFilter}
                    label="Wilayah"
                    className={classes.selectStyle}
                    renderValue={(selected) => `${selected.length} Terpilih`}
                  >
                    {berkasPnbpWilayah.map((item, i) => {
                      return (
                        <MenuItem value={item.wilayah} key={i}>
                          <Checkbox
                            checked={dataFilter.indexOf(item.wilayah) > -1}
                          />
                          <ListItemText primary={item.wilayah} />
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
                      title: "PNBP dan jumlah berkas per Kegiatan",
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
                      nameColumn: ["Wilayah", "PNBP", "Jumlah Berkas"],
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
                  <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis
                      dataKey="wilayah"
                      scale="band"
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
                    />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Jumlah Nilai"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="pnbp" barSize={20} fill="#413ea0" />
                    <Line
                      type="jumlahberkas"
                      dataKey="jumlahberkas"
                      stroke="#ff7300"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PnbpBerkasWilayah;
