import React, { useState } from "react";
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
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { IoEye, IoPrint } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import styles from "./styles";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    // amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    // amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    // amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    // amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    // amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    // amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    // amt: 2100,
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2410,
    // amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1318,
    // amt: 2210,
  },
  {
    name: "Page C",
    uv: 2010,
    pv: 9800,
    // amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    // amt: 2000,
  },
  {
    name: "Page E",
    uv: 1820,
    pv: 4800,
    // amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3890,
    // amt: 2500,
  },
  {
    name: "Page G",
    uv: 3420,
    pv: 4300,
    // amt: 2100,
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

const DashHome = () => {
  const classes = styles();
  const [years, setYears] = useState("");

  const handleChange = (event) => {
    setYears(event.target.value);
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        direction="row"
        style={{ padding: 10, paddingTop: 20, paddingBottom: 5 }}
      >
        <Grid item xs={6}>
          <Typography className={classes.titleSection} variant="h2">
            Pemetaan (Satuan 1 Juta)
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
          <ButtonGroup
            aria-label="outlined button group"
            className={classes.buttonGroupStyle}
            variant="contained"
          >
            <IconButton size="small">
              <IoEye />
            </IconButton>
            <IconButton aria-label="delete" size="small">
              <IoPrint />
            </IconButton>
            <IconButton aria-label="delete" size="small">
              <IoMdDownload />
            </IconButton>
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
          <div style={{ margin: 10 }}>
            <Typography className={classes.isiTextStyle} variant="h2">
              Pilih Tahun
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
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
            </FormControl>
            <Typography
              className={classes.isiContentTextStyle}
              variant="h2"
              wrap
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.root} variant="outlined">
            <ResponsiveContainer width="90%" height={250}>
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
      <Box
        style={{
          backgroundColor: "rgba(107,111,130,0.2)",
          marginTop: 20,
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          style={{
            padding: 10,
            paddingTop: 20,
            paddingBottom: 5,
          }}
        >
          <Grid item xs={6}>
            <Typography className={classes.titleSection} variant="h2">
              Pemberkasaan (Satuan 1 Juta)
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
            <ButtonGroup
              aria-label="outlined button group"
              className={classes.buttonGroupStyle}
              variant="contained"
            >
              <IconButton size="small">
                <IoEye />
              </IconButton>
              <IconButton aria-label="delete" size="small">
                <IoPrint />
              </IconButton>
              <IconButton aria-label="delete" size="small">
                <IoMdDownload />
              </IconButton>
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
          <Grid item xs={7}>
            <Card className={classes.rootOdd} variant="outlined">
              <ResponsiveContainer width="90%" height={250}>
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
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="uv"
                    stroke="#82ca9d"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <div style={{ margin: 25 }}>
              <Typography className={classes.isiTextStyle} variant="h2">
                Pilih Tahun
              </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
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
              </FormControl>
              <Typography
                className={classes.isiContentTextStyle}
                variant="h2"
                wrap
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashHome;
