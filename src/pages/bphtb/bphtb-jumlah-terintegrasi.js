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
import { url } from "../../api/apiClient";
import styles from "./styles";
import axios from "axios";
import { useScreenshot } from "use-react-screenshot";
import html2canvas from "html2canvas";
import moment from "moment";
import { fileExport } from "../../functionGlobal/exports";
import { loadDataColumnTable } from "../../functionGlobal/fileExports";
import { useHistory, Link as LinkPrint } from "react-router-dom";
import { BASE_URL } from "../../config/embed_conf";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataFormater } from "../../functionGlobal/globalDataAsset";
import { isMobile } from "react-device-detect";
import { getWilayahPNBP } from "../../actions/pnbpAction";

const dataTemp = [
  {
    tahun: "2010",
    jumlah_daerah_terintegrasi: 0,
    kum_jumlah_daerah_terintegrasi: 0,
  },
  {
    tahun: "2011",
    jumlah_daerah_terintegrasi: 10,
    kum_jumlah_daerah_terintegrasi: 0,
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
    label: "Jumlah Daerah Terintegrasi",
    value: "jumlah_daerah_terintegrasi",
    isFixed: false,
    isLabel: false,
  },
  {
    label: "Total Akumulasi",
    value: "kum_jumlah_daerah_terintegrasi",
    isFixed: false,
    isLabel: false,
  },
];

let columnTable = [
  {
    label: "tahun",
    isFixed: false,
  },
  {
    label: "jumlah_daerah_terintegrasi",
    isFixed: true,
  },
  {
    label: "kum_jumlah_daerah_terintegrasi",
    isFixed: true,
  },
];

let grafikView = [
  {
    dataKey: "jumlah_daerah_terintegrasi",
    fill: "#C71585",
  },
  {
    dataKey: "kum_jumlah_daerah_terintegrasi",
    fill: "#8FBC8F",
  },
];

let axis = {
  xAxis: "tahun",
  yAxis: "Jumlah Daerah Terintegrasi",
};

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

const BPHTBDaerahTerintegrasi = () => {
  const classes = styles();
  const [years, setYears] = useState("2017");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [bulan, setBulan] = useState("Jan");
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

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Jumlah daerah terintegrasi",
      data,
      ".xlsx"
    );
  };

  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(`${url}Aset&Keuangan/BPHTB/sie_bphtb_jumlah_daerah_terintegrasi`)
      .then(function (response) {
        setData(response.data.data);
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
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  const history = useHistory();
  const handlePrintData = (title, columnTable) => {
    history.push({
      pathname: "/PrintData",
      state: {
        data: data,
        comment: comment,
        columnTable: columnTable,
        title: title,
        grafik: "barStack",
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("tooltip", payload);
      return (
        <div className={classes.tooltipCustom}>
          <p className="label">Tahun {label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Jumlah Daerah Terintegrasi : ${payload[0].value}`}</p>
          <p
            className="desc"
            style={{ color: payload[1].color }}
          >{`Total Akumulasi : ${payload[1].value}`}</p>
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
                value="Jumlah Daerah Terintegrasi"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              payload={[
                {
                  value: "jumlah daerah terintegrasi",
                  type: "square",
                  id: "ID01",
                  color: "#C71585",
                },
                {
                  value: "kum jumlah daerah terintegrasi",
                  type: "square",
                  id: "ID02",
                  color: "#8FBC8F",
                },
              ]}
            />
            <Bar dataKey="jumlah_daerah_terintegrasi" fill="#C71585" />
            <Bar dataKey="kum_jumlah_daerah_terintegrasi" fill="#8FBC8F" />
          </BarChart>
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
                    <StyledTableCell align="center">{item}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataModal.grafik
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.tahun}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.tahun}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {" "}
                        {row.jumlah_daerah_terintegrasi}
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

  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        marginTop: 20,
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
                  BASE_URL.path.bphtb_daerah_terintegrasi +
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
                  BASE_URL.path.bphtb_daerah_terintegrasi +
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
                BASE_URL.path.bphtb_daerah_terintegrasi
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
      <Box>
        <Grid
          container
          spacing={2}
          direction="row"
          style={{ padding: 10, paddingTop: 20, paddingBottom: 5 }}
        >
          <Grid item xs={isMobile ? 12 : 9}>
            <Typography className={classes.titleSection} variant="h2">
              Jumlah Daerah Terintegrasi
            </Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent={isMobile ? "flex-start" : "flex-end"}
            alignItems={isMobile ? "flex-start" : "flex-end"}
            item
            xs={isMobile ? 12 : 3}
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
                      title: "Jumlah Daerah Terintegrasi",
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
                      nameColumn: ["Tahun", "Jumlah Daerah Terintegrasi"],
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
                onClick={() =>
                  handlePrintData("Jumlah Daerah Terintegrasi", columnTable)
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
          <Grid item xs={isMobile ? 12 : 8}>
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
                      <XAxis dataKey="tahun" />
                      <YAxis tickFormatter={DataFormater}>
                        <Label
                          value="Jumlah Daerah Terintegrasi"
                          angle={-90}
                          position="insideBottomLeft"
                          offset={-5}
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        payload={[
                          {
                            value: "Jumlah Daerah Terintegrasi",
                            type: "square",
                            id: "ID01",
                            color: "#C71585",
                          },
                          {
                            value: "Total Akumulasi",
                            type: "square",
                            id: "ID02",
                            color: "#8FBC8F",
                          },
                        ]}
                      />
                      <Bar
                        dataKey="jumlah_daerah_terintegrasi"
                        fill="#C71585"
                      />
                      <Bar
                        dataKey="kum_jumlah_daerah_terintegrasi"
                        fill="#8FBC8F"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={isMobile ? 12 : 4}>
            <div style={{ margin: 10, marginRight: 25 }}>
              {/* <Typography className={classes.isiTextStyle} variant="h2">
                Pilih Tahun
              </Typography>
              <FormControl  className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Tahun
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={years}
                  onChange={handleChange}
                  label="Tahun"
                >
                  {tahunData.map((item, i) => {
                    return (
                      <MenuItem value={item.id} key={i}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
              <Typography
                className={classes.isiContentTextStyle}
                variant="h2"
                wrap
              >
                Analisis Data
              </Typography>
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
                        title: "Jumlah Daerah Terintegrasi",
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
                        nameColumn: ["Tahun", "Jumlah Daerah Terintegrasi"],
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
        </Grid>
      </Box>
    </div>
  );
};

export default BPHTBDaerahTerintegrasi;
