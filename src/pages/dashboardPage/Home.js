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
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { IoEye, IoPrint } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";
import { getPaguMp, getAnggaranRealisasi } from "../../actions/dashActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useScreenshot } from "use-react-screenshot";
import html2canvas from "html2canvas";
import moment from "moment";
import PnbpBerkasWilayah from "./sie-pnbp-berkas-wilayah";
import BerkasWilayahPnbp from "./sie-pnbp-berkas-wilayahPNBP";
import PnbpBerkasPeringkat from "./sie-pnbp-berkas-peringkat";
import PnbpBerkasPeringkatWilayah from "./sie-pnbp-berkas-peringkat-wilayah";
import RealisasiPenggunaan from "./sie-pnbp-realisasi-pengunaan";
import RealisasiPenerimaan from "./sie-pnbp-realisasi-penerimaan";
import RealisasiTargetPenerimaan from "./sie-pnbp-realisasi-target-penerimaan";
import AlokasiAnggaran from "./sie-pnbp-alokasi-anggaran";
import PengembalianPNBP from "./sie-pengembalian-pnbp";
import PeringkatRealisasi from "./sie-peringkat-realisasi";
import RealisasiAnggaran from "./sie-pnbp-realisasi-anggaran";
import PaguMp from "./sie-pnbp-pagu-mp";
import BPHTBJumlahBerkas from "./bphtb-jumlah-berkas";
import BPHTBDaerahTerintegrasi from "./bphtb-jumlah-terintegrasi";

const dataTempAsset = [
  {
    tahun: "2021",
    anggaran: 0,
    relasisasi: 0,
  },
  {
    tahun: "2020",
    anggaran: 0,
    relasisasi: 0,
  },
];

