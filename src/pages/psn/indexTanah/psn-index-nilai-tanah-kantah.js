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
  AreaChart,
  Area,
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
  Checkbox,
  Input,
  TablePagination,
  Button,
  TextField,
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
import { useScreenshot } from "use-react-screenshot";
import html2canvas from "html2canvas";
import moment from "moment";
import {
  tahunDataV2,
  deleteDuplicates,
} from "../../../functionGlobal/globalDataAsset";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../config/embed_conf";
import { url } from "../../../api/apiClient";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { isMobile } from "react-device-detect";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const dataTemp = [
  {
    keterangan: "Keterangan",
    nilai: 0,
  },
  {
    keterangan: "Keterangan",
    nilai: 10,
  },
];

let nameColumn = [
  {
    label: "Tahun",
    value: "tahun",
    isFixed: false,
    isLabel: true,
  },
  {
    label: "Kantah",
    value: "aliaskantah",
    isFixed: false,
    isLabel: true,
  },
  {
    label: "Nilai Tanah",
    value: "nilai_tanah",
    isFixed: false,
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

const realisasiPenggunaan = () => {
  const classes = styles();

  const dispatch = useDispatch();
  const [kantahList, setKantahList] = useState([]);
  const [aliasList, setAliasList] = useState([]);
  const [years, setYears] = useState({ label: "2017", name: 2017 });
  const [yearsEnd, setYearsEnd] = useState({ label: "2021", name: 2021 });
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [bulan, setBulan] = useState("Jan");
  const [open, setOpen] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    aliaskanwil: "Kantor Wilayah Provinsi DKI Jakarta",
  });
  const [dataFilterKantor, setDataFilterKantor] = useState([
    { aliaskantah: "Kantor Pertanahan Kota Administrasi Jakarta Selatan" },
    { aliaskantah: "Kantor Pertanahan Kota Administrasi Jakarta Utara" },
  ]);
  const [dataMulti, setMultiData] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataObject, setDataObject] = useState([]);

  const [openWilayah, setOpenWilayah] = useState(false);
  const [openKantah, setOpenKantah] = useState(false);
  const [openTahunAkhir, setOpenTahunAkhir] = useState(false);
  const [openTahun, setOpenTahun] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);
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
  const [indexTanah, setIndexTanah] = useState("");
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

  const DataFormaterX = (val) => {
    return val && val.indexOf("Kantor Pertanahan Kota Administrasi") > -1
      ? val.replace("Kantor Pertanahan Kota Administrasi ", "Adm ")
      : val && val.indexOf("Kantor Pertanahan Kota") > -1
      ? val.replace("Kantor Pertanahan Kota ", "")
      : val && val.indexOf("Kantor Pertanahan Kabupaten Administrasi") > -1
      ? val.replace("Kantor Pertanahan Kabupaten Administrasi ", "Kab Adm")
      : val && val.indexOf("Kantor Pertanahan Kabupaten") > -1
      ? val.replace("Kantor Pertanahan Kabupaten ", "Kab ")
      : val && val.indexOf("Kantor Pertanahan") > -1
      ? val.replace("Kantor Pertanahan ", "")
      : val && val.indexOf("Kantor Wilayah Provinsi") > -1
      ? val.replace("Kantor Wilayah Provinsi ", "")
      : val;
  };

  const getKantah = (data) => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}ProgramStrategisNasional/indexTanah/sie_psn_index_pertumbuhan_nilai_tanah_filter_aliaskantah?AliasKanwil=${data}`
      )
      .then(function (response) {
        setKantahList(response.data.data);
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

  const handleChangeFilter = (event) => {
    event &&
    event.aliaskanwil &&
    event.aliaskanwil != "pilih semua" &&
    event.aliaskanwil != "-"
      ? getKantah(event.aliaskanwil)
      : null;
    setDataFilterKantor([]);
    setDataFilter(event);
  };

  const handleChangeFilterKantor = (event) => {
    if (event.length != 0) {
      let res = deleteDuplicates(event, "aliaskantah");
      setDataFilterKantor(res);
    } else {
      setDataFilterKantor([]);
    }
  };

  const findAll = (data) => {
    let found = data.find(
      (element) => element.aliaskantah == "pilih semua" || element == "-"
    );
    return found ? false : true;
  };

  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );

  // const convertDataNew = (data) => {
  //   let resData = groupBy(data, "tahun");
  //   let key = Object.keys(resData);
  //   let res = [];
  //   key &&
  //     key.length != 0 &&
  //     key.map((item) => {
  //       let z = { tahun: item };
  //       resData[item].map((x, y) => {
  //         let keyString = x.aliaskantah.split(" ").join("_");
  //         z[keyString] = x.nilai_tanah;
  //       });
  //       res.push(z);
  //     });
  //   return res;
  // };

  const convertDatabar = (data) => {
    let resData = groupBy(data, "aliaskantah");
    let key = Object.keys(resData);
    let res = [];
    key &&
      key.length != 0 &&
      key.map((item) => {
        let z = { name: item };
        resData[item].map((x, y) => {
          let keyString = x.tahun;
          z[keyString] = x.nilai_tanah;
        });
        res.push(z);
      });
    return res;
  };

  const getData = () => {
    let temp = { aliaskantah: [], aliaskanwil: [] };
    let foundData =
      dataFilterKantor && dataFilterKantor.length != 0
        ? findAll(dataFilterKantor)
        : false;
    foundData
      ? dataFilterKantor.map((item) => temp.aliaskantah.push(item.aliaskantah))
      : [];
    dataFilter && dataFilter.aliaskanwil
      ? dataFilter.aliaskanwil == "pilih semua" || dataFilter.aliaskanwil == "-"
        ? []
        : temp.aliaskanwil.push(dataFilter.aliaskanwil)
      : [];

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}ProgramStrategisNasional/indexTanah/sie_psn_pertumbuhan_nilai_tanah?tahunAkhir=${
          yearsEnd ? yearsEnd.name : ""
        }&tahunAwal=${years ? years.name : ""}`,
        temp
      )
      .then(function (response) {
        setData(response.data.data);
        setComment(response.data);
        setIndexTanah(response.data.indexNilaiTanah);
        setMultiData(response.data.dataMultiChart);
        let temp =
          response.data && response.data.data && response.data.data.length != 0
            ? convertDatabar(response.data.data)
            : [];
        setDataBar(temp);
        let key = Object.keys(temp[0]);
        setDataObject(key);

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
      .get(
        `${url}ProgramStrategisNasional/indexTanah/sie_psn_index_pertumbuhan_nilai_tanah_filter_aliaskanwil`
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
    getKantah(
      dataFilter && dataFilter.aliaskanwil ? dataFilter.aliaskanwil : ""
    );
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event);
  };

  const handleChangeEnd = (event) => {
    setYearsEnd(event);
  };

  const handleChangeBulan = (event) => {
    setBulan(event.target.value);
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Pertumbuhan Nilai Tanah per Kantah",
      data,
      ".xlsx"
    );
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
          <p className="desc" style={{ color: "black" }}>
            {label}
          </p>
          {payload && payload.length != 0
            ? payload.map((item, i) => (
                <p className="desc" style={{ color: item.color }}>{`${
                  item.payload.aliaskantah
                } : Nilai Tanah ${
                  item.value
                    ? item.value
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                    : 0
                }`}</p>
              ))
            : null}
        </div>
      );
    }

    return null;
  };

  const CustomTooltipBar = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="desc" style={{ color: "black" }}>
            {label.split("_").join(" ")}
          </p>
          {payload && payload.length != 0
            ? payload.map((item, i) => (
                <>
                  <p
                    className="desc"
                    style={{ color: item.color }}
                  >{`Tahun ${item.name.split("_").join(" ")}`}</p>
                  <p
                    className="desc"
                    style={{ color: item.color }}
                  >{`Nilai Tanah : ${
                    item.value
                      ? item.value
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                      : 0
                  }`}</p>
                </>
              ))
            : null}
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={10}
      >
        <Typography className={classes.isiContentTextStyle} variant="h2" wrap>
          Nilai Tanah
        </Typography>
        <Typography className={classes.isiContentTextStyle} variant="h2" wrap>
          di{" "}
          {dataFilter && dataFilter.aliaskanwil ? dataFilter.aliaskanwil : ""}{" "}
          Tahun {years ? years.name : ""} - {yearsEnd ? yearsEnd.name : ""}
        </Typography>
      </Grid>
      <div className={classes.barChart}>
        {/* <img width={500} src={image} /> */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            width={500}
            height={300}
            // data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun" />
            <YAxis
              tickFormatter={DataFormater}
              dataKey="nilai_tanah"
              type="category"
              allowDuplicatedCategory={false}
            >
              <Label
                value="Nilai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            {dataMulti.length != 0 &&
              dataMulti.map((s) => (
                <Line
                  dataKey="nilai_tanah"
                  data={s.data}
                  name={s.name}
                  key={s.name}
                />
              ))}
            {/* <Line
                        type="monotone"
                        dataKey="nilai_tanah"
                        stroke="#6EB5FF"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                      /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        className={classes.barChart}
        style={{ marginTop: 30, marginBottom: 0 }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            width={500}
            height={800}
            data={dataBar}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={60}
              // interval={0}
              tick={{
                // angle: 90,
                transform: "rotate(-35)",
                textAnchor: "start",
                dominantBaseline: "ideographic",
                fontSize: 8,
              }}
              height={100}
              tickFormatter={DataFormaterX}
            />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltipBar />} />
            {/* <Legend /> */}
            {dataObject && dataObject.length != 0
              ? dataObject.map(
                  (item, i) =>
                    item != "name" && <Bar dataKey={item} fill={colors[i]} />
                )
              : null}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={isMobile ? 12 : 6}>
          <Card
            className={classes.root}
            variant="outlined"
            style={{ backgroundColor: "rgb(20, 27, 46)" }}
          >
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ margin: 5, fontSize: 14, color: "white" }}
            >
              Rata-rata Pertumbuhan Nilai Tanah:{" "}
              {comment ? comment.pertumbuhan_dalam_persen : 0}% (
              {comment && comment.naik ? "naikk" : "turun"})
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={isMobile ? 12 : 6}>
          <Card
            className={classes.root}
            variant="outlined"
            style={{ backgroundColor: "rgb(20, 27, 46)" }}
          >
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ margin: 5, fontSize: 14, color: "white" }}
            >
              Kenaikan Terbesar pada : {comment ? comment.kantahTertinggi : ""}{" "}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      {dataModal.nameColumn && dataModal.nameColumn.length != 0 ? (
        <>
          <TableContainer
            stickyHeader
            component={Paper}
            style={{ marginTop: 20 }}
          >
            <Table className={classes.table} aria-label="customized table">
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
                    <StyledTableRow key={row.keterangan}>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.tahun}
                      </StyledTableCell>
                      <StyledTableCell align="left" component="th" scope="row">
                        {row.aliaskantah}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.nilai_tanah
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
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
      label: "keterangan",
      isFixed: false,
    },
    {
      label: "nilai",
      isFixed: false,
    },
  ];

  let grafikView = [
    {
      dataKey: "nilai",
      fill: "#6EB5FF",
    },
  ];

  let axis = {
    xAxis: "keterangan",
    yAxis: "Nilai Index",
  };
  const title = " Pertumbuhan Nilai Tanah per Kantah";
  const handlePrint = () => {
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
        columnTable: columnTable,
        title: title,
        grafik: "Bar",
        nameColumn: nameColumn,
        grafikView: grafikView,
        axis: axis,
        option: indexTanah,
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
        // backgroundColor: "rgb(244, 245, 250)",
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
                  BASE_URL.path.sie_index_tanah +
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
                  BASE_URL.path.sie_index_tanah +
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
              src={BASE_URL.domain + "/embed/" + BASE_URL.path.sie_index_tanah}
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
              Pertumbuhan Nilai Tanah per Kantah
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
                      title: "Pertumbuhan Nilai Tanah per Kantah",
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
                      nameColumn: ["Tahun", "Kantah", "Nilai Tanah"],
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
                      handleChangeEnd(newValue);
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
                    value={yearsEnd}
                    defaultValue={yearsEnd}
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
                    Pilih Kanwil
                  </Typography>
                  <Autocomplete
                    // multiple
                    id="label"
                    name="label"
                    style={{ width: "100%", height: 35 }}
                    options={aliasList}
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
                      } else {
                        setOpenWilayah(false);
                      }
                    }}
                    getOptionLabel={(option) => option.aliaskanwil || ""}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        {/* <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={
                            dataFilter && dataFilter.length != 0
                              ? dataFilter
                                  .map((item) => item.aliaskanwil)
                                  .indexOf(option.aliaskanwil) > -1
                              : false
                          }
                        /> */}
                        {option.aliaskanwil}
                      </React.Fragment>
                    )}
                    // renderTags={(selected) => {
                    //   return `${selected.length} Terpilih`;
                    // }}
                    defaultValue={dataFilter}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                        style={{ marginTop: 5 }}
                        placeholder={dataFilter ? "" : "Pilih Kanwil"}
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
                    options={kantahList}
                    classes={{
                      option: classes.option,
                    }}
                    disableUnderline
                    className={classes.formControl}
                    autoHighlight
                    onChange={(event, newValue) => {
                      handleChangeFilterKantor(newValue);
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
                              ? dataFilterKantor
                                  .map((item) => item.aliaskantah)
                                  .indexOf(option.aliaskantah) > -1
                              : false
                          }
                        />
                        {option.aliaskantah}
                      </React.Fragment>
                    )}
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
                        setDataFilterKantor([]);
                      } else {
                        setOpenKantah(false);
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
                    getOptionDisabled={(options) =>
                      dataFilterKantor.length >= 32 ? true : false
                    }
                    defaultValue={dataFilterKantor}
                    value={dataFilterKantor}
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
                    disabled={
                      dataFilter &&
                      dataFilter.aliaskanwil &&
                      dataFilterKantor.length != 0
                        ? false
                        : true
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 9}>
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
              >
                Nilai Tanah
              </Typography>
              <Typography
                className={classes.isiContentTextStyle}
                variant="h2"
                wrap
              >
                di{" "}
                {dataFilter && dataFilter.aliaskanwil
                  ? dataFilter.aliaskanwil
                  : ""}{" "}
                Tahun {years ? years.name : ""} -{" "}
                {yearsEnd ? yearsEnd.name : ""}
              </Typography>
            </Grid>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                      width={500}
                      height={300}
                      // data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="tahun" />
                      <YAxis
                        tickFormatter={DataFormater}
                        dataKey="nilai_tanah"
                        type="category"
                        allowDuplicatedCategory={false}
                      >
                        <Label
                          value="Nilai"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      {/* <Legend /> */}
                      {dataMulti.length != 0 &&
                        dataMulti.map((s) => (
                          <Line
                            dataKey="nilai_tanah"
                            data={s.data}
                            name={s.name}
                            key={s.name}
                          />
                        ))}
                      {/* <Line
                        type="monotone"
                        dataKey="nilai_tanah"
                        stroke="#6EB5FF"
                        activeDot={{ r: 8 }}
                        strokeWidth={3}
                      /> */}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card
              className={classes.root}
              variant="outlined"
              style={{ marginTop: 30 }}
            >
              <CardContent>
                <div className={classes.barChart}>
                  {/* dataBar && dataBar.length != 0 ?  */}
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      width={500}
                      height={800}
                      data={dataBar}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={60}
                        // interval={0}
                        tick={{
                          // angle: 90,
                          transform: "rotate(-35)",
                          textAnchor: "start",
                          dominantBaseline: "ideographic",
                          fontSize: 8,
                        }}
                        height={100}
                        tickFormatter={DataFormaterX}
                      />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Nilai"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltipBar />} />
                      {/* <Legend /> */}
                      {dataObject && dataObject.length != 0
                        ? dataObject.map(
                            (item, i) =>
                              item != "name" && (
                                <Bar dataKey={item} fill={colors[i]} />
                              )
                          )
                        : null}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ paddingTop: 30 }}
            >
              <Grid item xs={isMobile ? 12 : 6}>
                <Card
                  className={classes.root}
                  variant="outlined"
                  style={{ backgroundColor: "rgb(20, 27, 46)" }}
                >
                  <Typography
                    className={classes.isiContentTextStyle}
                    variant="h2"
                    wrap
                    style={{ margin: 5, fontSize: 14, color: "white" }}
                  >
                    Rata-rata Pertumbuhan Nilai Tanah:{" "}
                    {comment ? comment.pertumbuhan_dalam_persen : 0}% (
                    {comment && comment.naik ? "naik" : "turun"})
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={isMobile ? 12 : 6}>
                <Card
                  className={classes.root}
                  variant="outlined"
                  style={{ backgroundColor: "rgb(20, 27, 46)" }}
                >
                  <Typography
                    className={classes.isiContentTextStyle}
                    variant="h2"
                    wrap
                    style={{ margin: 5, fontSize: 14, color: "white" }}
                  >
                    Kenaikan Terbesar pada :{" "}
                    {comment ? comment.kantahTertinggi : ""}{" "}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default realisasiPenggunaan;
