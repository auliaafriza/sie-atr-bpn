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

const dataTemp = [
  {
    kantor: "",
    jumlah_ht: 0,
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
    value: "kantor",
    isLabel: true,
  },
  {
    label: "Jumlah Hak Tanggungan",
    value: "jumlah_ht",
  },
];

let columnTable = [
  {
    label: "kantor",
    isFixed: false,
  },
  {
    label: "jumlah_ht",
    isFixed: false,
  },
];

let grafikView = [
  {
    dataKey: "jumlah_ht",
    fill: "#065535",
    name: "Jumlah Hak Tanggungan",
  },
];

let axis = {
  xAxis: "Kantor",
  yAxis: "Jumlah Hak Tanggungan",
};
const title = "Jumlah Hak Tanggungan Elektronik per Kantor";
const SieHtJumlahKantorTahun = () => {
  const classes = styles();
  const [years, setYears] = useState("2021");
  const [data, setData] = useState(dataTemp);
  const [semester, setSemester] = useState(2);
  const [bulan, setBulan] = useState("07");
  const [comment, setComment] = useState("");
  const [dataFilter, setDataFilter] = useState([
    "",
    "Kantor Pertanahan Kabupaten Kampar",
  ]);
  const [listKantor, setListKantor] = useState([]);
  // const [kanwil, setKanwil] = useState(
  //   "Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional "
  // );
  // const [kantor, setKantor] = useState("Jawa Tengah");
  // const [satker, setSatker] = useState(
  //   "Kantor Pertanahan Kabupaten Purbalingga "
  // );
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

  // const dispatch = useDispatch();
  // const satkerRed = useSelector((state) => state.globalReducer.satker);

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

  const getKantor = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/HakTanggunganElektronik/sie_ht_jumlah_kantor_tahun_filter_kantor`
      )
      .then(function (response) {
        const listKantorApi = response.data.data;

        setListKantor(listKantorApi);
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
    let temp = { kantor: [] };
    temp.kantor = dataFilter;

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Sertifikasi/HakTanggunganElektronik/sie_ht_jumlah_kantor_tahun?tahun=${years}&bulan=${bulan}&semester=${semester}`,
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
    getKantor();
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
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
          <p className="label">Kantor {label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Jumlah Hak Tanggungan : ${payload[0].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
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
            <XAxis dataKey="kantor"></XAxis>
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
                    <StyledTableRow key={row.kantor}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.kantor}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.jumlah_ht
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
    setSemester(event.target.value);
  };
  const handleChangeBulan = (event) => {
    setBulan(event.target.value);
  };
  const handleChangeFilter = (event) => {
    setDataFilter(event.target.value);
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
                <FormControl className={classes.formControl}>
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
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Bulan
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={bulan}
                    onChange={handleChangeBulan}
                    label="Bulan"
                    className={classes.selectStyle}
                    disableUnderline
                  >
                    {bulanDataNumberic.map((item, i) => {
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
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Semester
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={semester}
                    onChange={handleChangeSemester}
                    label="Semester"
                    className={classes.selectStyle}
                    disableUnderline
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
              <Grid item xs={4}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kantor
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    multiple
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dataFilter}
                    onChange={handleChangeFilter}
                    label="Kantor"
                    className={classes.selectStyle}
                    renderValue={(selected) => {
                      if (selected.length > 1)
                        return `${selected.length - 1} Terpilih`;
                      else if (selected[0] == "") return "Kantor";
                    }}
                    disableUnderline
                  >
                    <MenuItem value="" disabled>
                      Kantor
                    </MenuItem>
                    {listKantor.map((item, i) => {
                      return (
                        <MenuItem value={item.kantor} key={i}>
                          <Checkbox
                            checked={dataFilter.indexOf(item.kantor) > -1}
                          />
                          <ListItemText primary={item.kantor} />
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
                  onClick={() => getData()}
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
                    <XAxis dataKey="kantor"></XAxis>
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
