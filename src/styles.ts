import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 32,
  },
  select: {
    width: 200,
    marginRight: 32,
  },
  boardWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

export default useStyles;
