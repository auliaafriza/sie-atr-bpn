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
  PieChart,
  Pie,
  Sector,
  Cell,
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
  ClickAwayListener,
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
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CheckBoxOutlineBlank,
  CheckBox as CheckBoxIcon,
  Event,
} from "@material-ui/icons/";
import { isMobile } from "react-device-detect";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

import { getKantorPNBP, getWilayahPNBP } from "../../../actions/pnbpAction";

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

const dataTemp = [{ name: "Hak Guna Bangunan", value: 0 }];

let axis = {
  xAxis: "name",
  yAxis: "Nilai",
};
const title = "Sertipikat Diagunkan";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`Jumlah Sertipikat: ${
          value
            ? value % 1 == 0
              ? value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
            : value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        }`}
      </text>
    </g>
  );
};

const SieSertifikatLuasJumlah = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const [years, setYears] = useState({ label: "2020", name: 2020 });
  const [tahunAkhir, setTahunAkhir] = useState("2019");
  const [openWilayah, setOpenWilayah] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [openTahun, setOpenTahun] = useState(false);
  const [inputValueTahun, setInputValueTahun] = useState("");

  const [dataFilter, setDataFilter] = useState({
    kanwil: "Aceh",
  });
  const [dataFilterKantor, setDataFilterKantor] = useState();
  const [kanwilList, setAliasList] = useState([]);
  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

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
  const inputRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState(dataTemp);
  const nameColumn = [
    {
      label: "Nama",
      value: "name",
      isLabel: false,
    },
    { label: "Jumlah Sertipikat", isFixed: false, value: "value" },
  ];

  const grafikView = [
    { dataKey: "value", name: "Jumlah Sertipikat", fill: "#8884d8" },
  ];

  const columnTable = [
    {
      label: "name",
      isFixed: false,
    },
    {
      label: "value",
      isFixed: false,
    },
  ];

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
    let temp = { kodeWilayah: [] };
    event && event.kode != "-" ? temp.kodeWilayah.push(event.kode) : null;
    getListKantor(temp);
    setDataFilter(event);
    setDataFilterKantor(null);
  };

  const handleChangeFilterKantor = (event) => {
    setDataFilterKantor(event);
  };

  const convertDataPie = (data) => {
    let res = [];
    data && data.length != 0
      ? res.push(
          { name: "Sudah diroya", value: data[0].sudah_roya },
          { name: "Sedang Diagunkan", value: data[0].belum_roya }
        )
      : res.push(
          { name: "Sudah diroya", value: 0 },
          { name: "Sedang Diagunkan", value: 0 }
        );
    return res;
  };

  const getData = () => {
    let temp = { kantah: [], kanwil: [] };
    dataFilterKantor && dataFilterKantor.kantor
      ? dataFilterKantor.kantah == "pilih semua" ||
        dataFilterKantor.kantah == "-"
        ? []
        : temp.kantah.push(dataFilterKantor.kantah)
      : [];
    dataFilter && dataFilter.kanwil
      ? dataFilter.kanwil == "pilih semua" || dataFilter.kanwil == "-"
        ? []
        : temp.kanwil.push(dataFilter.kanwil)
      : [];
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}Sertifikasi/StatistikSertifikat/sie_psn_roya_blm_roya?tahun=${
          years ? years.name : ""
        }`,
        temp
      )
      .then(function (response) {
        let dataTemp = convertDataPie(response.data.data);
        setData(dataTemp);
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
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Sertifikasi/StatistikSertifikat/sie_psn_roya_blm_roya_filter_kanwil`
      )
      .then(function (response) {
        setAliasList(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    let temp = { kodeWilayah: [] };
    dataFilter && dataFilter.kode && temp.kodeWilayah.push(dataFilter.kode);
    getListKantor(temp);
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event);
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
          {payload.map((e, i) => (
            <div key={i}>
              <p
                className="desc"
                style={{ color: e.payload.fill }}
              >{`${e.name} : ${e.value}`}</p>
            </div>
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
          <PieChart width={400} height={400}>
            {/* <Pie
              dataKey="jml_srtifikat"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            /> */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              // isAnimationActive={false}
              // label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* <Tooltip content={<CustomTooltip />} /> */}
          </PieChart>
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
                  .map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.value}
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
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
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
                  Pilih Wilayah
                </Typography>
                <Autocomplete
                  // multiple
                  id="kantor"
                  // getOptionDisabled={(options) =>
                  //   dataFilter.length >= 32 ? true : false
                  // }
                  open={openWilayah}
                  onOpen={() => {
                    setOpenWilayah(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenWilayah(false)
                      : setOpenWilayah(true)
                  }
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
                  options={kanwilList}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  onChange={(event, newValue) => {
                    handleChangeFilter(newValue);
                  }}
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") setOpenWilayah(true);
                    else {
                      setOpenWilayah(false);
                    }
                  }}
                  getOptionLabel={(option) => option.kanwil || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      {/* <Checkbox
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
                      /> */}
                      {option.kode}
                      {"  "}
                      {option.kanwil}
                    </React.Fragment>
                  )}
                  // renderTags={(selected) => {
                  //   return selected.length != 0
                  //     ? hideText
                  //       ? ""
                  //       : `${selected.length} Terpilih`
                  //     : "";
                  // }}
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
                      placeholder={"Pilih Wilayah"}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={isMobile ? 12 : 6}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kantah
                </Typography>
                <Autocomplete
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 35  }}
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
                  getOptionLabel={(option) => option.kantor || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      {option.kode}
                      {"  "}
                      {option.kantor}
                    </React.Fragment>
                  )}
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
                      placeholder={"Pilih Kantah"}
                    />
                  )}
                />
              </Grid> */}
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
        <Grid item xs={isMobile ? 12 : 9} style={{ margin: isMobile ? 20 : 0 }}>
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
              Sertipikat diagunkan
            </Typography>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
            >
              di{" "}
              {dataFilterKantor && dataFilterKantor.kantor
                ? dataFilterKantor.kantor
                : dataFilter && dataFilter.kanwil
                ? dataFilter.kanwil
                : ""}{" "}
              Tahun {years ? years.label : ""}
            </Typography>
          </Grid>
          <Card
            className={isMobile ? classes.rootMobile : classes.root}
            variant="outlined"
          >
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      // isAnimationActive={false}
                      // label
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    {/* <Tooltip content={<CustomTooltip />} /> */}
                  </PieChart>
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
