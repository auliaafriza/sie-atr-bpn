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
} from "@material-ui/core";
import {
  createTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import { IoEye, IoPrint } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "../../dashboardPage/styles";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { tahunData } from "../../../functionGlobal/globalDataAsset";
import moment from "moment";
import { fileExport } from "../../../functionGlobal/exports";
import { loadDataColumnTable } from "../../../functionGlobal/fileExports";
import { useHistory } from "react-router-dom";

const dataTemp = [
  {
    tahun: "2010",
    anggaran: 0,
    realisasi: 10,
  },
  {
    tahun: "2011",
    anggaran: 0,
    realisasi: 10,
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
    label: "Tahun",
    value: "tahun",
  },
  {
    label: "Anggaran",
    value: "anggaran",
  },
  {
    label: "Realisasi",
    value: "realisasi",
  },
];

const RealisasiAnggaran = () => {
  const classes = styles();
  const [years, setYears] = useState("2022");
  const [data, setData] = useState(dataTemp);
  const [comment, setComment] = useState("");
  const [tahunAwal, setTahunAwal] = useState("2017");
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

  const getData = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios
      .get(
        `${url}Aset&Keuangan/PNBP/sie_pnbp_realisasi_anggaran?tahunAwal=${tahunAwal}&tahunAkhir=${years}`
      )
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
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  const handleChangeAwal = (event) => {
    setTahunAwal(event.target.value);
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
          <p className="label">Tahun {label}</p>
          <p
            className="desc"
            style={{ color: payload[0].color }}
          >{`Anggaran : Rp ${payload[0].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
          <p
            className="desc"
            style={{ color: payload[1].color }}
          >{`Realisasi : Rp ${payload[1].value
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}</p>
        </div>
      );
    }

    return null;
  };

  const exportData = () => {
    fileExport(
      loadDataColumnTable(nameColumn),
      "Nilai Anggaran dan Realisasi Belanja anggaran PNBP",
      data,
      ".xlsx"
    );
  };

  const handlePrint = useReactToPrint({
    content: () => inputRef.current,
  });

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
            <XAxis dataKey="tahun"></XAxis>
            <YAxis tickFormatter={DataFormater}>
              <Label
                value="Nilai Satuan 1 Juta"
                angle={-90}
                position="insideBottomLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="anggaran" fill="#8884d8" />
            <Bar dataKey="realisasi" fill="#82ca9d" />
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
                    <StyledTableRow key={row.tahun}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.tahun}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Rp{" "}
                        {row.anggaran
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Rp{" "}
                        {row.realisasi
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

  const PrintHandle = () => {
    return (
      <div ref={inputRef}>
        <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
          Anggaran & Realisasi (Satuan 1 Juta)
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
              <XAxis dataKey="tahun"></XAxis>
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value="Nilai Satuan 1 Juta"
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="anggaran" fill="#8884d8" />
              <Bar dataKey="realisasi" fill="#82ca9d" />
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
                  {data
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
                          Rp{" "}
                          {row.anggaran
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Rp{" "}
                          {row.realisasi
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
              count={data.length}
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
          {comment && comment.lastComment
            ? comment.lastComment.analisisData
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
          {comment.listTop10Comment && comment.listTop10Comment.length != 0
            ? comment.listTop10Comment.map((history, i) => {
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
  };
  const history = useHistory();

  const testbla = () => {
    // window.open("/PrintPNBPAnggaranRealisasi")
    history.push({
      pathname: "/PrintPNBPAnggaranRealisasi",
      state: {
        data: data,
        comment: comment,
      },
      target: "_blank",
    });
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
      <Grid
        container
        spacing={2}
        direction="row"
        style={{ padding: 10, paddingTop: 20, paddingBottom: 5 }}
      >
        <Grid item xs={6}>
          <Typography className={classes.titleSection} variant="h2">
            Anggaran & Realisasi (Satuan 1 Juta)
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
          {/* <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => inputRef.current}
          /> */}
          <ButtonGroup
            aria-label="outlined button group"
            className={classes.buttonGroupStyle}
            variant="contained"
          >
            <TooltipMI title="Lihat Detail" placement="top">
              <IconButton
                size="small"
                onClick={() =>
                  handleOpen({
                    title: "Anggaran & Realisasi (Satuan 1 Juta)",
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
              onClick={() => testbla()}
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
                  Pilih Tahun Awal
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tahun Awal
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={tahunAwal}
                    onChange={handleChangeAwal}
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
              <Grid item xs={5}>
                <Typography
                  className={classes.isiTextStyle}
                  variant="h2"
                  style={{ fontSize: 12 }}
                >
                  Pilih Tahun Akhir
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tahun Akhir
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={years}
                    onChange={handleChange}
                    label="Bulan"
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
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={3}
                style={{ paddingTop: 40, paddingLeft: 20 }}
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
                      title: "Anggaran & Realisasi (Satuan 1 Juta)",
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
                    <XAxis dataKey="tahun" />
                    <YAxis tickFormatter={DataFormater}>
                      <Label
                        value="Nilai Satuan 1 Juta"
                        angle={-90}
                        position="insideBottomLeft"
                        offset={-5}
                      />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="anggaran" fill="#8884d8" />
                    <Bar dataKey="realisasi" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <div ref={inputRef} >
        <h2 id="simple-modal-title" style={{ paddingBottom: 20 }}>
          Nilai Anggaran dan Realisasi Belanja anggaran PNBP
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
              <XAxis dataKey="tahun"></XAxis>
              <YAxis tickFormatter={DataFormater}>
                <Label
                  value="Nilai Satuan 1 Juta"
                  angle={-90}
                  position="insideBottomLeft"
                  offset={-5}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="anggaran" fill="#8884d8" />
              <Bar dataKey="realisasi" fill="#82ca9d" />
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
                  {data
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
                          Rp{" "}
                          {row.anggaran
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Rp{" "}
                          {row.realisasi
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
              count={data.length}
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
          {comment && comment.lastComment
            ? comment.lastComment.analisisData
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
          {comment.listTop10Comment && comment.listTop10Comment.length != 0
            ? comment.listTop10Comment.map((history, i) => {
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
      </div> */}
    </div>
  );
};

export default RealisasiAnggaran;
