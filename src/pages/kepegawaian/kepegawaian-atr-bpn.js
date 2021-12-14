import React, { useState, useEffect, useRef, PureComponent } from "react";
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
  Treemap,
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
import styles from "./styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import {
  tahunDataV2,
  bulanData,
  DataFormater,
  deleteDuplicates,
} from "../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../config/embed_conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { url } from "../../api/apiClient";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { getKantorPNBP, getWilayahPNBP } from "../../actions/pnbpAction";
import { isMobile } from "react-device-detect";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const dataTemp = [
  {
    kantor: "",
    jumlah_mutasi: 0,
  },
  {
    kantor: "",
    jumlah_mutasi: 0,
  },
];

const dataTempJK = [
  { name: "Laki-laki", value: 50 },
  { name: "Perempuan", value: 50 },
];

const dataTempPendidikan = [
  {
    pendidikan: "",
    jumlah: 0,
  },
  {
    pendidikan: "",
    jumlah: 0,
  },
];

let nameColumnJK = [
  {
    label: "Jenis Kelamin",
    value: "name",
    isFixed: false,
    isLabel: false,
  },
  {
    label: "Jumlah Pegawai",
    value: "value",
    isFixed: false,
    isLabel: false,
  },
];

let columnTableJK = [
  {
    label: "name",
    isFixed: false,
  },
  {
    label: "value",
    isFixed: false,
  },
];

let grafikViewJK = [
  {
    dataKey: "value",
    fill: "#66CDAA",
  },
];

let axisJK = {
  xAxis: "name",
  yAxis: "Jumlah Pegawai",
};

let nameColumnPendidikan = [
  {
    label: "Pendidikan",
    value: "pendidikan",
    isFixed: false,
    isLabel: false,
  },
  {
    label: "Jumlah Pegawai",
    value: "jumlah",
    isFixed: false,
    isLabel: false,
  },
];

let columnTablePendidikan = [
  {
    label: "pendidikan",
    isFixed: false,
  },
  {
    label: "jumlah",
    isFixed: false,
  },
];

let grafikViewPendidikan = [
  {
    dataKey: "jumlah",
    fill: "#FFA07A",
  },
];

let axisPendidikan = {
  xAxis: "pendidikan",
  yAxis: "Jumlah Pegawai",
};

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
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

let columnTable = [
  {
    label: "golongan",
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
    fill: "#F0E68C",
  },
];

let axis = {
  xAxis: "kantor",
  yAxis: "Jumlah Mutasi",
};

class CustomizedContent extends PureComponent {
  render() {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      payload,
      colors,
      rank,
      name,
      value,
    } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[
                    Math.floor(
                      (root.children && root.children.length
                        ? index / root.children.length
                        : 0) * 6
                    )
                  ]
                : "none",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
            fontWeight="lighter"
          >
            {name} (
            {root.children && root.children.length
              ? root.children[index].size
              : 0}
            )
          </text>
        ) : // )
        null}
      </g>
    );
  }
}

