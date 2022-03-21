import { Box, Typography } from '@mui/material';

import SocketClient from '../services';
import useStyles from './styles';

interface IBoardProps {
  map: string[];
}
const Board: React.FC<IBoardProps> = ({ map }) => {
  const classes = useStyles();

  const handleCellClick = (col: number, row: number) => {
    SocketClient.socket.send(`open ${col} ${row}`);
  };

  const getUniqueID = (rowIndex: number, colIndex: number) => {
    return `cell-${rowIndex}-${colIndex}`;
  };

  const renderCell = (row: string, rowIndex: number) =>
    row.split('').map((cell: string, colIndex: number) =>
      cell === '□' ? (
        <Box
          key={getUniqueID(rowIndex, colIndex)}
          className={`${classes.cell} ${classes.closedCell}`}
          data-testid={getUniqueID(rowIndex, colIndex)}
          onClick={() => handleCellClick(colIndex, rowIndex)}
        />
      ) : (
        <Box
          key={getUniqueID(rowIndex, colIndex)}
          className={`${classes.cell} ${classes.openedCell}`}
          data-testid={getUniqueID(rowIndex, colIndex)}
          onClick={() => handleCellClick(colIndex, rowIndex)}
        >
          <Typography variant="caption" className={cell === '*' ? classes.mineCell : classes.normalCell}>
            {cell}
          </Typography>
        </Box>
      ),
    );

  return (
    <Box className={classes.board}>
      {map.map((row: string, rowIndex: number) => (
        <Box className={classes.row} key={`board-${rowIndex}`}>
          {renderCell(row, rowIndex)}
        </Box>
      ))}
    </Box>
  );
};

export default Board;
