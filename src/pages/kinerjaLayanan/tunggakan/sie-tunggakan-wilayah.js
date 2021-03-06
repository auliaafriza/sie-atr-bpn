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
import styles from "../styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  tahunDataV2,
  DataFormater,
  deleteDuplicates,
} from "../../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../config/embed_conf";
import { url } from "../../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getKantorPNBP } from "../../../actions/pnbpAction";
import { isMobile } from "react-device-detect";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataTemp = [
  {
    label: "p2015",
    2015: "0",
    2016: "0",
    2017: "10",
    2018: "10",
  },
  {
    label: "p2016",
    2015: "10",
    2016: "10",
    2017: "20",
    2018: "20",
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

let nameColumnTemp = [
  {
    label: "",
    value: "",
    isFixed: false,
    isLabel: false,
  },
];

let columnTableTemp = [
  {
    label: "",
    isFixed: false,
  },
];

let colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#800000",
  "#00CED1",
  "#C71585",
  "#B0C4DE",
  "#FA8072",
  "#808000",
  "#006400",
  "#2F4F4F",
  "#6495ED",
  "#4B0082",
  "#FFB6C1",
  "#BC8F8F",
];

let grafikViewTemp = [
  {
    dataKey: "",
    fill: "",
  },
];

let axis = {
  xAxis: "label",
  yAxis: "Nilai Tunggakan",
};

const KepegawaianBpnJabatan = () => {
  const classes = styles();
  const [dataFilter, setDataFilter] = useState({
    kode: "09",
    kanwil: "Kantor Wilayah Provinsi DKI Jakarta",
  });
  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const [years, setYears] = useState({ label: "2022", name: 2022 });
  const [tahunAwal, setTahunAwal] = useState({ label: "2017", name: 2017 });
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [kanwil, setKanwil] = useState({ kanwil: "" });
  const [kantor, setKantor] = useState({ kantor: "" });
  const [satker, setSatker] = useState({ satker: "" });
  const [grafikView, setGrafikView] = useState([]);
  const [columnTable, setColumnTable] = useState([]);
  const [nameColumn, setNameColumn] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataFilterKantor, setDataFilterKantor] = useState([]);
  const [listKantor, setListKantor] = useState([]);

  const [hideTextKantor, setHideTextKantor] = useState(false);
  const [openWilayah, setOpenWilayah] = useState(false);
  const [openKantah, setOpenKantah] = useState(false);
  const [openTahunAkhir, setOpenTahunAkhir] = useState(false);
  const [openTahun, setOpenTahun] = useState(false);
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

  const [profileList, setProfileList] = useState([]);

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
    // if (event.length != 0) {
    //   setDataFilter([
    //     ...dataFilter,
    //     ...event.filter((option) => dataFilter.indexOf(option) === -1),
    //   ]);
    // } else {
    //   setDataFilter([]);
    // }
    getKantah(
      event
        ? event.aliaskanwil == "pilih semua" || event.aliaskanwil == "-"
          ? ""
          : event.aliaskanwil
        : ""
    );
    setDataFilter(event);
    setDataFilterKantor([]);
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

  const handleChangeFilterKantor = (event) => {
    if (event.length != 0) {
      let findTemp =
        event && event.length != 0 ? findAll(event, "aliaskantah") : false;
      let indexTemp = findIndex(event, "aliaskantah");
      let res = findTemp
        ? deleteDuplicates(event, "aliaskantah")
        : [event[indexTemp]];
      setDataFilterKantor(res);
    } else {
      setDataFilterKantor([]);
    }
  };

  const chunkArrayInGroups = (arr, size) => {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  };

  const getDataKey = (data) => {
    let temp = [];
    data.map((item) => temp.push(item[0].tahun));
    return temp;
  };

  const convertdata = (data) => {
    let temp = [
      {
        label: "p2015",
      },
      {
        label: "p2016",
      },
      {
        label: "p2017",
      },
      {
        label: "p2018",
      },
      {
        label: "p2019",
      },
      {
        label: "p2020",
      },
      {
        label: "p2021",
      },
    ];
    let mapData = chunkArrayInGroups(data, 7);
    mapData.map((item, i) => {
      item.map((dataItem, i) => {
        if (dataItem.tahuntunggakan == "p2015") {
          temp[0][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2016") {
          temp[1][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2017") {
          temp[2][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2018") {
          temp[3][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2019") {
          temp[4][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2020") {
          temp[5][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2021") {
          temp[6][dataItem.tahun] = dataItem.nilai;
        } else if (dataItem.tahuntunggakan == "p2015") {
          temp[7][dataItem.tahun] = dataItem.nilai;
        }
      });
    });
    return temp;
  };

  const prepareDataCol = (data) => {
    let dataKey = chunkArrayInGroups(data, 7);
    let keyDaya = getDataKey(dataKey);
    let grafik = [];
    let col = [];
    let name = [];
    keyDaya && keyDaya.length != 0
      ? keyDaya.map((item, i) => {
          let tempGrafik = { ...grafikViewTemp };
          tempGrafik.dataKey = item;
          tempGrafik.fill = colors[i];
          grafik.push(tempGrafik);
          let tempCol = { ...columnTableTemp };
          tempCol.label = item;
          tempCol.isFixed = false;
          col.push(tempCol);
          let tempName = { ...nameColumnTemp };
          tempName.label = item;
          tempName.value = item;
          tempName.isFixed = false;
          tempName.isLabel = false;
          name.push(tempName);
        })
      : null;
    setGrafikView(grafik);
    setColumnTable(col);
    setNameColumn(name);
  };

  const getKantah = (data) => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}KinerjaLayanan/Tunggakan/filter_aliaskantah?aliaskanwil=${data}`
      )
      .then(function (response) {
        setListKantor(response.data.data);
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
      kanwil: [],
      kantah: [],
    };
    dataFilter &&
    dataFilter.kanwil &&
    dataFilter.kanwil != "pilih semua" &&
    dataFilter.kanwil != "-"
      ? temp.kanwil.push(dataFilter.kanwil)
      : [];
    // dataFilter && dataFilter.length != 0
    //   ? dataFilter.map((item) => temp.kanwil.push(item.kanwil))
    //   : [];
    dataFilterKantor && dataFilterKantor.length != 0
      ? dataFilterKantor.map((item) => temp.kantah.push(item.aliaskantah))
      : [];
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}KinerjaLayanan/Tunggakan/Kanwil?tahunAwal=${
          tahunAwal ? tahunAwal.name : ""
        }&tahunAkhir=${years ? years.name : ""}`,
        temp
      )
      .then(function (response) {
        setData(convertdata(response.data.data));
        prepareDataCol(response.data.data);
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
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}KinerjaLayanan/Tunggakan/tunggakan_filter_namaprofile`)
      .then(function (response) {
        setProfileList(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    getKantah(dataFilter ? dataFilter.kanwil : "");
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event);
  };

  const handleChangeAwal = (event) => {
    setTahunAwal(event);
  };

  const convertLabelTooltip = (label) => {
    let data = label.split(/(\d+)/);
    return data[0] == "p"
      ? `Penyelesaian ${data[1]}`
      : `Penyelesaian ${data[0]}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">
            Tahun {label ? convertLabelTooltip(label) : label}
          </p>
          {payload && payload.length != 0
            ? payload.map((item, i) => (
                <p
                  className="desc"
                  style={{ color: item.color }}
                >{`${item.name} : ${item.value}`}</p>
              ))
            : null}
        </div>
      );
    }

    return null;
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Data Tunggakan per Wilayah",
      data,
      ".xlsx"
    );
  };

  const DataFormaterX = (val) => {
    return val ? val.slice(1, 5) : val;
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
            <XAxis dataKey="label" tickFormatter={DataFormaterX}></XAxis>
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai Tunggakan"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {grafikView.map((grafikItem, i) => {
              return (
                <Bar
                  dataKey={grafikItem.dataKey}
                  stackId="a"
                  fill={grafikItem.fill}
                />
              );
            })}
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
                {data.map((row, i) => (
                  <StyledTableRow key={i}>
                    {columnTable.map((item) => {
                      return item.isFixed ? (
                        <StyledTableCell align="center">
                          Rp{" "}
                          {row[item.label]
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </StyledTableCell>
                      ) : axis.xAxis == "bulan" && isFinite(item.label) ? (
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {NamaBulan[row[item.label] + 1]}
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

  const handlePrintData = (title, columnTable) => {
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
        columnTable: columnTable,
        title: title,
        grafik: "barGroup",
        nameColumn: nameColumn,
        grafikView: grafikView,
        axis: axis,
      },
      target: "_blank",
    });
  };

  const handleChangeKantor = (event) => {
    setKantor(event);
  };

  const handleChangeKanwil = (event) => {
    setKanwil(event);
  };

  const handleChangeSatket = (event) => {
    setSatker(event);
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
                  BASE_URL.path.sie_tunggakan_wilayah +
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
                  BASE_URL.path.sie_tunggakan_wilayah +
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
                BASE_URL.path.sie_tunggakan_wilayah
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
        <Grid item xs={isMobile ? 12 : 6}>
          <Typography className={classes.titleSection} variant="h2">
            Data Tunggakan per Wilayah
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
                    title: "Data Tunggakan per Wilayah ",
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
                handlePrintData("Data Tunggakan per Wilayah", columnTable)
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
                  Tahun Awal
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
                    handleChangeAwal(newValue);
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
                  value={tahunAwal}
                  defaultValue={tahunAwal}
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
                  Tahun Akhir
                </Typography>
                <Autocomplete
                  id="tahun"
                  open={openTahunAkhir}
                  onOpen={() => {
                    setOpenTahunAkhir(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenTahunAkhir(false)
                      : setOpenTahunAkhir(true)
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
                    if (reason == "input") setOpenTahunAkhir(true);
                    else {
                      setOpenTahunAkhir(false);
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
                  //   return `${selected.length} Terpilih`;
                  // }}
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
                    } else {
                      setOpenWilayah(false);
                    }
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
                      placeholder={"Pilih Wilayah"}
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
                  getOptionDisabled={(options) =>
                    dataFilterKantor.length >= 32 ? true : false
                  }
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
                  options={listKantor}
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
                  getOptionLabel={(option) => option.aliaskantah || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={
                          dataFilterKantor && dataFilterKantor.length != 0
                            ? findAll(dataFilterKantor, "aliaskantah")
                              ? dataFilterKantor
                                  .map((item) => item.aliaskantah)
                                  .indexOf(option.aliaskantah) > -1
                              : true
                            : false
                        }
                      />
                      {option.aliaskantah}
                    </React.Fragment>
                  )}
                  renderTags={(selected) => {
                    return selected.length != 0
                      ? hideTextKantor
                        ? ""
                        : findAll(selected, "aliaskantah")
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
              comment.lastComment.analisisData.length > 100 ? (
                <Link
                  href="#"
                  onClick={() =>
                    handleOpen({
                      title: "Data Tunggakan per Wilayah ",
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
            xs={10}
          >
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ marginTop: 10 }}
            >
              Data Tunggakan per Wilayah berdasar{" "}
              {dataFilter &&
              dataFilter.kanwil &&
              dataFilter.kanwil != "pilih semua" &&
              dataFilter.kanwil != "-"
                ? dataFilter.kanwil
                : ""}
            </Typography>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ marginBottom: 15 }}
            >
              pada Tahun {tahunAwal ? tahunAwal.name : ""}-
              {years ? years.name : ""}
            </Typography>
          </Grid>
          <Card
            className={isMobile ? classes.rootMobile : classes.root}
            variant="outlined"
          >
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
                    <XAxis dataKey="label" tickFormatter={DataFormaterX} />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Nilai Tunggakan"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {grafikView.map((grafikItem, i) => {
                      return (
                        <Bar
                          dataKey={grafikItem.dataKey}
                          stackId="a"
                          fill={grafikItem.fill}
                        />
                      );
                    })}
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

export default KepegawaianBpnJabatan;
