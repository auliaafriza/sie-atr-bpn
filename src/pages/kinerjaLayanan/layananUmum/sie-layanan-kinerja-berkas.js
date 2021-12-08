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
  PieChart,
  Pie,
  Sector,
  Cell,
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

const dataTemp = [
  { name: "Sesuai Durasi", value: 50 },
  { name: "Tidak sesuai Durasi", value: 50 },
];

const dataTempType = [
  {
    sesuaidurasi: 0,
    tidak_sesuai_durasi: 153,
    tipeproduk: "Desa Online",
  },
  {
    sesuaidurasi: 0,
    tidak_sesuai_durasi: 153,
    tipeproduk: "Konsolidasi Tanah Swadaya Massal",
  },
];

const dataTempProsedur = [
  {
    sesuaidurasi: 0,
    tidak_sesuai_durasi: 153,
    namaprosedur: "Blokir",
  },
  {
    sesuaidurasi: 0,
    tidak_sesuai_durasi: 153,
    namaprosedur: "Cassie",
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
        {`Jumlah: ${
          value
            ? value % 1 == 0
              ? value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
              : value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
            : value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
        }%`}
      </text>
    </g>
  );
};

const realisasiPenggunaan = () => {
  const classes = styles();

  const dispatch = useDispatch();
  const [kantahList, setKantahList] = useState([]);
  const [aliasList, setAliasList] = useState([]);
  const [years, setYears] = useState({ tahun: 2015 });
  const [yearsEnd, setYearsEnd] = useState({ label: "2021", name: 2021 });
  const [data, setData] = useState(dataTemp);
  const [dataProsedur, setDataProsedur] = useState(dataTempProsedur);
  const [dataType, setDataType] = useState(dataTempType);
  const [comment, setComment] = useState("");
  const [bulan, setBulan] = useState("Jan");
  const [open, setOpen] = useState(false);
  const [dataFilter, setDataFilter] = useState();
  const [dataFilterKantor, setDataFilterKantor] = useState([]);
  const [dataTahun, setDataTahun] = useState([]);
  const [dataListProsedure, setDataListProsedur] = useState([]);
  const [listProsedure, setListProsedure] = useState();
  const [tempProsedure, setTempProsedure] = useState([]);

  const [openWilayah, setOpenWilayah] = useState(false);
  const [openKantah, setOpenKantah] = useState(false);
  const [openTahunAkhir, setOpenTahunAkhir] = useState(false);
  const [openListProsedure, setOpenListProsedure] = useState(false);
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
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
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

  const DataFormaterX = (value) => {
    return (
      value.replace("Kantor Pertanahan ", "") ||
      value.replace("Kantor Wilayah ", "")
    );
  };

  const getKantah = (data) => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}KinerjaLayanan/Tunggakan/filter_sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_filter_kantah?kanwil=${data}`
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
    event.kanwil &&
    event.kanwil != "pilih semua" &&
    event.kanwil != "-"
      ? getKantah(event.kanwil)
      : null;
    setDataFilterKantor([]);
    setDataFilter(event);
  };

  const handleChangeFilterKantor = (event) => {
    setDataFilterKantor(event);
  };

  const findItem = (data, item) => {
    let found = data.find((element) => element.namaprosedur == item);
    return found ? true : false;
  };

  const filterDataProsedur = (data) => {
    let res = [];
    data && data.length != 0
      ? tempProsedure.map((item) => {
          let findData = findItem(data, item.namaprosedur);
          findData ? res.push(item) : null;
        })
      : null;
    setDataProsedur(res.length != 0 ? res : tempProsedure);
  };

  const handleChangeFilterProsedure = (event) => {
    // if (event.length != 0) {
    //   let res = deleteDuplicates(event, "namaprosedur");
    //   setListProsedure(res);
    //   filterDataProsedur(event);
    // } else {
    //   setListProsedure([]);
    //   filterDataProsedur([]);
    // }
    setListProsedure(event);
  };

  const convertDataPie = (data) => {
    let res = [];
    data && data.length != 0
      ? res.push(
          { name: "Sesuai Durasi", value: data[0].sesuaidurasi },
          { name: "Tidak sesuai Durasi", value: data[0].tidak_sesuai_durasi }
        )
      : res.push(
          { name: "Sesuai Durasi", value: 0 },
          { name: "Tidak sesuai Durasi", value: 0 }
        );
    return res;
  };

  const getListProsedur = (data) => {
    let res = [];
    data && data.length != 0
      ? data.map((item) => res.push({ namaprosedur: item.namaprosedur }))
      : null;
    return res;
  };

  const getData = () => {
    let temp = { kantah: [], kanwil: [] };
    let tempProduk = { kantah: [], kanwil: [], tipeproduk: [] };
    dataFilterKantor && dataFilterKantor.kantah
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
    tempProduk.kantah = temp.kantah;
    tempProduk.kanwil = temp.kanwil;
    listProsedure && listProsedure.tipeproduk
      ? tempProduk.tipeproduk.push(listProsedure.tipeproduk)
      : null;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}KinerjaLayanan/Tunggakan/sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_kinerja_penyelesaian_berkas?tahun=${
          years ? parseInt(years.tahun) : ""
        }`,
        temp
      )
      .then(function (response) {
        setData(convertDataPie(response.data.data));
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
    axios
      .post(
        `${url}KinerjaLayanan/Tunggakan/sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_kinerja_penyelesaian_type_produk?tahun=${
          years ? parseInt(years.tahun) : ""
        }`,
        temp
      )
      .then(function (response) {
        setDataType(response.data.data);
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
    axios
      .post(
        `${url}KinerjaLayanan/Tunggakan/sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_kinerja_penyelesaian_nama_prosedur?tahun=${
          years ? parseInt(years.tahun) : ""
        }`,
        tempProduk
      )
      .then(function (response) {
        setDataProsedur(response.data.data);
        setTempProsedure(response.data.data);
        // setDataListProsedur(getListProsedur(response.data.data));
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

  const getDataProduk = () => {
    let temp = { kantah: [], kanwil: [], tipeproduk: [] };
    dataFilterKantor && dataFilterKantor.kantah
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
    listProsedure && listProsedure.tipeproduk
      ? temp.tipeproduk.push(listProsedure.tipeproduk)
      : null;
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .post(
        `${url}KinerjaLayanan/Tunggakan/sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_kinerja_penyelesaian_nama_prosedur?tahun=${
          years ? parseInt(years.tahun) : ""
        }`,
        temp
      )
      .then(function (response) {
        setDataProsedur(response.data.data);
        setTempProsedure(response.data.data);
        // setDataListProsedur(getListProsedur(response.data.data));
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

  const convertTahun = (data) => {
    let res = [];
    data && data.length != 0
      ? data.map((item) => res.push({ tahun: item.tahun.toString() }))
      : [];
    return res;
  };

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}KinerjaLayanan/Tunggakan/filter_sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_filter_kanwil`
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
    axios
      .get(
        `${url}KinerjaLayanan/Tunggakan/filter_sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_filter_tahun`
      )
      .then(function (response) {
        setDataTahun(convertTahun(response.data.data));
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .get(
        `${url}KinerjaLayanan/Tunggakan/filter_sie_pnbp_penyelesaian_berkas_sesuai_durasi_spopp_filter_tipeproduk`
      )
      .then(function (response) {
        setDataListProsedur(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    getKantah(dataFilter && dataFilter.kanwil ? dataFilter.kanwil : "");
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
      "PNBP Penyelesaian Berkas Sesuai SPOPP",
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
          <p>{label}</p>
          {payload && payload.length != 0
            ? payload.map((item) => (
                <p className="desc" style={{ color: item.color }}>{`${
                  item.name == "sesuaidurasi"
                    ? "sesuai durasi"
                    : "tidak sesuai durasi"
                } : ${
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
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun" />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="nilai_tanah"
              stroke="#6EB5FF"
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
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
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="aliaskantah"
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
              // tickFormatter={DataFormaterX}
            />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Bar dataKey="nilai_tanah" fill="#6EB5FF" />
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
            style={{ backgroundColor: "#A9A9A9" }}
          >
            <Typography
              className={classes.isiContentText}
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
            style={{ backgroundColor: "#A9A9A9" }}
          >
            <Typography
              className={classes.isiContentText}
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
        className={classes.isiContentText}
        variant="h2"
        wrap
        style={{ paddingTop: 20 }}
      >
        {dataModal.analisis}
      </Typography>
      <Typography
        className={classes.isiContentText}
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
  const title = "PNBP Penyelesaian Berkas Sesuai SPOPP";
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
              PNBP Penyelesaian Berkas Sesuai SPOPP
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
                      title: "PNBP Penyelesaian Berkas Sesuai SPOPP",
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
        <Grid container>
          <Grid item xs={isMobile ? 12 : 2}>
            <div style={{ marginRight: 10 }}>
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
                    options={dataTahun}
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
                    getOptionLabel={(option) => option.tahun || ""}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>{option.tahun}</React.Fragment>
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
                        {option.kanwil}
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
                        placeholder={dataFilter ? "" : "Alias Kanwil"}
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
                    // multiple
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
                    getOptionLabel={(option) => option.kantah || ""}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        {/* <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={
                            dataFilterKantor && dataFilterKantor.length != 0
                              ? dataFilterKantor
                                  .map((item) => item.kantah)
                                  .indexOf(option.kantah) > -1
                              : false
                          }
                        /> */}
                        {option.kantah}
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
                        // setDataFilterKantor([]);
                      } else {
                        setOpenKantah(false);
                        // setHideTextKantor(false);
                      }
                    }}
                    // renderTags={(selected) => {
                    //   return selected.length != 0
                    //     ? hideTextKantor
                    //       ? ""
                    //       : `${selected.length} Terpilih`
                    //     : "";
                    // }}
                    // getOptionDisabled={(options) =>
                    //   dataFilterKantor.length >= 32 ? true : false
                    // }
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
                        placeholder={"Pilih Kantah"}
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
            </div>
          </Grid>
          <Grid item xs={isMobile ? 12 : 5}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={10}
            >
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
              >
                Kinerja Penyelesaian Berkas
              </Typography>
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginBottom: 20, marginLeft: 10, marginRight: 10 }}
              >
                di {dataFilter && dataFilter.kanwil ? dataFilter.kanwil : ""}{" "}
                Tahun {years ? years.tahun : ""}
              </Typography>
            </Grid>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart width={500} height={400}>
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
          <Grid item xs={isMobile ? 12 : 5}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={10}
            >
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
              >
                Kinerja Penyelesaian Berkas per Tipe Produk
              </Typography>
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
              >
                di {dataFilter && dataFilter.kanwil ? dataFilter.kanwil : ""}{" "}
                Tahun {years ? years.tahun : ""}
              </Typography>
            </Grid>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      width={500}
                      height={800}
                      data={dataType}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="tipeproduk"
                        angle={60}
                        interval={0}
                        tick={{
                          transform: "rotate(-35)",
                          textAnchor: "start",
                          dominantBaseline: "ideographic",
                          fontSize: 8,
                        }}
                        height={100}
                      />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Nilai"
                          angle={-90}
                          position="left"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sesuaidurasi" fill="#6600CC" />
                      <Bar dataKey="tidak_sesuai_durasi" fill="#CC0066" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: 15 }}>
          {/* <Grid item xs={isMobile ? 12 : 6}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={10}
            >
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
              >
                Kinerja Penyelesaian Berkas per Tipe Produk
              </Typography>
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
              >
                di {dataFilter && dataFilter.kanwil ? dataFilter.kanwil : ""}{" "}
                Tahun {years ? years.tahun : ""}
              </Typography>
            </Grid>
            <Card
              className={classes.root}
              variant="outlined"
              style={{ marginTop: 30 }}
            >
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      width={500}
                      height={800}
                      data={dataType}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="tipeproduk"
                        angle={60}
                        interval={0}
                        tick={{
                          transform: "rotate(-35)",
                          textAnchor: "start",
                          dominantBaseline: "ideographic",
                          fontSize: 8,
                        }}
                        height={100}
                      />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Nilai"
                          angle={-90}
                          position="left"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sesuaidurasi" fill="#6600CC" />
                      <Bar dataKey="tidak_sesuai_durasi" fill="#CC0066" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid> */}
          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
            >
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
              >
                Kinerja Penyelesaian Berkas per Prosedur
              </Typography>
              <Typography
                className={classes.isiContentText}
                variant="h2"
                wrap
                style={{ marginBottom: 10, marginLeft: 10, marginRight: 10 }}
              >
                di {dataFilter && dataFilter.kanwil ? dataFilter.kanwil : ""}{" "}
                Tahun {years ? years.tahun : ""}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={2} style={{ paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Tipe Produk
                </Typography>
                <Autocomplete
                  // multiple
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
                  options={dataListProsedure}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeFilterProsedure(newValue);
                  }}
                  getOptionLabel={(option) => option.tipeproduk || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      {/* <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={
                        listProsedure && listProsedure.length != 0
                          ? listProsedure
                              .map((item) => item.namaprosedur)
                              .indexOf(option.namaprosedur) > -1
                          : false
                      }
                    /> */}
                      {option.tipeproduk}
                    </React.Fragment>
                  )}
                  open={openListProsedure}
                  onOpen={() => {
                    setOpenListProsedure(true);
                  }}
                  onClose={(e, reason) =>
                    reason == "escape" || reason == "blur"
                      ? setOpenListProsedure(false)
                      : setOpenListProsedure(true)
                  }
                  onInputChange={(_event, value, reason) => {
                    if (reason == "input") {
                      setOpenListProsedure(true);
                      // setHideTextKantor(true);
                      // setDataFilterKantor([]);
                    } else {
                      setOpenKantah(false);
                      // setHideTextKantor(false);
                    }
                  }}
                  // renderTags={(selected) => {
                  //   return selected.length != 0
                  //     ? hideTextKantor
                  //       ? ""
                  //       : `${selected.length} Terpilih`
                  //     : "";
                  // }}
                  // getOptionDisabled={(options) =>
                  //   listProsedure.length >= 32 ? true : false
                  // }
                  defaultValue={listProsedure}
                  value={listProsedure}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                      style={{ marginTop: 5 }}
                      placeholder={"Pilih Tipe Produk"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2} style={{ paddingLeft: 15, paddingTop: 5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getDataProduk()}
                  style={{ height: 35, width: 70, fontSize: 12 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={8} style={{ paddingRight: 8 }}></Grid>
            </Grid>
            <Card
              className={classes.root}
              variant="outlined"
              style={{ marginTop: 30 }}
            >
              <CardContent>
                <div className={classes.barChart}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      width={500}
                      height={800}
                      data={dataProsedur}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="namaprosedur"
                        angle={60}
                        interval={0}
                        tick={{
                          // angle: 90,
                          transform: "rotate(-35)",
                          textAnchor: "start",
                          dominantBaseline: "ideographic",
                          fontSize: 8,
                        }}
                        height={100}
                        // tickFormatter={DataFormaterX}
                      />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Nilai"
                          angle={-90}
                          position="left"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      {/* <Legend /> */}
                      <Bar dataKey="sesuaidurasi" fill="#6600CC" />
                      <Bar dataKey="tidak_sesuai_durasi" fill="#CC0066" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default realisasiPenggunaan;
