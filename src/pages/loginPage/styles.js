import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100%',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2, 0),
    },
  },
  form: {
    maxWidth: '330px',
    margin: '0 auto',
    display: flex,
    flexDirection: column,
    background: white,
    padding: '20px',
    marginTop: '30px',
  },
}));
export default styles;
