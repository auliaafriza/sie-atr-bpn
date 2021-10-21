import React, { useState, useEffect, useRef } from "react";
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
  ResponsiveContainer,
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
  tahunData,
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
import { isMobile } from "react-device-detect";

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

const GraphLandingEselon = () => {
  const classes = styles();
  const [dataEselon, setDataEselon] = useState([
    {
      label: "I",
      jumlah: 10,
    },
    {
      label: "II",
      jumlah: 20,
    },
  ]);

  const inputRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let temp = { kantah: [], kanwil: [] };
    axios
      .post(
        `${url}Kepegawaian/Pegawai/sie_pegawai_pensiun?tahun=${new Date().getFullYear()}&triwulan=0&berdasarkan=eselon`,
        temp
      )
      .then(function (response) {
        setDataEselon(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

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
          >{`Jumlah Pensiun : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: 10 }}>
          <Card
            className={isMobile ? classes.rootMobile : classes.root}
            variant="outlined"
          >
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
                Prediksi Pegawai Pensiun Berdasar Eselon
              </Typography>
              <Typography
                className={classes.isiContentTextStyle}
                variant="h2"
                wrap
              >
                di Tahun {new Date().getFullYear()} pada Semua Triwulan
              </Typography>
            </Grid>
            <CardContent>
              <div className={classes.barChart}>
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart
                    width={500}
                    height={400}
                    data={dataEselon}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="label" scale="band" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Area
                      type="monotone"
                      dataKey="jumlah"
                      fill="#8884d8"
                      stroke="#8884d8"
                    /> */}
                    <Bar dataKey="jumlah" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="jumlah" stroke="#ff7300" />
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

export default GraphLandingEselon;
