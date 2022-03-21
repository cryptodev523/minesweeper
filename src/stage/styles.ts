import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  board: {
    overflow: 'auto',
  },
  row: {
    display: 'flex',
  },
  cell: {
    minWidth: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },
  closedCell: {
    borderTop: '1px solid white',
    borderLeft: '1px solid white',
    borderBottom: '1px solid grey',
    borderRight: '1px solid grey',
    backgroundColor: 'lightGrey',

    '&:hover': { backgroundColor: 'darkGrey', cursor: 'pointer' },
  },
  openedCell: {
    border: '1px solid grey',
  },
  normalCell: {
    color: 'blue',
  },
  mineCell: {
    color: 'red',
  },
});

export default useStyles;
