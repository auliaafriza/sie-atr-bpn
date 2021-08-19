import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Paper,
  Link,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bgImg from '../../assets/img/bg-login.jpg';
import { PersonOutline, VpnKeyOutlined } from '@material-ui/icons/';
import Logo from '../../assets/img/fav.png';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '35%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paddingTop: theme.spacing(25),
  },
  paper: {
    paddingTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));
export default function AddressForm() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        height: '100vh',
        width: '100wh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        alignContent: 'center',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="center" alignItems="center">
            <img src={Logo} style={{ width: 35, height: 35 }}></img>
            <Typography component="h1" variant="h4" align="center">
              SIE ATR BPN
            </Typography>
          </Grid>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              placeholder="Username"
              name="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              placeholder="Password"
              name="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="outlined"
              className={classes.submit}
              onClick={() => history.push('/Dashboard')}
            >
              Login
            </Button>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item>New to SIE ATRBPN ?</Grid>
              <Grid item xs>
                <Divider />
              </Grid>
            </Grid>
            <Button fullWidth variant="outlined" className={classes.submit}>
              Register
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
}