const COLORSPIE = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
        {`Jumlah Pegawai: ${
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

const KepegawaianBpnMutasi = () => {
  const classes = styles();
  const [years, setYears] = useState({
    tahun: new Date().getFullYear().toString(),
  });
  const [data, setData] = useState(dataTemp);
  const [dataPendidikan, setDataPendidikan] = useState(dataTempPendidikan);
  const [dataJK, setDataJK] = useState(dataTempJK);
  const [comment, setComment] = useState("");
  const [commentJK, setCommentJK] = useState("");
  const [commentPendidikan, setCommentPendidikan] = useState("");
  const [bulan, setBulan] = useState("Nov");
  const [dataTriwulan, setDataTriwulan] = useState([]);
  const [dataBerdasar, setDataBerdasar] = useState([]);
  const [triwulan, setTriwulan] = useState({
    key: "pilih semua",
    value: 0,
  });
  const [berdasar, setBerdasar] = useState({
    key: "Golongan",
    value: "Golongan",
  });
  const [dataTreeMap, setDataTreeMap] = useState([
    { name: "X", size: 2138 },
    { name: "Y", size: 3824 },
    { name: "Z", size: 1353 },
  ]);

  const [openWilayah, setOpenWilayah] = useState(false);
  const [openKantah, setOpenKantah] = useState(false);
  const [openTriwulan, setOpenTriwulan] = useState(false);
  const [openTahun, setOpenTahun] = useState(false);
  const [openBerdasar, setOpenBerdasar] = useState(false);

  const berkasPnbpWilayah = useSelector((state) => state.pnbp.wilayahPnbp);
  const berkasPnbpKantor = useSelector((state) => state.pnbp.kantorPnbp);
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState(null);
  const [dataFilterKantor, setDataFilterKantor] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const [hideText, setHideText] = useState(false);
  const [hideTextKantor, setHideTextKantor] = useState(false);
  const [listKanwil, setListKanwil] = useState([]);
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

  const [tahunMutasi, setTahunMutasi] = useState([]);

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

  const DataFormaterX = (val) => {
    return val && val.indexOf("Kantor Wilayah Provinsi") > -1
      ? val.replace("Kantor Wilayah Provinsi ", "Prov ")
      : val && val.indexOf("Kantor Wilayah Kabupaten") > -1
      ? val.replace("Kantor Wilayah Kabupaten ", "Kab ")
      : val && val.indexOf("Kantor Wilayah") > -1
      ? val.replace("Kantor Wilayah ", "")
      : val && val.indexOf("Kantor Pertanahan Kabupaten") > -1
      ? val.replace("Kantor Pertanahan Kabupaten ", "Kab ")
      : val && val.indexOf("Kantor Pertanahan Kota") > -1
      ? val.replace("Kantor Pertanahan Kota ", "Kota ")
      : val && val.indexOf("Kantor Pertanahan") > -1
      ? val.replace("Kantor Pertanahan ", "")
      : val;
  };

  const [dataKantor, setDataKantor] = useState([]);

  const getListKantor = (temp) => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}Kepegawaian/Pegawai/get_kantor?kanwil=${temp}`)
      .then(function (response) {
        setDataKantor(
          response.data.data && response.data.data.length != 0
            ? response.data.data
            : []
        );
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
    getListKantor(event ? event.kanwil : "");
    setDataFilterKantor(null);
    setDataFilter(event);
  };

  const handleChangeFilterKantor = (event) => {
    setDataFilterKantor(event);
  };

  const convertDataTree = (data) => {
    let res = [];
    data && data.length != 0
      ? data.map((item, i) => {
          res.push({
            name: item.golongan,
            size: item.jumlah,
          });
        })
      : null;
    return res;
  };

  const convertDataPie = (data) => {
    let res = [];
    data && data.length != 0
      ? res.push(
          {
            name: data[0].jeniskelamin == "L" ? "Laki-laki" : "Perempuan",
            value: data[0].jumlah,
          },
          {
            name: data[1].jeniskelamin == "L" ? "Laki-laki" : "Perempuan",
            value: data[1].jumlah,
          }
        )
      : res.push(
          { name: "Laki-laki", value: 0 },
          { name: "Perempuan", value: 0 }
        );
    return res;
  };

  const getData = () => {
    let temp = { kantor: [], kanwil: [] };
    dataFilterKantor && dataFilterKantor.kantor
      ? dataFilterKantor.kantor == "pilih semua" ||
        dataFilterKantor.kantor == "-"
        ? []
        : temp.kantor.push(dataFilterKantor.kantor)
      : [];
    dataFilter && dataFilter.kanwil
      ? dataFilter.kanwil == "pilih semua" || dataFilter.kanwil == "-"
        ? []
        : temp.kanwil.push(dataFilter.kanwil)
      : [];
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    // let triwulanData = triwulan == 0 ? "" : triwulan;
    axios
      .post(`${url}Kepegawaian/Pegawai/sie_pegawai_atr_bpn_golongan`, temp)
      .then(function (response) {
        setData(response.data.data);
        setComment(response.data);
        let convertData = convertDataTree(response.data.data);
        setDataTreeMap(convertData);
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
      .post(`${url}Kepegawaian/Pegawai/sie_pegawai_atr_bpn_jns_kelamin`, temp)
      .then(function (response) {
        setDataJK(convertDataPie(response.data.data));
        setCommentJK(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        setDataJK([]);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    axios
      .post(`${url}Kepegawaian/Pegawai/sie_pegawai_atr_bpn_pendidikan`, temp)
      .then(function (response) {
        setDataPendidikan(response.data.data);
        setCommentPendidikan(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        setDataPendidikan([]);
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
      : null;
    return res;
  };

  useEffect(() => {
    axios
      .get(`${url}Kepegawaian/Pegawai/get_tahun`)
      .then(function (response) {
        setTahunMutasi(convertTahun(response.data.data));
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
      .get(`${url}Kepegawaian/Pegawai/get_kanwil`)
      .then(function (response) {
        setListKanwil(response.data.data);
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
      .get(`${url}MasterData/filter_berdasarkan`)
      .then(function (response) {
        setDataBerdasar(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    getListKantor(dataFilter ? dataFilter.kanwil : "");
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event);
  };

  const handleChangeBerdasar = (event) => {
    setBerdasar(event);
  };

  const handleChangeTriwulan = (event) => {
    setTriwulan(event);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">{label ? label : payload[0].payload.name}</p>
          <p
            className="desc"
            style={{
              color: payload[0].color
                ? payload[0].color
                : payload[0].payload.fill,
            }}
          >{`Jumlah Pegawai : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  let nameColumn = [
    {
      label: "Golongan",
      value: "golongan",
      isFixed: false,
      isLabel: false,
    },
    {
      label: "Jumlah Pegawai",
      value: "jumlah",
      isFixed: false,
      isLabel: false,
    },
  ];

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Jumlah Pegawai berdasar golongan",
      data,
      ".xlsx"
    );
    fileExport(
      loadDataColumnTable(nameColumnJK),
      "Jumlah Pegawai berdasar Jenis Kelamin",
      dataJK,
      ".xlsx"
    );
    fileExport(
      loadDataColumnTable(nameColumnPendidikan),
      "Jumlah Pegawai berdasar Pendidikan",
      dataPendidikan,
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

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {dataModal.title}
      </h2>
      <div className={classes.barChart}>
        <ResponsiveContainer width="100%" height={250}>
          <Treemap
            width={400}
            height={200}
            data={dataTreeMap}
            dataKey="size"
            ratio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
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
                    <StyledTableRow key={row.golongan}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.golongan}
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
                      primary={
                        history.commentDate
                          ? moment(new Date(history.commentDate)).format(
                              "DD MMM YYYY - HH:mm"
                            )
                          : ""
                      }
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
                  {dataModal.listTop10Comment.length - 1 != i ? (
                    <Divider
                      component="li"
                      style={{ marginLeft: 20, marginRight: 20 }}
                    />
                  ) : null}
                </>
              );
            })
          : null}
      </List>
      <Divider />
      <h2 id="simple-modal-title" style={{ paddingBottom: 20, marginTop: 20 }}>
        Jumlah Pegawai berdasar Jenis Kelamin
      </h2>
      <div className={classes.barChart}>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={400} height={400}>
            <Pie
              data={dataJK}
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
              {dataJK.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORSPIE[index % COLORSPIE.length]}
                />
              ))}
            </Pie>
            {/* <Tooltip content={<CustomTooltip />} /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
      {nameColumnJK && nameColumnJK.length != 0 ? (
        <>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {nameColumnJK.map((item, i) => {
                    return (
                      <StyledTableCell align="center">
                        {item.label}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataJK
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.jeniskelamin}>
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
            count={dataJK.length}
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
        {commentJK && commentJK.lastComment
          ? commentJK.lastComment.analisisData.replace(/<[^>]+>/g, "")
          : ""}
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
        {commentJK &&
        commentJK.listTop10Comment &&
        commentJK.listTop10Comment.length != 0
          ? commentJK.listTop10Comment.map((history, i) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        history.commentDate
                          ? moment(new Date(history.commentDate)).format(
                              "DD MMM YYYY - HH:mm"
                            )
                          : ""
                      }
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
                  {commentJK.listTop10Comment.length - 1 != i ? (
                    <Divider
                      component="li"
                      style={{ marginLeft: 20, marginRight: 20 }}
                    />
                  ) : null}
                </>
              );
            })
          : null}
      </List>
      <Divider />
      <h2 id="simple-modal-title" style={{ paddingBottom: 20, marginTop: 20 }}>
        Jumlah Pegawai berdasar Pendidikan
      </h2>
      <div className={classes.barChart}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            width={500}
            height={300}
            data={dataPendidikan}
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
            <XAxis dataKey="pendidikan" />
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Jumlah Pegawai"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="jumlah" fill="#FFA07A" name="Jumlah Pegawai" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {nameColumnPendidikan && nameColumnPendidikan.length != 0 ? (
        <>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  {nameColumnPendidikan.map((item, i) => {
                    return (
                      <StyledTableCell align="center">
                        {item.label}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataPendidikan
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.pendidikan}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.pendidikan}
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
            count={dataPendidikan.length}
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
        {commentPendidikan && commentPendidikan.lastComment
          ? commentPendidikan.lastComment.analisisData.replace(/<[^>]+>/g, "")
          : ""}
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
        {commentPendidikan &&
        commentPendidikan.listTop10Comment &&
        commentPendidikan.listTop10Comment.length != 0
          ? commentPendidikan.listTop10Comment.map((history, i) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        history.commentDate
                          ? moment(new Date(history.commentDate)).format(
                              "DD MMM YYYY - HH:mm"
                            )
                          : ""
                      }
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
                  {commentPendidikan.listTop10Comment.length - 1 != i ? (
                    <Divider
                      component="li"
                      style={{ marginLeft: 20, marginRight: 20 }}
                    />
                  ) : null}
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
        grafik: "tree",
        nameColumn: nameColumn,
        grafikView: grafikView,
        axis: axis,
        treeMap: dataTreeMap,
      },
      target: "_blank",
    });
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
                  BASE_URL.path.sie_statistik_pegawai +
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
                  BASE_URL.path.sie_statistik_pegawai +
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
                BASE_URL.path.sie_statistik_pegawai
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
            Jumlah Pegawai
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
                    title: "Jumlah Pegawai berdasar Golongan",
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
              onClick={() => handlePrintData("Jumlah Pegawai", columnTable)}
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
              {/* <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
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
                  options={tahunMutasi}
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
              </Grid> */}

              <Grid item xs={12} style={{ paddingLeft: 8, paddingRight: 8 }}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Kanwil
                </Typography>
                <Autocomplete
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
                  options={listKanwil}
                  classes={{
                    option: classes.option,
                  }}
                  disableUnderline
                  className={classes.formControl}
                  onChange={(event, newValue) => {
                    handleChangeFilter(newValue);
                  }}
                  getOptionLabel={(option) => option.kanwil || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>{option.kanwil}</React.Fragment>
                  )}
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
                      placeholder="Pilih Kanwil"
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
                  Pilih Kantor
                </Typography>
                <Autocomplete
                  // multiple
                  // getOptionDisabled={(options) =>
                  //   dataFilterKantor.length >= 32 ? true : false
                  // }
                  id="kantor"
                  name="kantor"
                  style={{ width: "100%", height: 35 }}
                  options={dataKantor}
                  classes={{
                    option: classes.option,
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
                    } else {
                      setOpenKantah(false);
                    }
                  }}
                  disableUnderline
                  className={classes.formControl}
                  autoHighlight
                  onChange={(event, newValue) => {
                    handleChangeFilterKantor(newValue);
                  }}
                  // onInputChange={(_event, value, reason) => {
                  //   if (reason == "input") setHideTextKantor(true);
                  //   else {
                  //     setHideTextKantor(false);
                  //   }
                  // }}
                  getOptionLabel={(option) => option.kantor || ""}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      {/* <Checkbox
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
                      /> */}
                      {option.kantor}
                    </React.Fragment>
                  )}
                  // renderTags={(selected) => {
                  //   return selected.length != 0
                  //     ? hideTextKantor
                  //       ? ""
                  //       : `${selected.length} Terpilih`
                  //     : "";
                  // }}
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
                      placeholder={"Pilih Kantor"}
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
                style={{ paddingLeft: 10, paddingTop: 5 }}
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
              Jumlah Pegawai berdasar {berdasar ? berdasar.key : ""}
            </Typography>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ marginBottom: 15 }}
            >
              {dataFilterKantor && dataFilterKantor.kantor
                ? `di ${dataFilterKantor.kantor}`
                : dataFilter && dataFilter.kanwil
                ? `di ${dataFilter.kanwil}`
                : ""}{" "}
            </Typography>
          </Grid>
          <Card
            className={isMobile ? classes.rootMobile : classes.root}
            variant="outlined"
          >
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
                  <Treemap
                    width={400}
                    height={200}
                    data={dataTreeMap}
                    dataKey="size"
                    ratio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent colors={COLORS} />}
                  >
                    <Tooltip content={<CustomTooltip />} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container row spacing={2} style={{ padding: 15 }}>
        <Grid item xs={isMobile ? 12 : 6}>
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
              style={{ marginTop: 10 }}
            >
              Jumlah Pegawai berdasar Jenis Kelamin
            </Typography>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ marginBottom: 15 }}
            >
              {dataFilterKantor && dataFilterKantor.kantor
                ? `di ${dataFilterKantor.kantor}`
                : dataFilter && dataFilter.kanwil
                ? `di ${dataFilter.kanwil}`
                : ""}{" "}
            </Typography>
          </Grid>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={dataJK}
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
                      {dataJK.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORSPIE[index % COLORSPIE.length]}
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
        <Grid item xs={isMobile ? 12 : 6}>
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
              style={{ marginTop: 10 }}
            >
              Jumlah Pegawai berdasar Pendidikan
            </Typography>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
              style={{ marginBottom: 15 }}
            >
              {dataFilterKantor && dataFilterKantor.kantor
                ? `di ${dataFilterKantor.kantor}`
                : dataFilter && dataFilter.kanwil
                ? `di ${dataFilter.kanwil}`
                : ""}{" "}
            </Typography>
          </Grid>
          <Card
            className={classes.root}
            variant="outlined"
            style={{ marginLeft: 10 }}
          >
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    width={500}
                    height={300}
                    data={dataPendidikan}
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
                    <XAxis dataKey="pendidikan" />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Jumlah Pegawai"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="jumlah"
                      fill="#FFA07A"
                      name="Jumlah Pegawai"
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

export default KepegawaianBpnMutasi;