const dataTempPagu = [
  {
    tahun: "2021",
    pagu: 0,
    mp: 0,
  },
  {
    tahun: "2020",
    pagu: 0,
    mp: 0,
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

const tahunData = [
  { id: "2021", value: 2021 },
  { id: "2020", value: 2020 },
  { id: "2019", value: 2019 },
  { id: "2018", value: 2018 },
  { id: "2017", value: 2017 },
];

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

const DashHome = () => {
  const classes = styles();
  const [years, setYears] = useState("");
  const [anggaranRealisasi, setAanggaranRealisasi] = useState(dataTempAsset);
  const [commentPagu, setCommentPagu] = useState("");
  const [paguMp, setPaguMp] = useState(dataTempPagu);
  const [comment, setComment] = useState("");
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
  const inputRef = createRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const getImage = () => takeScreenshot(ref.current);
  const handleOpen = (data) => {
    setOpen(true);
    setDataModal(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const dispatch = useDispatch();
  // const paguMpRed = useSelector((state) => state.dashReducer.paguMp);
  // const anggaranRealisasiRed = useSelector(
  //   (state) => state.dashReducer.anggaranRealisasi
  // );

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Aset&Keuangan/PNBP/sie_pnbp_pagu_mp?tahunAwal=2017&tahunAkhir=2021`
      )
      .then(function (response) {
        setPaguMp(response.data.data);
        setCommentPagu(response.data);
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
        `${url}Aset&Keuangan/PNBP/sie_pnbp_realisasi_anggaran?tahunAwal=2017&tahunAkhir=2021`
      )
      .then(function (response) {
        setAanggaranRealisasi(response.data.data);
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
    // axios
    //   .get(
    //     `${url}api/Comment/GetLastCommantByReportId?reportId=4169f628-00ab-4307-a715-f838eac47983`
    //   )
    //   .then(function (response) {
    //     setComment(response.data.data);
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
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

      {dataModal.type ? (
        <div className={classes.barChart}>
          {/* <img width={500} src={image} /> */}
          <ResponsiveContainer width="100%" height={250}>
            {dataModal.type == "Bar" ? (
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
                <XAxis dataKey="tahun"></XAxis>
                <YAxis tickFormatter={DataFormater}>
                  <Label
                    value="Nilai Satuan 1 Juta"
                    angle={-90}
                    position="insideBottomLeft"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="anggaran" fill="#8884d8" />
                <Bar dataKey="realisasi" fill="#82ca9d" />
              </BarChart>
            ) : (
              <LineChart
                width={500}
                height={300}
                data={dataModal.grafik}
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
                    value="Nilai Satuan 1 Juta"
                    angle={-90}
                    position="insideBottomLeft"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pagu"
                  stroke="#6EB5FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="mp"
                  stroke="#FCB9AA"
                  strokeWidth={3}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : null}
      {dataModal.nameColumn && dataModal.nameColumn.length != 0 ? (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {dataModal.nameColumn.map((item) => (
                  <StyledTableCell align="center">{item}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataModal.grafik.map((row) => (
                <StyledTableRow key={row.tahun}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.tahun}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rp{" "}
                    {row.anggaran
                      ? row.anggaran
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : row.pagu.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rp{" "}
                    {row.realisasi
                      ? row.realisasi
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : row.mp.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

  const printData = () => {
    html2canvas(inputRef.current).then(function (canvas) {
      const croppedCanvas = document.createElement("canvas");
      const croppedCanvasContext = croppedCanvas.getContext("2d");
      // init data
      const cropPositionTop = 0;
      const cropPositionLeft = 0;
      const cropWidth = canvas.width;
      const cropHeight = canvas.height;

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;

      croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

      const base64Image = croppedCanvas.toDataURL("image/png", "1.0");
      let myWindow = window.open();
      myWindow.document.write("<img src='" + base64Image + "''>");
      myWindow.print();
    });
  };

  const printHandle = (dataModal) => {
    <div className={classes.paper} ref={inputRef}>
      <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
        {dataModal.title}
      </h2>
      {dataModal.type ? (
        <div className={classes.barChart}>
          <ResponsiveContainer width="100%" height={250}>
            {dataModal.type == "Bar" ? (
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
                <XAxis dataKey="tahun" />
                <YAxis tickFormatter={DataFormater}>
                  <Label
                    value="Nilai Satuan 1 Juta"
                    angle={-90}
                    position="insideBottomLeft"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="anggaran" fill="#8884d8" />
                <Bar dataKey="realisasi" fill="#82ca9d" />
              </BarChart>
            ) : (
              <LineChart
                width={500}
                height={300}
                data={dataModal.grafik}
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
                    value="Nilai Satuan 1 Juta"
                    angle={-90}
                    position="insideBottomLeft"
                    offset={-5}
                  />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pagu"
                  stroke="#6EB5FF"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="mp"
                  stroke="#FCB9AA"
                  strokeWidth={3}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : null}
      {dataModal.nameColumn && dataModal.nameColumn.length != 0 ? (
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {dataModal.nameColumn.map((item) => (
                  <StyledTableCell align="center">{item}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataModal.grafik.map((row) => (
                <StyledTableRow key={row.tahun}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.tahun}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rp{" "}
                    {row.anggaran
                      ? row.anggaran
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : row.pagu.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Rp{" "}
                    {row.realisasi
                      ? row.realisasi
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : row.mp.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <p id="simple-modal-description">{dataModal.analisis}</p>
    </div>;
    printData();
  };

  return (
    <div>
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
      <PnbpBerkasWilayah />
      {/* <BerkasWilayahPnbp /> */}
      <PnbpBerkasPeringkat />
      <PnbpBerkasPeringkatWilayah />
      <RealisasiAnggaran />
      <RealisasiPenggunaan />
      <RealisasiPenerimaan />
      <RealisasiTargetPenerimaan />
      <PaguMp />
      <AlokasiAnggaran />
      <PeringkatRealisasi />
      <PengembalianPNBP />
      <BPHTBJumlahBerkas />
      <BPHTBDaerahTerintegrasi />
    </div>
  );
};

export default DashHome;
